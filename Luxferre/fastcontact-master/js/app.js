(function(global, nav) {
  var currentPage, contactIndexKey = 'cl',
    //picker mode related vars
    pickerMode = (global.location.hash === '#pick'), pickReq = null,
    //DOM elements
    editor, contactView, dialerField, loadScreen,
    softLeft, softCenter, softRight, toastContainer,
    //internal variables
    directDial, backendContacts, searchBuffer, bufferContact, indexInProgress,
    //DynaLists
    editorList, mainList,
    //misc stuff
    flashlightMgr = null, SKS = [], fullIdCache = {}

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
            updateSoftKeys(LC('Cancel'), LC('USE'), '')
          }, function() {
            restoreSoftKeys()
            contactView.classList.remove('translucent')
          }
        )
        AppMenu.open('simselect')
      }
      else cb(sims[0].connId)
    }
    else toast(LC('No valid SIMs'))
  }

  function doCall(selectedNumber) {
    selectSIM(function(simId) {
      if(simId > -1 && MozCaller.isSimActive(simId))
        MozCaller.dial(selectedNumber, simId)
      else toast(LC('Call failed, connection unavailable'))
    })
  }

  function callContact(contactId) {
    var numbers = backendContacts[contactId|0].tel
    if(numbers.length) {
      if(numbers.length > 1) {
        var opts = []
        for(var i=0;i<numbers.length;i++) (function(num) {
          opts.push([num, function(){doCall(num)}])
        })(numbers[i].value)
        AppMenu.register('contactnumberselect', opts,
          function() { //on open
            toggleVisualMode('numberSelector')
            stashSoftKeys()
            updateSoftKeys(LC('Cancel'), LC('CALL'), '')
          },
          function() { //on close
            toggleVisualMode('main')
            restoreSoftKeys()
          }
        )
        AppMenu.open('contactnumberselect')
      }
      else doCall(numbers[0].value)
    } else global.alert(LC('No numbers assigned to the contact, call impossible'))
  }


  //frontend functions

  function toast(msg) {
    toastContainer.textContent = msg
    toastContainer.classList.add('active')
    setTimeout(function() {
      toastContainer.classList.remove('active')
    }, 2000)
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
    contactView.classList.add('hidden')
    editor.classList.add('hidden')
    switch(component) {
      case 'main':
        contactView.classList.remove('hidden')
        contactView.classList.remove('translucent')
        updateSearchView()
        break
      case 'editor':
        dialerField.classList.add('hidden')
        contactView.classList.remove('withsearch')
        editor.classList.remove('hidden')
        editor.classList.remove('translucent')
        break
      case 'numberSelector':
        dialerField.classList.add('hidden')
        contactView.classList.remove('withsearch')
        contactView.classList.remove('hidden')
        contactView.classList.add('translucent')
        break
      case 'appMenuMain':
        contactView.classList.remove('hidden')
        contactView.classList.add('translucent')
        break
      case 'appMenuEditor':
        editor.classList.remove('hidden')
        editor.classList.add('translucent')
        break
      default:
        break
    }
  }

  function closeEditor() {
    toggleVisualMode('main')
    currentPage = 'main'
    editorClearFields()
    updateSoftKeys(LC('SMS'), LC('CALL'), LC('Options'))
  }

  function closeEditorAfterSaving() {
    toggleVisualMode('main')
    openMain(true, false)
  }

  function searchAndRender(searchStr) {
    if(searchStr === '') {
      mainList.filter(null)
      return null
    } else {
      var results = ContactMgr.find(searchStr), validListIds = [], i, l = results.length
      for(i=0;i<l;i++)
        validListIds.push(fullIdCache[results[i].id])
      mainList.filter(validListIds)
      return validListIds
    }
  }

  function initialRender() {
    var results = ContactMgr.find(''), names = [], i, l = results.length
    var ctypes = ['device', 'sim1', 'sim2'], foundIds = []
    backendContacts = []
    fullIdCache = {}
    for(i=0;i<l;i++) {
      foundIds.push(i)
      backendContacts.push(results[i].contact)
      fullIdCache[results[i].id] = i
      names.push('<span class="contact-'+ctypes[results[i].simId+1]+'">'+escapeName(results[i].name)+'</span>')
    }
    mainList.render(names, true)
    mainList.update()
    return foundIds
  }

  function openMain(forceReindex, blocking) {
    currentPage = 'main'
    if(pickerMode)
      updateSoftKeys('', LC('PICK'), '')
    else
      updateSoftKeys(LC('SMS'), LC('CALL'), LC('Options'))
    editorClearFields()
    bufferContact = null
    if(blocking) {
      loadScreen.classList.remove('hidden')
      indexInProgress = true
    }
    ContactMgr.load(forceReindex, function() {
      if(blocking) {
        indexInProgress = false
        loadScreen.classList.add('hidden')
      }
      if(forceReindex)
        toast(LC('Contacts reindexed'))
      initialRender()
      if(blocking) searchBuffer = ''
      updateSearchView()
    })
  }

  function updateSearchView() {
    var validContactIds = searchAndRender(searchBuffer)
    dialerField.textContent = searchBuffer.slice(-12)
    directDial = false
    if(searchBuffer.length) {
      dialerField.classList.remove('hidden')
      if(!contactView.classList.contains('withsearch'))
        contactView.classList.add('withsearch')
      if(validContactIds !== null && validContactIds.length === 0)
        directDial = true
    }
    else {
      dialerField.classList.add('hidden')
      contactView.classList.remove('withsearch')
    }
  }

  //Editor logic start
  
  function getEditorNodes() {
    return {
      nameNode: editor.querySelector('input.name'),
      numberNodes: editor.querySelectorAll('input[type="tel"]')
    }
  }

  function editorFocusActiveInput() {
    document.activeElement.blur() //prevent refocusing with the same IME config due to a bug in KaiOS IME   
    var activeInput = editor.querySelector('[data-list-id="'+editorList.getActiveId()+'"] input')
    global.requestAnimationFrame(function() {
      activeInput.focus()
    })
  }

  function editorLoad(contactObj) {
    var nodes = getEditorNodes(), l = contactObj.tel.length, i
    nodes.nameNode.value = contactObj.name[0]
    for(i=0;i<l;i++)
      nodes.numberNodes[i].value = contactObj.tel[i].value
  }

  function openEditor(existing, contactId) {
    var defValue = existing ? '' : searchBuffer, template = [
        '<input type="text" class="name" placeholder="'+LC('Name')+'" autocorrect="off" />',
        '<input type="tel" placeholder="'+LC('Phone')+' 1" inputmode="tel" autocorrect="off" value="' + defValue + '" />',
        '<input type="tel" placeholder="'+LC('Phone')+' 2" inputmode="tel" autocorrect="off" />',
        '<input type="tel" placeholder="'+LC('Phone')+' 3" inputmode="tel" autocorrect="off" />',
        '<input type="tel" placeholder="'+LC('Phone')+' 4" inputmode="tel" autocorrect="off" />'
      ]
    editorList.render(template, true)
    if(existing) {
      ContactMgr.getById(backendContacts[contactId].id, function(ct) {
        bufferContact = ct
        editorLoad(bufferContact)
      })
    }
    editorList.update()
    //final visual part
    currentPage = 'editor'
    updateSoftKeys(LC('Cancel'), LC('SAVE'), LC('Options'))
    toggleVisualMode('editor')
    editorFocusActiveInput()
  }
  
  function editorClearFields() {
    bufferContact = null
    editorList.clear()
  }

  function editorSave(simId) { //pass -1 to save onto the device
    var dataprops = {name: [], givenName: [], familyName: [], tel: []}, editorNodes = getEditorNodes(),
      editorNodesAmount = simId > -1 ? 1 : editorNodes.numberNodes.length, i,
      numbersFromEditor = []
    dataprops.name[0] = editorNodes.nameNode.value.trim()
    dataprops.givenName[0] = editorNodes.nameNode.value.trim()
    dataprops.familyName[0] = editorNodes.nameNode.value.trim()
    for(i=0;i<editorNodesAmount;i++) {
      var cnum = editorNodes.numberNodes[i].value.trim()
      if(cnum)
        dataprops.tel.push({value: cnum, type: ['mobile']})
    }
    if(bufferContact) //update an existing contact
      ContactMgr.update(bufferContact, simId, dataprops)
    else //create a new contact
      ContactMgr.create(simId, dataprops)
    toast(LC('Contact saved'))
  }

  //Editor logic end
  
  function deleteContact(contactId) {
    var contactObj = backendContacts[contactId],
      contactName = contactObj.name[0]
    ContactMgr.getById(contactObj.id, function(ct) {
      if(ct && global.confirm(LC('Delete the contact $1? This action cannot be undone!', contactName))) {
        ContactMgr.remove(ct)
        toast(LC('Contact deleted'))
      }
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

  function openExternalSMSComposer(isContact, contactIdOrNumber) {
    if(isContact) {
      var numbers = backendContacts[contactIdOrNumber].tel
      if(numbers.length) {
        if(numbers.length > 1) {
          var opts = []
          for(var i=0;i<numbers.length;i++) (function(num) {
            opts.push([num, function(){doOpenSms(num)}])
          })(numbers[i].value)
          AppMenu.register('smsnumberselect', opts,
            function() { //on open
              toggleVisualMode('numberSelector')
              stashSoftKeys()
              updateSoftKeys('Cancel', 'USE', '')
            },
            function() { //on close
              toggleVisualMode('main')
              restoreSoftKeys()
            }
          )
          AppMenu.open('smsnumberselect')
        }
        else doOpenSms(numbers[0].value)
      } else global.alert(LC('No numbers assigned to the contact, SMS impossible'))
    } else doOpenSms(contactIdOrNumber)
  }

  function openAppMenu() {
    var isEditor = currentPage === 'editor',
        vmClass = isEditor ? 'appMenuEditor' : 'appMenuMain',
        opts = []
    if(isEditor) {
      opts = [
        [LC('Save to device'), function() {
          editorSave(-1)
        }],
        [LC('Save to SIM'), function() {
          if(global.confirm(LC('Save to SIM? Only the first entered number will be saved!')))
            selectSIM(function(simId) {
              if(simId > -1) editorSave(simId)
              else toggleVisualMode('editor')
            })
        }],
        [LC('Exit'), function() {
          closeEditor() //after canceling
          editorClearFields()
        }]
      ]
    } else {
      if(mainList.hasDisplayableItems())
        opts.push([LC('Edit'), function(){
          openEditor(true, mainList.getActiveId())
        }])
      opts.push([LC('New'), function(){
        openEditor(false)
      }])
      if(mainList.hasDisplayableItems())
        opts.push([LC('Delete'), function(){
          deleteContact(mainList.getActiveId())
        }])
      opts.push([LC('Message'), function(){
        openExternalSMSComposer(mainList.hasDisplayableItems(), mainList.hasDisplayableItems() ? mainList.getActiveId() : searchBuffer)
      }])
      opts.push([LC('Reindex'), function(){
        toggleVisualMode('main')
        openMain(true, true)
      }])
      opts.push([LC('About'), function(){
        navigator.mozApps.getSelf().then(function(app){
          var mfst = app.manifest
          var aboutText = mfst.name + ' v' + mfst.version + ' by ' + mfst.developer.name
          toast(aboutText)
        })
      }])
    }
    AppMenu.register('mainmenu', opts,
      function() { //on open
        toggleVisualMode(vmClass)
        stashSoftKeys()
        updateSoftKeys(LC('Cancel'), LC('SELECT'), '')
      },
      function() { //on close
        toggleVisualMode(currentPage)
        restoreSoftKeys()
      }
    )
    AppMenu.open('mainmenu')
  }

  function appStart() {
    var appRoot = document.querySelector('main')
    contactView = appRoot.querySelector('.clist')
    editor = appRoot.querySelector('.cedit')
    softLeft = document.getElementById('softkey-left')
    softRight = document.getElementById('softkey-right')
    softCenter = document.getElementById('softkey-center')
    toastContainer = document.querySelector('.toast')
    dialerField = document.querySelector('.searchdial')
    loadScreen = document.querySelector('.loadscreen')

    loadScreen.querySelector('span').textContent = LC('Indexing, please wait...')

    mainList = new DynaList(contactView)
    editorList = new DynaList(editor)
    directDial = false

    AppMenu.init(appRoot.querySelector('.appmenu'))
    searchBuffer = ''
    openMain(ContactMgr.isEmpty(), true)
  }

  function keyHandleNormal(e, isLong) {
    if(!isLong && !indexInProgress && !AppMenu.isOpen()) { //handle normal key presses
      switch(e.key) {
        case 'ArrowUp': //scroll the list up
          if(currentPage == 'main' && mainList.hasDisplayableItems()) {
            mainList.back()
          }
          else if(currentPage == 'editor') {
            editorList.back()
            editorFocusActiveInput()
          }
          break
        case 'ArrowDown': //scroll the list down
          if(currentPage == 'main' && mainList.hasDisplayableItems()) {
            mainList.forward()
          }
          else if(currentPage == 'editor') {
            editorList.forward()
            editorFocusActiveInput()
          }
          break
        case 'SoftLeft':
          if(currentPage == 'main')
            openExternalSMSComposer(mainList.hasDisplayableItems(), mainList.hasDisplayableItems() ? mainList.getActiveId() : searchBuffer)
          else if(currentPage == 'editor') {
            closeEditor() //after canceling
            editorClearFields()
          }
          break
        case 'SoftRight': //view/edit contact
          if(currentPage == 'main' || currentPage == 'editor')
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
              callContact(mainList.getActiveId())
          }
          else if(currentPage == 'editor') {
            openAppMenu()
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
          else if(currentPage == 'editor') {
            e.preventDefault()
            if(global.confirm(LC('Close without saving?'))) {
              closeEditor()
              editorClearFields()
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
          if(currentPage == 'main') {
            e.preventDefault()
            searchBuffer += e.key
            updateSearchView()
          }
          break
      }
    } else if(!indexInProgress && !AppMenu.isOpen()) { //handle long key presses
      switch(e.key) {
        case '0':
          if(currentPage == 'main') {
            e.preventDefault()
            searchBufferUndo()
            searchBuffer += '+'
            updateSearchView()
          }
          break
        case '*':
          if(currentPage == 'main') {
            e.preventDefault()
            searchBufferUndo()
            searchBuffer += ','
            updateSearchView()
          }
          break
        case 'SoftLeft':
          if(currentPage == 'editor') {
            toggleVisualMode('main')
            openMain(true, true)
          }
          break
        case '#':
          if(flashlightMgr && currentPage === 'main') {
            e.preventDefault()
            searchBufferUndo()
            updateSearchView()
            flashlightMgr.flashlightEnabled = !flashlightMgr.flashlightEnabled
          }
          break
      }
    }
  }

  function actuallyPickContact(reqData, numIndex, contactObj) {
    var res = {contact: contactObj}
    switch(reqData.type) { //default is webcontacts/contact
      case 'webcontacts/tel':
        res.telIndex = numIndex
        break
      case 'webcontacts/select':
        res.selectedValues = [contactObj.tel[numIndex]]
        break
    }
    pickReq.postResult(res)
  }

  function doPickContact(reqData, contactObj) {
    var numbers = contactObj.tel
    if(numbers.length) {
      if(numbers.length > 1) {
        var opts = []
        for(var i=0;i<numbers.length;i++) (function(i) {
          opts.push([numbers[i].value, function(){
            actuallyPickContact(reqData, i, contactObj)
          }])
        })(i)
        AppMenu.register('contactnumberselect', opts,
          function() { //on open
            toggleVisualMode('numberSelector')
            stashSoftKeys()
            updateSoftKeys('Cancel', 'USE', '')
          },
          function() { //on close
            toggleVisualMode('main')
            restoreSoftKeys()
          }
        )
        AppMenu.open('contactnumberselect')
      }
      else actuallyPickContact(reqData, 0, contactObj)
    } else pickReq.postError(LC('No phones found in the contact'))
  }

  function keyHandlePicker(e) {
    if(e.repeat) return false
    if(!indexInProgress && !AppMenu.isOpen()) {
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
        case 'Enter': //pick the contact
        case 'Call':
          if(currentPage == 'main' && mainList.hasDisplayableItems() && pickReq) { 
            doPickContact(pickReq.source.data, backendContacts[mainList.getActiveId()])
          }
          break
        case 'Back': 
        case 'End': 
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
          if(currentPage == 'main') {
            e.preventDefault()
            searchBuffer += e.key
            updateSearchView()
          }
          break
      }
    }
  }

  if('getFlashlightManager' in nav) {
    nav.getFlashlightManager().then(function(fm) {
      flashlightMgr = fm
    })
  }

  global.addEventListener('DOMContentLoaded', appStart, false)
  if(pickerMode) { //picker activity launched
    global.addEventListener('keydown', keyHandlePicker, false)
    nav.mozSetMessageHandler('activity', function(req) {
      if(req.source.name === 'pick')
        pickReq = req
    })
  } else { //init everything in the normal mode
    LongPress.init(550);
    LongPress.on(keyHandleNormal)
    ContactMgr.onchange(closeEditorAfterSaving)
  }
})(window, navigator)
