//AppMenu - a library for global app menus in the KaiOS UI
//Depends on the DynaList library and appropriate element styling
//Created by Luxferre, BananaHackers group
//Released into public domain

(function(global, doc) {
  var menuList, menuElem, menuOpen, registeredMenus,
      hiddenClass = 'hidden', currentActions = [], currentKey = ''

  function callAction(optionNumber) {
    var action = currentActions[optionNumber]
    if(action) {
      global.AppMenu.close()
      action()
    }
  }

  function keyHandlers(e) {
    if(e.repeat || e.key === 'MicrophoneToggle') {e.preventDefault();return false}
    switch(e.key) {
      case 'ArrowUp':
        if(menuList.hasDisplayableItems()) {
          e.preventDefault()
          menuList.back()
        }
        break
      case 'ArrowDown':
        if(menuList.hasDisplayableItems()) {
          e.preventDefault()
          menuList.forward()
        }
        break
      case 'Enter':
      case 'Call':
      case 'SoftRight':
        e.preventDefault()
        callAction(menuList.getActiveId())
        break
      case 'Back':
      case 'Backspace':
      case 'End':
      case 'SoftLeft':
        e.preventDefault()
        global.AppMenu.close()
        break
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        e.preventDefault()
        var idx = Number(e.key) - 1
        menuList.activeId = idx
        menuList.update()
        callAction(idx)
        break
    }
  }

  global.AppMenu = {
    init: function(elem) {
      menuElem = elem
      menuElem.dataset.menuKey = ''
      menuList = new DynaList(menuElem)
      menuList.maxElemsToRender = 8
      menuOpen = false
      registeredMenus = {}
      currentActions = []
    },
    isOpen: function() {return menuOpen},
    register: function(key, optionToActionMap, openCb, closeCb, useHTML) { //['Option 1', func1], ['Option 2', func2]...
      if(!openCb) openCb = function(){}
      if(!closeCb) closeCb = function(){}
      var regObj = {options: [], actions: [], openCb: openCb, closeCb: closeCb, useHTML: !!useHTML}, i, l = optionToActionMap.length
      for(i=0;i<l;i++) {
        regObj.options.push(optionToActionMap[i][0])
        regObj.actions.push(optionToActionMap[i][1])
      }
      registeredMenus[key] = regObj
    },
    open: function(key) {
      global.addEventListener('keydown', keyHandlers, false)
      menuOpen = true
      currentActions = registeredMenus[key].actions
      menuList.render(registeredMenus[key].options, registeredMenus[key].useHTML)
      menuList.update()
      menuElem.classList.remove(hiddenClass)
      menuElem.dataset.menuKey = key
      currentKey = key
      registeredMenus[key].openCb()
    },
    close: function(key) {
      global.removeEventListener('keydown', keyHandlers, false)
      menuOpen = false
      currentActions = []
      menuElem.classList.add(hiddenClass)
      menuElem.dataset.menuKey = ''
      menuList.clear()
      if(currentKey) {
        registeredMenus[currentKey].closeCb()
        currentKey = ''
      }
    }
  }
})(window, document);
