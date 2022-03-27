window.addEventListener('DOMContentLoaded', function() {
  var nav = navigator,
      actionLock = false,
      masterExt = nav.engmodeExtension || nav.jrdExtension || nav.kaiosExtension,
      prefContent = document.getElementById('prefcontent'),
      prefKey = 'apps.serviceCenter.allowedOrigins'

  prefContent.value = masterExt.getPrefValue(prefKey, '').split(',').join('\n')

  function customPrefSet(prefName, prefValue, cb, err) {
    cmdSet = [
      'cd /data/b2g/mozilla/*.default',
      'cp prefs.js /data/local/tmp',
      'grep -v "' + prefName + '" /data/local/tmp/prefs.js > prefs.js',
      'echo \'user_pref("' + prefName + '","' + prefValue + '");\' >> prefs.js'
    ].join(';')
    var runner = masterExt.startUniversalCommand(cmdSet, true)
    runner.onsuccess = cb
    runner.onerror = err
  }
  
  window.addEventListener('keydown', function(e) {
    if(!actionLock && e.key === 'Call') {
      actionLock = true
      var prefVal = prefContent.value.split('\n').join(',')
      customPrefSet(prefKey, prefVal, function() {
        if(window.confirm('Reboot phone now to apply the change?'))
          masterExt.setPropertyValue('sys.powerctl', 'reboot')
        actionLock = false
      }, function(e) {
        window.alert('Invokation error: ' + e)
        actionLock = false
      })
    }
  })

  prefContent.focus()

}, false)
