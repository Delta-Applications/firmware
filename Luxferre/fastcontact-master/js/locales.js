//FastLocale
(function(global, nav) {
  var LCDEF = 'en'
  var LCOBJ = {
    'en': {
      'No valid SIMs': 'No valid SIMs',
      'Call failed, connection unavailable': 'Call failed, connection unavailable',
      'Cancel': 'Cancel',
      'Options': 'Options',
      'USE': 'USE',
      'SELECT': 'SELECT',
      'PICK': 'PICK',
      'SAVE': 'SAVE',
      'CALL': 'CALL',
      'SMS': 'SMS',
      'Contacts reindexed': 'Contacts reindexed',
      'No numbers assigned to the contact, call impossible': 'No numbers assigned to the contact, call impossible',
      'No numbers assigned to the contact, SMS impossible': 'No numbers assigned to the contact, SMS impossible',
      'Contact saved': 'Contact saved',
      'Delete the contact $1? This action cannot be undone!': 'Delete the contact $1? This action cannot be undone!',
      'Contact deleted': 'Contact deleted',
      'Name': 'Name',
      'Phone': 'Phone',
      'Save to SIM? Only the first entered number will be saved!': 'Save to SIM? Only the first entered number will be saved!',
      'Save to device': 'Save to device',
      'Save to SIM': 'Save to SIM',
      'Exit': 'Exit',
      'Reindex': 'Reindex',
      'Message': 'Message',
      'About': 'About',
      'New': 'New',
      'Edit': 'Edit',
      'Delete': 'Delete',
      'Close without saving?': 'Close without saving?',
      'No phones found in the contact': 'No phones found in the contact',
      'Indexing, please wait...': 'Indexing, please wait...'
    },
    'tpl': {
      'No valid SIMs': '',
      'Call failed, connection unavailable': '',
      'Cancel': '',
      'Options': '',
      'USE': '',
      'SELECT': '',
      'PICK': '',
      'SAVE': '',
      'CALL': '',
      'SMS': '',
      'Contacts reindexed': '',
      'No numbers assigned to the contact, call impossible': '',
      'No numbers assigned to the contact, SMS impossible': '',
      'Contact saved': '',
      'Delete the contact $1? This action cannot be undone!': '',
      'Contact deleted': '',
      'Name': '',
      'Phone': '',
      'Save to SIM? Only the first entered number will be saved!': '',
      'Save to device': '',
      'Save to SIM': '',
      'Exit': '',
      'Reindex': '',
      'Message': '',
      'About': '',
      'New': '',
      'Edit': '',
      'Delete': '',
      'Close without saving?': '',
      'No phones found in the contact': '',
      'Indexing, please wait...': ''
    },
    'uk': {
      'No valid SIMs': 'Немає активних SIM-карт',
      'Call failed, connection unavailable': 'З\'єднання немає, виклик скасовано',
      'Cancel': 'Скасувати',
      'Options': 'Опції',
      'USE': 'ВИБІР',
      'SELECT': 'ВИБІР',
      'PICK': 'ВИБРАТИ',
      'SAVE': 'ЗБЕРЕГТИ',
      'CALL': 'ВИКЛИК',
      'SMS': 'SMS',
      'Contacts reindexed': 'Контакти переіндексовано',
      'No numbers assigned to the contact, call impossible': 'Контакт не має номерів, виклик неможливий',
      'No numbers assigned to the contact, SMS impossible': 'Контакт не має номерів, SMS неможливе',
      'Contact saved': 'Контакт збережено',
      'Delete the contact $1? This action cannot be undone!': 'Видалити контакт $1? Ця дія невідворотна!',
      'Contact deleted': 'Контакт видалено',
      'Name': 'Ім\'я',
      'Phone': 'Телефон',
      'Save to SIM? Only the first entered number will be saved!': 'Зберегти на SIM? Буде збережено лише перший номер!',
      'Save to device': 'Зберегти на пристрій',
      'Save to SIM': 'Зберегти на SIM',
      'Exit': 'Вихід',
      'Reindex': 'Переіндексація',
      'Message': 'Повідомлення',
      'About': 'Про програму',
      'New': 'Створити',
      'Edit': 'Редагувати',
      'Delete': 'Видалити',
      'Close without saving?': 'Закрити без збереження?',
      'No phones found in the contact': 'Не знайдено номерів у контакті',
      'Indexing, please wait...': 'Індексація, зачекайте...'
    },
    'ru': {
      'No valid SIMs': 'Нет действующих SIM-карт',
      'Call failed, connection unavailable': 'Нет соединения, вызов завершён',
      'Cancel': 'Отмена',
      'Options': 'Опции',
      'USE': 'ВЫБОР',
      'SELECT': 'ВЫБОР',
      'PICK': 'ВЫБРАТЬ',
      'SAVE': 'СОХРАНИТЬ',
      'CALL': 'ВЫЗОВ',
      'SMS': 'SMS',
      'Contacts reindexed': 'Контакты обновлены',
      'No numbers assigned to the contact, call impossible': 'Не присвоен номер телефона. Вызов невозможен',
      'No numbers assigned to the contact, SMS impossible': 'Не присвоен номер телефона. Нельзя отправить SMS',
      'Contact saved': 'Контакт сохранён',
      'Delete the contact $1? This action cannot be undone!': 'Удалить контакт $1? Действие необратимо!',
      'Contact deleted': 'Контакт удалён',
      'Name': 'Имя',
      'Phone': 'Номер',
      'Save to SIM? Only the first entered number will be saved!': 'Сохранить на SIM-карту? Будет сохранён только первый введённый номер!',
      'Save to device': 'Сохранить на устройство',
      'Save to SIM': 'Сохранить на SIM-карту',
      'Exit': 'Выход',
      'Reindex': 'Обновить записи',
      'Message': 'Сообщения',
      'About': 'О программе',
      'New': 'Новый',
      'Edit': 'Редактировать',
      'Delete': 'Удалить',
      'Close without saving?': 'Закрыть без сохранения?',
      'No phones found in the contact': 'Не найдены номера у контакта',
      'Indexing, please wait...': 'Обновление записей, подождите...'
    }
  }

  function tpl(str, vars) {
    if(!(vars instanceof Array)) vars = [vars]
    var l = vars.length, i
    for(i=0;i<l;i++)
      str = str.replace('$'+(i+1), vars[i])
    return str
  }

  global.LC = function(strKey, vars) {
    var lang = nav.language.split('-')[0].toLowerCase(),
        deftr = LCOBJ[LCDEF], tr = deftr, res = strKey
    if(lang in LCOBJ)
      tr = LCOBJ[lang]
    if(strKey in tr)
      res = tr[strKey]
    else if(strKey in deftr)
      res = deftr[strKey]
    return (vars === undefined) ? res : tpl(res, vars)
  }
})(window, navigator)
