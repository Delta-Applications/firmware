(function(global, nav) {
  var currentPage,
    //DOM elements
    editor, logRecordView, dialerField, loadScreen,
    softLeft, softCenter, softRight, toastContainer,
    //internal variables
    directDial, backendRecords, searchBuffer, indexInProgress,
    //DynaLists
    mainList,
    //misc stuff
    h12Setting = false, SKS = [], fullIdCache = {}, flashlightMgr = null

  //backend functions
  
  function escapeName(str) {
    return str.replace(/>/g,'&gt;').replace(/</g,'&lt;')
  }

  function searchBufferUndo() {
    searchBuffer = searchBuffer.slice(0,-1)
  }

  function detectSims() {
    var i, detectedSims = [], conns = nav.mozMobileConnections, l = conns.length;
    for(i=0;i<l;i++) {
      if(conns[i].voice.connected)
        detectedSims.push({connId: i, network: conns[i].voice.network.shortName})
    }
    return detectedSims
  }

  function selectSIM(cb) {
    var sims = detectSims(), l = sims.length
    if(l) {
      if(l > 1) {
        var i, opts = []
        for(i=0;i<sims.length;i++) (function(idx, net, cid){
          opts.push(['SIM ' + (idx+1) + ' (' + net + ')', function(){cb(cid)}])
        })(i, sims[i].network, sims[i].connId)
        AppMenu.register('simselect', opts, function(){
            toggleVisualMode('numberSelector')
            stashSoftKeys()
            updateSoftKeys('Cancel', 'USE', '')
          }, function(){
            restoreSoftKeys()
            logRecordView.classList.remove('translucent')
          }
        )
        AppMenu.open('simselect')
      }
      else cb(sims[0].connId)
    }
    else toast('No valid SIMs')
  }

  function doCall(selectedNumber) {
    selectSIM(function(simId) {
      if(simId > -1 && MozCaller.isSimActive(simId))
        MozCaller.dial(selectedNumber, simId)
      else toast('Call failed, connection unavailable')
    })
  }

  function callRecord(recId) {
    var number = backendRecords[recId|0].number
    doCall(number)
  }

  //frontend functions

  function toast(msg) {
    toastContainer.textContent = msg
    toastContainer.classList.add('active')
    setTimeout(function() {
      toastContainer.classList.remove('active')
    }, 4000)
  }

  function updateSoftKeys(leftText, centerText, rightText) {
    softLeft.textContent = leftText
    softCenter.textContent = centerText
    softRight.textContent = rightText
  }

  function stashSoftKeys() {
    SKS = [
      softLeft.textContent,
      softCenter.textContent,
      softRight.textContent
    ]
  }

  function restoreSoftKeys() {
    softLeft.textContent = SKS[0]
    softCenter.textContent = SKS[1]
    softRight.textContent = SKS[2]
  }

  function toggleVisualMode(component) {
    logRecordView.classList.add('hidden')
    switch(component) {
      case 'main':
        logRecordView.classList.remove('hidden')
        logRecordView.classList.remove('translucent')
        updateSearchView()
        break
      case 'numberSelector':
        dialerField.classList.add('hidden')
        logRecordView.classList.remove('withsearch')
        logRecordView.classList.remove('hidden')
        logRecordView.classList.add('translucent')
        break
      case 'appMenuMain':
        logRecordView.classList.remove('hidden')
        logRecordView.classList.add('translucent')
        break
      default:
        break
    }
  }

  function searchAndRender(searchStr) {
    if(searchStr === '') {
      mainList.filter(null)
      return null
    } else {
      var results = CallLogMgr.find(searchStr), validListIds = [], i, l = results.length
      for(i=0;i<l;i++)
        validListIds.push(fullIdCache[results[i].id])
      mainList.filter(validListIds)
      return validListIds
    }
  }

  function getTimeStr(timestamp) {
    return (new Date(timestamp)).toLocaleTimeString(nav.language, {hour12: h12Setting, timeStyle: 'short', hour: '2-digit', minute: '2-digit'})
  }

  function getDateStr(timestamp) {
    return (new Date(timestamp)).toLocaleDateString(nav.language, {dateStyle: 'short', year: '2-digit', month: '2-digit', day: '2-digit'})
  }

  function align2(s) {
    return ('00' + s).slice(-2)
  }

  function getDurationStr(durationMs) {
    var totalSeconds = Math.ceil(durationMs/1000), h, m, s
    h = 0|(totalSeconds / 3600)
    totalSeconds = totalSeconds - h*3600
    m = 0|(totalSeconds / 60)
    s = totalSeconds%60
    var m_s = align2(m) + ':' + align2(s)
    return h ? (h + ':' + m_s) : m_s
  }

  function initialRender() {
    var results = CallLogMgr.find(''), names = [], i, l = results.length
    var ctypes = ['sim1', 'sim2'], foundIds = []
    backendRecords = []
    fullIdCache = {}
    for(i=0;i<l;i++) {
      foundIds.push(results[i].id)
      backendRecords.push(results[i])
      fullIdCache[results[i].id] = i
      var contactNumberField = '', callMeta = getTimeStr(results[i].timestamp) + '&nbsp;' + getDateStr(results[i].timestamp)
      if(results[i].duration)
        callMeta += '&nbsp;' + getDurationStr(results[i].duration)
      if(results[i].contactName)
        contactNumberField = '<span class="contact-number">' + escapeName(results[i].number) + '</span>'
      names.push('<span class="contact-' + ctypes[results[i].simId] + (results[i].blocked ? ' blocked' : '') + '" data-icon="call-' + results[i].type + '">'
        + '<span class="contact-name">' + escapeName(results[i].contactName || results[i].number) + '</span>'
        + contactNumberField + '<span class="call-meta">' + callMeta + '</span>'
        + '</span>')
    }
    mainList.render(names, true)
    mainList.update()
    return foundIds
  }

  function initCallLogMgr(forceReindex, blocking, noToast) {
    CallLogMgr.init(forceReindex, function() { //on load
      if(blocking) {
        indexInProgress = false
        loadScreen.classList.add('hidden')
      }
      if(forceReindex && !noToast)
        toast('Call log reindexed')
      initialRender()
      if(blocking) searchBuffer = ''
      updateSearchView()
    }, function() { //on list update
      initialRender()
      updateSearchView() 
    })
  }

  function openMain(forceReindex, blocking) {
    currentPage = 'main'
    updateSoftKeys('SMS', 'CALL', 'Options')
    if(blocking) {
      loadScreen.classList.remove('hidden')
      indexInProgress = true
    }
    initCallLogMgr(forceReindex, blocking, false)
  }

  function updateSearchView() {
    var validRecordIds = searchAndRender(searchBuffer)
    dialerField.textContent = searchBuffer.slice(-12)
    directDial = false
    if(searchBuffer.length) {
      dialerField.classList.remove('hidden')
      if(!logRecordView.classList.contains('withsearch'))
        logRecordView.classList.add('withsearch')
      if(validRecordIds !== null && validRecordIds.length === 0)
        directDial = true
    }
    else {
      dialerField.classList.add('hidden')
      logRecordView.classList.remove('withsearch')
    }
  }

  function openAppMenu() {
    var vmClass = 'appMenuMain', opts = [], curId = null
    if(mainList.listLength && mainList.hasDisplayableItems()) {
      opts.push(['Add to new contact', function(){
        CallLogMgr.toNewContact(curId)
      }])
      opts.push(['Add to existing contact', function(){
        CallLogMgr.toExistingContact(curId)
      }])
      opts.push(['Message', function(){
        CallLogMgr.toSMS(curId)
      }])
      if(CallLogMgr.callBlockSupport)
        opts.push(['Block/unblock', function(){
          var rec = backendRecords[curId], recName = rec.contactName || rec.number
          if(rec.blocked) {
            if(global.confirm('Unblock ' + recName + '?'))
              CallLogMgr.unblock(curId, function() {
                toast('Number unblocked')
                openMain(false, false)
              })
          }
          else {
            if(global.confirm('Block ' + recName + '?'))
              CallLogMgr.block(curId, function() {
                toast('Number blocked')
                openMain(false, false)
              })
          }
        }])
      opts.push(['Delete', function(){
        if(global.confirm('Delete the call log entry? This action acnnot be undone!')) {
          CallLogMgr.remove(curId, function() {
            toast('Entry deleted')
            openMain(true, false)
          })
        }
      }])
    }
    opts.push(['Reindex', function(){
      toggleVisualMode('main')
      openMain(true, true)
    }])
    opts.push(['Import stock logs', function() {
      if(global.confirm('Import call logs from the stock storage? This may take time!'))
        loadScreen.classList.remove('hidden')
        indexInProgress = true
        CallLogMgr.importStock(function() {
          loadScreen.classList.add('hidden')
          indexInProgress = false
          toggleVisualMode('main')
          initCallLogMgr(true, true, true)
          toast('Stock records imported')
        })
    }])
    opts.push(['About', function(){
      navigator.mozApps.getSelf().then(function(app){
        var mfst = app.manifest
        var aboutText = mfst.name + ' v' + mfst.version + ' by ' + mfst.developer.name
        toast(aboutText)
      })
    }])

    AppMenu.register('mainmenu', opts,
      function() { //on open
        curId = mainList.getActiveId()
        toggleVisualMode(vmClass)
        stashSoftKeys()
        updateSoftKeys('Cancel', 'SELECT', '')
      },
      function() { //on close
        toggleVisualMode(currentPage)
        restoreSoftKeys()
      }
    )
    AppMenu.open('mainmenu')
  }

  function populateSettings(cb) {
    nav.mozSettings.createLock().get('locale.hour12').then(function(hs){
      h12Setting = hs['locale.hour12']
      cb(hs)
    })
  }

  function doOpenSms(number) {
    var activity =new MozActivity({
      name: 'new',
      data: {
        type: 'websms/sms',
        number: number.split(',')[0]
      }
    })
  }

  function appStart() {
    var appRoot = document.querySelector('main')
    logRecordView = appRoot.querySelector('.clist')
    softLeft = document.getElementById('softkey-left')
    softRight = document.getElementById('softkey-right')
    softCenter = document.getElementById('softkey-center')
    toastContainer = document.querySelector('.toast')
    dialerField = document.querySelector('.searchdial')
    loadScreen = document.querySelector('.loadscreen')

    mainList = new DynaList(logRecordView)
    directDial = false
    populateSettings(function() {
      AppMenu.init(appRoot.querySelector('.appmenu'))
      searchBuffer = ''
      openMain(CallLogMgr.isEmpty(), true)
    })
  }

  function keyHandle(e, isLong) {
    if(!indexInProgress && !AppMenu.isOpen()) {
      if(!isLong) { //handle normal key presses
        switch(e.key) {
          case 'ArrowUp': //scroll the list up
            if(currentPage == 'main' && mainList.hasDisplayableItems()) {
              mainList.back()
            }
            break
          case 'ArrowDown': //scroll the list down
            if(currentPage == 'main' && mainList.hasDisplayableItems()) {
              mainList.forward()
            }
            break
          case 'ArrowLeft': //go to the list start
            if(currentPage == 'main' && mainList.hasDisplayableItems()) {
              mainList.activeId = 0
              mainList.back()
              mainList.forward()
            }
            break
          case 'ArrowRight': //go to the list end
            if(currentPage == 'main' && mainList.hasDisplayableItems()) {
              mainList.activeId = mainList.listLength - 1
              mainList.forward()
              mainList.back()
            }
            break
          case 'SoftLeft':
            if(currentPage == 'main' && mainList.hasDisplayableItems())
              CallLogMgr.toSMS(mainList.getActiveId())
            else if(searchBuffer)
              doOpenSms(searchBuffer)
            break
          case 'SoftRight': //view/edit contact
            if(currentPage == 'main')
              openAppMenu()
            break
          case 'Enter': //call the contact
          case 'Call':
            if(currentPage == 'main') {
              if(directDial && searchBuffer) {
                doCall(searchBuffer)
                searchBuffer = ''
                updateSearchView()
              } else if(mainList.hasDisplayableItems())
                callRecord(mainList.getActiveId())
            }
            break
          case 'Back': //initiate app shutdown if on the main screen, 
          case 'End':  //otherwise return to the main screen
          case 'Backspace': 
            if(currentPage == 'main') {
              if(searchBuffer) {
                e.preventDefault()
                searchBufferUndo()
                updateSearchView()
              }
            }
            break
          case '0': //engage search mode
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
          case '*':
          case '#':
            e.preventDefault()
            searchBuffer += e.key
            updateSearchView()
            break
        }
      } else { //handle long key presses
        switch(e.key) {
          case '*':
            e.preventDefault()
            searchBufferUndo()
            searchBuffer += ','
            updateSearchView()
            break
          case '0':
            e.preventDefault()
            searchBufferUndo()
            searchBuffer += '+'
            updateSearchView()
            break
          case '#':
            if(flashlightMgr) {
              if(currentPage == 'main') {
                e.preventDefault()
                searchBufferUndo()
                flashlightMgr.flashlightEnabled = !flashlightMgr.flashlightEnabled
                updateSearchView()
              }
            }
            break
        }
      }
    }
  }

  if('getFlashlightManager' in nav) {
    nav.getFlashlightManager().then(function(fm) {
      flashlightMgr = fm
    })
  }

  LongPress.init(550)
  LongPress.on(keyHandle)
  global.addEventListener('DOMContentLoaded', appStart, false)
})(window, navigator)
