//AlphaIndex - a library for name search indexing with "reverse T9" method
//Created by Luxferre, BananaHackers group
//Released into public domain

(function(global) {
  var primaryDict = {
    '0': '0+ ',
    '1': '1.,?!;:_/@-=',
    '2': '2abcабвгґäçàâáăāĉčąćѓəғαβγάაბგდաբգդ',
    '3': '3defдеёєжзëæéèêðďěęėēђđз́ѕδεζέევზთեզէը',
    '4': '4ghiиіїйклïîíįīĝğģĥљќқѝηθιήίϊΐიკლმթժիլխ',
    '5': '5jklмнопĵķļľłњңөκλμნოპჟծկհձղ',
    '6': '6mnoрстуåöôøñňņóòơńћўүұνξοόრსტუճմյնշ',
    '7': '7pqrsфхцчßřŕšŝśşșџһπρσςფქღყոչպջռ',
    '8': '8tuvшщъыťțüùûúŭūųůưþτυφύϋΰშჩცძսվտրց',
    '9': '9wxyzьэюяÿýžźżχψωώწჭხჯჰւփքօֆև'
  }, revDict = {}, indexStorage = {},
     whitespaceDigit = '0', defKey = 'alphaindex'

  for(var k in primaryDict) {
    var s = primaryDict[k], l = s.length, i;
    for(i=0;i<l;i++)
      revDict[s[i]] = k
  }

  function normalizeStorage() {
    for(var k in indexStorage)
      indexStorage[k] = Array.from(new Set(indexStorage[k]))
  }

  function strToDigits(str) {
    var i, l = str.length, res = [];
    for(i=0;i<l;i++)
      if(str[i] in revDict) res.push(revDict[str[i]])
    return res.join('')
  }

  function addSimpleString(str, storedData) { //index the data under the string
    var i, k, digiRep = strToDigits(str.toLowerCase()), l = digiRep.length
    for(i=0;i<l+1;i++) {
      k = digiRep.slice(0,i)
      if(!(k in indexStorage)) indexStorage[k] = []
      indexStorage[k].push(storedData)
    }
  }
  
  function searchSimpleString(digits) { //search the data by the digits corresponding to the string
    var result = []
    if(digits in indexStorage)
      result = indexStorage[digits]
    return result
  }

  function intersect(s1, s2) {
    var si = new Set()
    for(var elem of s2)
      if(s1.has(elem))
        si.add(elem)
    return si
  }

  global.AlphaIndex = {
    add: addSimpleString,
    search: searchSimpleString,
    addMulti: function(str, storedData) { //index the string and all whitespace-separated parts
      addSimpleString(str, storedData)
      var parts = str.split(/\s+/), l = parts.length, i
      if(l > 1)
        for(i=0;i<l;i++)
          if(parts[i].length) addSimpleString(parts[i], storedData)
    },
    searchMulti: function(digits) { //search by the whitespace-separated parts of the string
      var res = searchSimpleString(digits), parts = digits.split(whitespaceDigit), l = parts.length, i
      if(l > 1) {
        //operate on sets to avoid duplicate search results
        res = new Set(searchSimpleString(parts[0]))
        for(i=1;i<l;i++)
          res = intersect(res, new Set(searchSimpleString(parts[i])))
        res = Array.from(res) 
      }
      return res
    },
    save: function(key) { //save the index to a permanent DOM storage
      if(!key) key = defKey
      normalizeStorage()
      global.localStorage.setItem(key, JSON.stringify(indexStorage))
    },
    load: function(key) { //load the index from a permanent DOM storage
      if(!key) key = defKey
      if(key in global.localStorage)
        indexStorage = JSON.parse(global.localStorage.getItem(key))
      else indexStorage = {}
    },
    clear: function() { //clear the storage
      indexStorage = {}
    }
  }
})(window);
