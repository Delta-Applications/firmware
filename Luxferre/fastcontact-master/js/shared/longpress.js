//LongPress - a library for easier keyboard/keypad longpress handling
//Created by Luxferre, BananaHackers group
//Released into public domain

(function(global){
  var timeout = 500, curTm = {}, extHandlers = []

  function callAllHandlers(e, isLong) {
    for(var i=0,l=extHandlers.length;i<l;i++)
      extHandlers[i](e, isLong)
  }

  function handleLP(e) {
    if(e.key === 'MicrophoneToggle') {e.preventDefault();return false}
    if(!e.repeat) {
      callAllHandlers(e, false);
      curTm[e.key] = {tm: global.setTimeout(function() {
        if(e.key in curTm) {
          curTm[e.key].tm = null
          callAllHandlers(e, true)
        }
      }, timeout), target: e.target}
      return true
    }
    else return false
  }

  function handleRelease(e) {
    if(e.type === 'keyup' && e.key in curTm && e.target === curTm[e.key].target) {
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()
    }
    for(var k in curTm)
      global.clearTimeout(curTm[k].tm)
    curTm = {}
    return true
  }

  global.LongPress = {
    init: function(tm) { //initialize the module (timeout in ms!)
      if(tm) timeout = tm
      extHandlers = []
      global.addEventListener('keydown', handleLP, false)
      global.addEventListener('keyup', handleRelease, false)
      global.addEventListener('visibilitychange', handleRelease, false)
      global.addEventListener('blur', handleRelease, false)
    },
    on: function(externalHandler) { //add external handler with the following params: (evt, isLong)
      extHandlers.push(externalHandler)
    }
  }
})(window);
