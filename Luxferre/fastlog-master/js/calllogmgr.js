//Optimized call log manager - the heart of FastLog project
//Depends on AlphaIndex library

/*
 * Call log record: {number, type, contactName, timestamp, duration, simId}
 * 
 * Contact index storage mapping: number => contactName
 *
 */

(function(global, nav) {
  var cts = nav.mozContacts, searchIndexKey = 'clsi',
      internalContactStorageKey = 'fcst', internalContactStorage = {}, noReindex = false,
      recordStorage = {}, recordStorageReady = false, recordStorageKey = 'fcls',
      elSetup = false, internalBlockList = [], hardQuota = 5200000,
      callBlockSupport = 'findBlockedNumbers' in cts

  function storageMeetsQuota() {
    return new Blob(Object.values(localStorage)).size < hardQuota
  }

  //contact management part

  function internalContactStorageSave() {
    global.localStorage.setItem(internalContactStorageKey, JSON.stringify(internalContactStorage))
  }

  function internalContactStorageClear() {
    global.localStorage.removeItem(internalContactStorageKey)
    internalContactStorage = {}
  }

  function internalContactStorageLoad() {
    if(internalContactStorageKey in global.localStorage)
      internalContactStorage = JSON.parse(global.localStorage.getItem(internalContactStorageKey))
    else internalContactStorage = {}
  }

  function normalizePhoneNumber(num) {
    return nav.mozPhoneNumberService.normalize(num)
  }

  function nativeFetchAndIndexContacts(cb) {
    if(noReindex) {
      cb()
      return
    }
    internalContactStorageClear()
    var crsr = cts.getAll({sortBy: 'name', sortOrder: 'ascending'})
    crsr.onsuccess = function() {
      if(this.result) {
        (function(res) {
          var ctName = res.name[0], l = res.tel.length
          for(var k=0;k<l;k++)
            internalContactStorage[normalizePhoneNumber(res.tel[k].value)] = ctName
        })(this.result)
        this.continue()
      }
      else {
        internalContactStorageSave()
        cb()
      }
    }
    crsr.onerror = function() {
      cb()
    }
  }

  function loadBlockedNumbers(cb) {
    if(callBlockSupport)
      cts.findBlockedNumbers().then(function(bl) {cb(bl)})
    else cb([])
  }

  function loadContacts(forceReindex, cb) {
    loadBlockedNumbers(function(bl) {
      internalBlockList = bl
      if(forceReindex) {
        nativeFetchAndIndexContacts(cb)
      }
      else {
        internalContactStorageLoad()
        cb()
      }
    })
  }

  function findContactById(id, cb) { //natively find contact by internal ID
    cts.find({'filterBy': ['id'], 'filterValue': id, 'filterOp': 'equals'}).then(function(res) {
      if(res.length) cb(res[0])
      else cb(null)
    })
  }

  //call blocking management part

  function checkNumberBlocked(num) {
    return internalBlockList.indexOf(num) > -1
  }

  function blockNumber(num, cb) {
    if(callBlockSupport) {
      cts.saveBlockedNumber(num).then(function(r) {
        var res = r===num
        loadContacts(false, function() {
          properlySaveRecords(function() {
            cb(res)
          })
        })
      })
    }
    else cb(false)
  }

  function unblockNumber(num, cb) {
    if(callBlockSupport) {
      cts.removeBlockedNumber(num).then(function(r) {
        var res = r===num
        loadContacts(false, function() {
          properlySaveRecords(function() {
            cb(res)
          })
        })
      })
    }
    else cb(false)
  }

  //call log management part

  function fetchNativeCallRecords(cb) { //load records from external "calllog" datastore
    var NCR = []
    nav.getDataStores('calllog').then(function(stores) {
      if(stores.length) {
        var cursor = stores[0].sync()
        runNextTask(cursor)
      }
      else cb(NCR)
    })
    
    function runNextTask(cursor) {
      cursor.next().then(function(task) {
        manageTask(cursor, task)
      })
    }

    function manageTask(cursor, task) {
      if(task.operation === 'done') {
        cb(NCR)
        return
      }
      else if(task.operation === 'add' && task.data)
        NCR.push(task.data)
      runNextTask(cursor)
    }

  }
  
  function loadExternalRecords(cb) { //load records from external "calllog" datastore
    fetchNativeCallRecords(function(natRecs) {
      var extRecs = []
      for(var l=natRecs.length,i=0;i<l;i++) {
        var callObj = natRecs[i], callType = callObj.direction.startsWith('outgoing') ? 'outgoing' : 'incoming'
        if(callType === 'incoming' && callObj.duration === 0 && !callObj.hangUpLocal)
          callType = 'missed'
        var record = {
          timestamp: callObj.date,
          number: normalizePhoneNumber(callObj.number),
          type: callType,
          simId: callObj.serviceId,
          duration: callObj.duration,
          blocked: false,
          contactName: null
        }
        extRecs.push(record)
      }
      cb(extRecs)
    })
  }

  function properlySaveRecords(cb) {
    (function icb() {
      reindexAllRecords(function() {
        saveRecords()
        if(!storageMeetsQuota()) {
          recordStorage.pop()
          icb()
        }
        else cb()
      })
    })()
  }

  function importStockRecords(cb) {
    loadRecords(false, function() {
      loadExternalRecords(function(extrecs) {
        var nameResolvers = []
        for(var l = extrecs.length,i=0;i<l;i++) {
          if(!recordStorage.some(function(r) {return r.timestamp === extrecs[i].timestamp})) { //only process non-existing records
            nameResolvers.push(findNumberInContactStorage(extrecs[i].number))
          }
        }
        Promise.all(nameResolvers).then(function(results) {
          for(var l=results.length,i=0;i<l;i++) {
            var record = extrecs[i], ctNum = results[i][0], ctName = results[i][1]
            record.blocked = checkNumberBlocked(record.number) || checkNumberBlocked(ctNum)
            record.contactName = ctName
            recordStorage.push(record)
          }
          properlySaveRecords(function() {
            cb(recordStorage)
          })
        })
      })
    })
  }

  function loadRecords(forceReindex, cb) {
    recordStorage = JSON.parse(global.localStorage.getItem(recordStorageKey)) || []
    if(forceReindex) {
      recordStorageReady = false
      properlySaveRecords(function() {
        recordStorageReady = true
        cb()
      })
    }
    else {
      AlphaIndex.load(searchIndexKey)
      recordStorageReady = true
      cb(recordStorage)
    }
  }

  function saveRecords() {
    global.localStorage.setItem(recordStorageKey, JSON.stringify(recordStorage))
  }

  function clearRecords() {
    recordStorage = []
    global.localStorage.removeItem(recordStorageKey)
  }

  function indexRecord(recId, rec, dontSave) {
    AlphaIndex.add(rec.number, recId)    
    if(rec.contactName)
      AlphaIndex.addMulti(rec.contactName, recId)
    if(!dontSave)
      AlphaIndex.save(searchIndexKey)
  }
 
  function findNumberInContactStorage(num) { //number => name, even if either number is in local format
    return new Promise(function(resolve, reject) {
      var prms = [],
          numbers = Object.keys(internalContactStorage),
          names = Object.values(internalContactStorage),
          l = names.length
      for(var numRec in internalContactStorage)
        prms.push(nav.mozPhoneNumberService.fuzzyMatch(num, numRec))
      Promise.all(prms).then(function(results) {
        for(var i=0;i<l;i++)
          if(results[i]) {resolve([numbers[i], names[i]]); return}
        resolve([num, internalContactStorage[num] || null])
      })
    })
  }

  function reindexAllRecords(cb) {
    AlphaIndex.clear()
    recordStorage.sort(function(a,b){return b.timestamp - a.timestamp})

    for(var i=0,l=recordStorage.length;i<l;i++) {
      recordStorage[i].id = i
      recordStorage[i].blocked = checkNumberBlocked(recordStorage[i].number)
      indexRecord(i, recordStorage[i], true)
    }

    AlphaIndex.save()
    cb()
  }

  function addRecord(number, type, simId, duration, cb) {
    var record = {
      timestamp: Date.now(),
      number: normalizePhoneNumber(number),
      blocked: false,
      type: type,
      simId: simId,
      duration: duration,
      contactName: null
    }
    findNumberInContactStorage(record.number).then(function(res) {
      var ctNum = res[0], ctName = res[1] 
      record.blocked = checkNumberBlocked(record.number) || checkNumberBlocked(ctNum)
      record.contactName = ctName
      recordStorage.push(record)
      properlySaveRecords(cb)
    })
  }

  function removeRecord(recordId, cb) {
    recordStorage.splice(recordId, 1)
    properlySaveRecords(cb)
  }

  function getRecords(ids) { //return records by ids, pass null or nothing to get all
    return (ids === null || ids === undefined) ? recordStorage : recordStorage.filter(function(v){return ids.indexOf(v.id) > -1})
  }

  function findRecords(searchStr) { //return records
    var ids = AlphaIndex.search(searchStr)
    return getRecords(ids)
  }

  //record-to-contact manipulation

  function recordToNewContact(recordId) {
    new MozActivity({
      name: 'new',
      data: {
        type: 'webcontacts/contact',
        caller: 'Call',
        params: {
          tel: recordStorage[recordId].number
        }
      }
    })
  }

  function recordToExistingContact(recordId) {
    new MozActivity({
      name: 'update',
      data: {
        type: 'webcontacts/contact',
        params: {
          tel: recordStorage[recordId].number
        }
      }
    })
  }

  function recordToSMS(recordId) {
    new MozActivity({
      name: 'new',
      data: {
        type: 'websms/sms',
        number: recordStorage[recordId].number
      }
    })
  }

  function findLastDialedNumber(n) {
    var rec = null, k, i, l = recordStorage.length
    if(!n) n = 0
    for(i=0,k=0;i<l;i++) {
      if(recordStorage[i].type === 'outgoing') {
        if(k<n) k++
        else {
          rec = recordStorage[i]
          break
        }
      }
    }
    return rec
  }

  function checkExistingCallsToNumber(num) {
    var calls = nav.mozTelephony.calls, l = calls.length, i, callsExist = false
    for(i=0;i<l;i++) {
      if(num === calls[i].id.number) {
        callsExist = true
        break
      }
    }
    return callsExist
  }

  function doAddRecord(callObj, logUpdateCb) {
    var callType = callObj.direction.startsWith('outgoing') ? 'outgoing' : 'incoming'
    if(callType === 'incoming' && callObj.duration === 0 && !callObj.hangUpLocal)
      callType = 'missed'
    addRecord(callObj.number, callType, callObj.serviceId, callObj.duration, logUpdateCb)
  }

  function handleBtDialerCommand(cmd) {
    if(cmd === 'BLDN') { //redial the last dialed number, try to do this from the same SIM
      var lastNum = findLastDialedNumber()
      if(lastNum && !checkExistingCallsToNumber(lastNum.number)) {
        var simId = MozCaller.isSimActive(lastNum.simId) ? lastNum.simId : 0
        MozCaller.dial(lastNum.number, simId)
      }
    } else if(cmd.startsWith('ATD')) { //advanced dialing, only supports the first found active SIM for now
      var bufNumber = null, simId = -1
      if(cmd[3] === '>') { //dial number from memory
        var numIndex = parseInt(cmd.slice(4)) - 1 //index in the command should start from 1
        bufNumber = findLastDialedNumber(numIndex)
      } else bufNumber = cmd.slice(3)
      if(bufNumber && !checkExistingCallsToNumber(bufNumber)) {
        if(MozCaller.isSimActive(0)) simId = 0
        else if(MozCaller.isSimActive(1)) simId = 1
        MozCaller.dial(bufNumber, simId)
      }
    }
  }

  function waitForRecordStorage(cb) {
    (function wt() {
      if(recordStorageReady) cb()
      else global.setTimeout(wt, 20)
    })()
  }

  function initCallLog(forceReindex, cb, logUpdateCb, contactUpdateCb) {
    if(!contactUpdateCb) contactUpdateCb = function(){}
    if(!elSetup) {
      cts.addEventListener('contactchange', function(){
        loadContacts(true, function() {
          loadRecords(true, contactUpdateCb)
        })
      }, false)
      nav.mozSetMessageHandler('telephony-call-ended', function(callObj) {
        waitForRecordStorage(function() {
          doAddRecord(callObj, logUpdateCb)
        })
      })
      nav.mozSetMessageHandler('bluetooth-dialer-command', function(dialerCommand) {
        waitForRecordStorage(function() {
          handleBtDialerCommand(dialerCommand.command)
        })
      })
      elSetup = true
    }
    loadContacts(forceReindex, function() {
      loadRecords(forceReindex, cb)
    })
  }

  global.CallLogMgr = {
    callBlockSupport: callBlockSupport,
    init: initCallLog,
    create: addRecord,
    remove: removeRecord,
    load: loadRecords,
    get: getRecords,
    find: findRecords,
    block: function(recordId, cb) {
      blockNumber(recordStorage[recordId].number, cb)
    },
    unblock: function(recordId, cb) {
      unblockNumber(recordStorage[recordId].number, cb)
    },
    blockNumber: blockNumber,
    unblockNumber: unblockNumber,
    toNewContact: recordToNewContact,
    toExistingContact: recordToExistingContact,
    toSMS: recordToSMS,
    importStock: importStockRecords,
    isEmpty: function() {
      return global.localStorage.getItem(recordStorageKey) === null || global.localStorage.getItem(searchIndexKey) === null
    }
  }
})(window, navigator);
