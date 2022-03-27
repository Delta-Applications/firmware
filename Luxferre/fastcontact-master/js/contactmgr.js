//Optimized contact manager - the heart of FastContact project
//Depends on AlphaIndex library

(function(global, nav) {
  var cts = nav.mozContacts, searchIndexKey = 'ctsi',
      editableFields = ['id', 'name', 'familyName', 'givenName', 'tel', 'category', 'email'],
      efl = editableFields.length, internalStorageKey = 'fcst', internalStorage = {}, noReindex = false
  function internalStorageSave() {
    global.localStorage.setItem(internalStorageKey, JSON.stringify(internalStorage))
  }

  function internalStorageClear() {
    global.localStorage.removeItem(internalStorageKey)
    internalStorage = {}
  }

  function internalStorageLoad() {
    if(internalStorageKey in global.localStorage)
      internalStorage = JSON.parse(global.localStorage.getItem(internalStorageKey))
    else internalStorage = {}
  }

  function simIdToCat(simId) {
    return simId > -1 ? ['KAICONTACT', 'SIM', 'SIM'+simId] : ['KAICONTACT', 'DEVICE']
  }

  function catToSimId(cat) {
    var simId = -1
    if(cat && cat.indexOf('SIM') > -1) {
      if(cat.indexOf('SIM0') > -1)
        simId = 0
      else
        simId = 1
    }
    return simId
  }

  function nativeFetchAndIndex(cb) {
    if(noReindex) {
      cb()
      return
    }
    AlphaIndex.clear()
    internalStorageClear()
    var crsr = cts.getAll({sortBy: 'name', sortOrder: 'ascending'})
    crsr.onsuccess = function() {
      if(this.result) {
        (function(res) {
          var ct = {}
          for(var k=0;k<efl;k++)
            ct[editableFields[k]] = res[editableFields[k]]
          if(!res.name) res.name = ['']
          if(res.name[0].length)
            AlphaIndex.addMulti(res.name[0], res.id)
          internalStorage[res.id] = {
            id: res.id,
            name: res.name[0],
            simId: catToSimId(res.category),
            contact: ct
          }
        })(this.result)
        this.continue()
      }
      else {
        AlphaIndex.save(searchIndexKey)
        internalStorageSave()
        cb()
      }
    }
    crsr.onerror = function() {
      cb()
    }
  }

  function loadContacts(forceReindex, cb) {
    if(forceReindex) {
      nativeFetchAndIndex(cb)
    }
    else {
      AlphaIndex.load(searchIndexKey)
      internalStorageLoad()
      cb()
    }
  }

  function createContact(simId, dataprops) { //simId == -1 is the device
    dataprops.category = simIdToCat(simId)
    var ct = new mozContact(dataprops)
    cts.save(ct)
    return ct
  }

  function updateContact(ct, simId, dataprops) { //simId == -1 is the device
    dataprops.category = simIdToCat(simId)
    for(var k in dataprops)
      ct[k] = dataprops[k]
    cts.save(ct)
    return ct
  }

  function removeContact(ct) {
    cts.remove(ct)
  }

  function nativeFindByPrefix(prefix, cb) { //natively find contacts by name prefix
    cts.find({'sortBy': 'name', 'sortOrder': 'ascending', 'filterBy': ['name'], 'filterValue': prefix, 'filterOp': 'startsWith'}).then(cb)
  }

  function nativeFindById(id, cb) { //natively find contact by internal ID
    cts.find({'filterBy': ['id'], 'filterValue': id, 'filterOp': 'equals'}).then(function(res) {
      if(res.length) cb(res[0])
      else cb(null)
    })
  }

  function findContacts(searchStr) {
    var ids = AlphaIndex.search(searchStr), i, l = ids.length, res = []
    for(i=0;i<l;i++)
      res.push(internalStorage[ids[i]])
    return res
  }

  global.ContactMgr = {
    create: createContact,
    update: updateContact,
    remove: removeContact,
    getById: nativeFindById,
    load: loadContacts,
    find: findContacts,
    isEmpty: function() {
      return global.localStorage.getItem(searchIndexKey) === null
    },
    onchange: function(cb) {
      cts.addEventListener('contactchange', cb, false)
    },
    test: {
      createContactBatch: function(amount) {
        noReindex = true
        for(var i=0;i<amount;i++) {
          var rndName = 'test ' + (0|Math.random()*1e5),
              rndPhone = ''+(0|Math.random()*1e9)
          createContact(-1, {
            name: [rndName],
            familyName: [rndName],
            givenName: [rndName],
            tel:[{value:rndPhone, type:['mobile']}]
          })
        }
        noReindex = false
      },
      deleteContactBatch: function() {
        nativeFindByPrefix('test ', function(ctList) {
          noReindex = true
          for(var i=0,l=ctList.length;i<l;i++)
            removeContact(ctList[i])
          noReindex = false
        })
      }
    }
  }
})(window, navigator);
