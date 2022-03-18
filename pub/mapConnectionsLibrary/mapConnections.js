"use strict";

//Future features
// Change map image
// Change styles easier (popup styles)
// Remove connections, remove points
// throw warnings - e.g. when index out of range
// add multiple connections by providing connection objects
// add multiple markers by providing markers objects
// set width of path
// set size of location icon
// set hitbox size
// legend
// rotate icon along path (airplane faces right way for e.g.)

function MapConnections(divId, width, whiteMap) {
  this.divId = divId
  this.width = width
  this.height = width * 666/1010 //ratio of the world image
  this.map
  this.zoom = 1
  this.verticalShift = 0
  this.horizontalShift = 0
  this.makeMap(divId, width, whiteMap)
}

MapConnections.prototype = {
  makeMap: function(divId, width, whiteMap=false){
    const mapDiv = document.createElement('div')
    mapDiv.className = 'map'
		mapDiv.style = `width: ${width}px;`
    const mapImg = document.createElement('img')
    if(whiteMap){
      mapImg.className = 'map-img map-img-invert'
    } else {
      mapImg.className = 'map-img'
    }
    mapImg.src = "https://map-connections-library.herokuapp.com/mapConnectionsLibrary/world-outline.svg"
    mapDiv.append(mapImg)

    const map = document.getElementById(divId)
		map.append(mapDiv)

    this.map = mapDiv
    this.mapWrap = map
    this.markers = []
    this.connections = []

    //Markers data structure:
    this.blankMarker = {
      markerDiv: undefined,
      title: undefined,
      description: undefined,
      color: undefined,
      location: {top:undefined, left:undefined},
      changeX: undefined,
      changeY: undefined,
    }

    //Connection data structure:
    this.blankConnection = {
      connectionDiv: undefined,
      location: {top: undefined, left: undefined},
      color: undefined,
      length: undefined,
      angle: undefined,
      iconDiv: undefined,
      title: undefined,
      description: undefined,
    }

    const popupDiv = document.createElement('div')
    popupDiv.id = 'map-connection-popup'
    const popupHeader  = document.createElement('h3')
    popupHeader.textContent = ""
    const popupParagraph  = document.createElement('p')
    popupParagraph.textContent = ""
    popupDiv.append(popupHeader)
    popupDiv.append(popupParagraph)
    map.append(popupDiv)
    function mouseMove(event){
      popupDiv.style.top = `${event.pageY + 10}px`
      popupDiv.style.left = `${event.pageX + 10}px`
    }
    addEventListener('mousemove', mouseMove, false);
  },

  setMarkerInfo: function(markerIndex, title, description){
    const markerLabel = this.markers[markerIndex].markerDiv.querySelector(".map-marker-label")
    markerLabel.querySelector("h3").textContent = title
    this.markers[markerIndex].title = title
    markerLabel.querySelector("p").textContent = description
    this.markers[markerIndex].description = description
    markerLabel.style.backgroundColor = ""
  },

  setConnectionInfo: function(connectionIndex, title, description){
    const connectionLabel = this.mapWrap.querySelector("#map-connection-popup")
    connectionLabel.querySelector("h3").textContent = title
    this.connections[connectionIndex].title = title
    connectionLabel.querySelector("p").textContent = description
    this.connections[connectionIndex].description = description
    connectionLabel.style.backgroundColor = ""
  },

  addMarker: function(top, left){
    //Offscreen, do not show
    let error = false
    if(left > this.width || left < 0){
      error = true
      console.warn("The specified 'left' measurement is out of the map")
    }
    if (top > this.height || top < 0){
      error = true
      console.warn("The specified 'top' measurement is out of the map")
    }
    if(error){
      return
    }
    const markerObj = {...this.blankMarker}
    markerObj.location = {...this.blankMarker.location}
    const markerLabel  = document.createElement('div')
    markerLabel.className = 'map-marker-label'
    const markerLabelHeader  = document.createElement('h3')
    markerLabelHeader.textContent = ""
    const markerLabelParagraph  = document.createElement('p')
    markerLabelParagraph.textContent = ""
    markerLabel.style.backgroundColor = "transparent"
    markerLabel.append(markerLabelHeader)
    markerLabel.append(markerLabelParagraph)
    const markerDiv  = document.createElement('div')
    markerDiv.className = 'map-marker'
    markerDiv.style = `top: ${top-10}px; left:${left-10}px;`
    markerObj.location.top = top-10;
    markerObj.location.left = left-10;
    markerDiv.append(markerLabel)
    const markerIcon  = document.createElement('div')
    markerIcon.className = 'map-marker-icon'
    markerDiv.append(markerIcon)
    this.map.append(markerDiv)
    markerObj.markerDiv = markerDiv
    this.markers.push(markerObj)
  },

  addMarkerApproxLongLat: function(longitude, latitude){
    const y = (longitude*-1 + 90)*(this.height/180) + this.height*0.235 + this.verticalShift //accounts for offset
    const x = (latitude+180)*(this.width/360) + this.width*-0.03 + this.horizontalShift //accounts for offset

    this.addMarker(y,x);
  },

  setMarkerColor: function(markerIndex, color){
    this.markers[markerIndex].markerDiv.querySelector(".map-marker-icon").style.backgroundColor = color
    this.markers[markerIndex].color = color
  },

  setConnectionColor: function(connectionIndex, color){
    this.connections[connectionIndex].connectionDiv.style.backgroundColor = color
    this.connections[connectionIndex].color = color
  },

  setConnectionIconColor: function(connectionIndex, color){
    this.connections[connectionIndex].iconDiv.style.backgroundColor = color
    this.connections[connectionIndex].color = color
  },

  setBackgroundColor: function(color){
    this.map.style.backgroundColor = color
  },

  setCropSize: function(width, height){
    this.map.style.maxWidth = `${width}px`
    this.map.style.maxHeight = `${height}px`
  },

  setMapZoom: function(zoom){
    if (this.markers.length > 0){
      console.warn("You should add points after setting zoom level")
    }

    this.zoom = zoom
    this.map.querySelector(".map-img").style.width = `${zoom*this.width}px`
    this.width = zoom*this.width
    this.height= zoom*this.height
  },

  setMapShift: function(x, y){
    this.map.style.textIndent = `${x}px`
    this.horizontalShift = x
    this.map.querySelector(".map-img").style.marginTop = `${y}px`
    this.verticalShift = y
  },

  hideMarkerIndex: function(markerIndex){
    this.markers[markerIndex].markerDiv.querySelector(".map-marker-icon").textContent = ""
  },

  showMarkerIndex: function(markerIndex){
    this.markers[markerIndex].markerDiv.querySelector(".map-marker-icon").textContent = markerIndex
  },

  showAllMarkerIndices: function(){
    for(let i = 0; i<this.markers.length; i++){
      this.showMarkerIndex(i)
    }
  },

  hideAllMarkerIndices: function(){
    for(let i = 0; i<this.markers.length; i++){
      this.hideMarkerIndex(i)
    }
  },

  hideConnectionIndex: function(connectionIndex){
    this.connections[connectionIndex].connectionDiv.textContent = ""
  },

  showConnectionIndex: function(connectionIndex){
    this.connections[connectionIndex].connectionDiv.textContent = connectionIndex
  },

  showAllConnectionIndices: function(){
    for(let i = 0; i<this.connections.length; i++){
      this.showConnectionIndex(i)
    }
  },

  hideAllConnectionIndices: function(){
    for(let i = 0; i<this.connections.length; i++){
      this.hideConnectionIndex(i)
    }
  },

  addConnection: function(markerIndexStart, markerIndexEnd, animation=true, iconId=undefined, animationDuration=2500){
    const start = this.markers[markerIndexStart].location
    const end = this.markers[markerIndexEnd].location
    const changeX = -start.left - -end.left
    const changeY = start.top - end.top
    const length = Math.sqrt(Math.pow(changeX, 2) + Math.pow(changeY, 2))
    const connectionLine  = document.createElement('div')
    connectionLine.className = 'map-connection'
    const connectionLineWrap  = document.createElement('div')
    connectionLineWrap.className = 'map-connection-wrap'
    connectionLineWrap.append(connectionLine)
    connectionLineWrap.style = `top: ${start.top-1}px; left:${start.left+10}px;`
    connectionLine.style = `width: ${length}px;`

    const angle = -Math.atan2(changeY, changeX) * 180/Math.PI
    connectionLineWrap.style.transform=`rotate(${angle}deg)`

    this.map.append(connectionLineWrap)

    const connectionObj = {...this.blankConnection}
    connectionObj.connectionDiv = connectionLine
    connectionObj.length = length
    connectionObj.angle = angle
    connectionObj.changeX = changeX
    connectionObj.changeY = changeY
    connectionObj.location = start

    this.connections.push(connectionObj)

    const currentIndex = this.connections.length-1
    connectionLineWrap.onmouseover = ()=>{this.showConnectionInfo(currentIndex)}
    connectionLineWrap.onmouseout = ()=>{this.hideConnectionInfo()}

    if(animation)
      this.createAnimation(this.connections.length-1, iconId, animationDuration)
  },

  createAnimation(connectionIndex, iconId=undefined, animationDuration=2500){
    const changeX = this.connections[connectionIndex].changeX
    const changeY = this.connections[connectionIndex].changeY

    const start = this.connections[connectionIndex].location
    
    let icon;
    let iconOffsetHeight = 0
    let iconOffsetWidth = 0
    if(iconId){
      icon = document.getElementById(iconId)
      icon.className = 'map-connection-icon'
      iconOffsetHeight = icon.offsetHeight/4
      iconOffsetWidth = icon.offsetWidth/4
      icon.style.top = start.top + "px"
      icon.style.left = start.left + "px"
      icon.style.marginTop = -iconOffsetHeight + 2.5 + "px"
      icon.style.marginLeft = -iconOffsetWidth + 2.5 + "px"
    } else {
      icon = document.createElement('div')
      icon.className = 'map-moving-icon'
      icon.style.top = start.top + "px"
      icon.style.left = start.left + "px"
      icon.style.marginTop = -iconOffsetHeight + 2.5 + "px"
      icon.style.marginLeft = -iconOffsetWidth + 2.5 + "px"
    } 
    
    icon.animate([
      { transform: `translate(${changeX}px, ${-changeY}px)`, offset: 0.7, },
      { transform: `translate(${changeX}px, ${-changeY}px) scale(0)`, offset: 0.8 },
      { transform: 'scale(0)', offset: 0.9,},
      { transform: 'scale(1)'}
    ], {
      duration: animationDuration,
      iterations: Infinity,
      easing: "ease-in-out",
    })
    icon.style.transition = `transform ${animationDuration}ms`;
    
    this.connections[connectionIndex].iconDiv = icon    
    this.map.append(icon)
  },

  stopAnimation: function(connectionIndex){
    this.connections[connectionIndex].iconDiv.style.visibility = "hidden"
  },

  startAnimation: function(connectionIndex){
    this.connections[connectionIndex].iconDiv.style.visibility = "visible"
  },

  showConnectionInfo: function(connectionIndex){
    const connectionLabel = this.mapWrap.querySelector("#map-connection-popup")
    connectionLabel.querySelector("h3").textContent = this.connections[connectionIndex].title
    connectionLabel.querySelector("p").textContent = this.connections[connectionIndex].description
    if(this.connections[connectionIndex].title!==undefined || this.connections[connectionIndex].description!==undefined){
      connectionLabel.style.opacity=1
    }
  },

  hideConnectionInfo: function(){
    this.mapWrap.querySelector("#map-connection-popup").style.opacity=0
  },

}