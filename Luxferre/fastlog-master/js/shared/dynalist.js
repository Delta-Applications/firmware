//DynaList - a library for dynamic list rendering in the UI
//Created by Luxferre, BananaHackers group
//Released into public domain

function DynaList(listElem) {
  var list = this
  list.listElem = listElem
  list.nodeTag = 'div'
  list.activeClass = 'active'
  list.hiddenClass = 'hidden'
  list.maxElemsToRender = 5

  list.clear = function() {
    list.listElem.innerHTML = ''
    list.listLength = 0
    list.activeId = 0
    list.idFilter = null
    list.nodeCache = []
    list.listElem.dataset.listLength = 0
  }

  list.render = function(items, useHTML) {
    var i, l = items.length
    list.listLength = l
    list.listElem.dataset.listLength = l
    list.listElem.innerHTML = ''
    list.nodeCache = []
    for(i=0;i<l;i++) {
      var el = document.createElement(list.nodeTag)
      el.dataset.listId = i
      if(useHTML)
        el.innerHTML = items[i]
      else
        el.textContent = items[i]
      list.nodeCache.push(el)
    } 
  }

  list.update = function() {
    var i, id, renderedActiveIndex = 0, listNodes = list.nodeCache, visibleNodeList = [], l = listNodes.length
    for(i=0;i<l;i++) {
      id = listNodes[i].dataset.listId|0
      listNodes[i].classList.remove(list.activeClass)
      listNodes[i].classList.remove(list.hiddenClass)
      if(list.idFilter !== null && (list.idFilter.indexOf(id) === -1)) {
        listNodes[i].classList.add(list.hiddenClass)
      } else {
        visibleNodeList.push(listNodes[i])
        if(id == list.activeId) {
          listNodes[i].classList.add(list.activeClass)
          renderedActiveIndex = visibleNodeList.length - 1
        }
      }
    }
    //render only required and visible nodes
    l = visibleNodeList.length
    var minThreshold = renderedActiveIndex - list.maxElemsToRender + 1,
        maxThreshold = renderedActiveIndex + list.maxElemsToRender
    if(minThreshold < 0) minThreshold = 0
    if(maxThreshold >= l) maxThreshold = l
    list.listElem.innerHTML = ''
    for(i=minThreshold;i<maxThreshold;i++)
      list.listElem.appendChild(visibleNodeList[i])
    if(visibleNodeList[renderedActiveIndex])
      visibleNodeList[renderedActiveIndex].scrollIntoView({block: 'start'})
  }

  list.filter = function(filterIds) { //pass null to cancel filtering
    list.idFilter = filterIds
    if(list.idFilter && list.idFilter.length) {
      while(list.idFilter.indexOf(list.activeId) === -1) {
        list.activeId++
        if(list.activeId === list.listLength)
          list.activeId = 0
      }
    }
    list.update()
  }

  list.hasDisplayableItems = function() {
    return list.idFilter === null || (list.idFilter !== null && list.idFilter.length > 0)
  }

  list.forward = function() {
    do {
      list.activeId++
      if(list.activeId === list.listLength)
        list.activeId = 0
    } while(list.idFilter && list.idFilter.length && list.idFilter.indexOf(list.activeId) === -1)
    list.update()
  }

  list.back = function() {
    do {
      list.activeId--
      if(list.activeId < 0)
        list.activeId = list.listLength - 1
    } while(list.idFilter && list.idFilter.length && list.idFilter.indexOf(list.activeId) === -1)
    list.update()
  }

  list.getActiveId = function() {
    return list.activeId
  }

  list.clear()
}
