"use strict";

function MapConnections(args) {
  // divId, width, whiteMap=false, mapType='outline', imgFilter=""
  this.divId = args.divId
  this.width = args.width
  this.height = args.width * 666/1010 //ratio of the world image
  this.map
  this.zoom = 1
  this.verticalShift = 0
  this.horizontalShift = 0
  this.makeMap(args)
}

MapConnections.prototype = {
  // mapType: outline, outlineFilled, filled
  makeMap: function(args){
    // divId, width, whiteMap=false, mapType='outline', imgFilter
    const mapDiv = document.createElement('div')
    mapDiv.className = 'map'
		mapDiv.style = `width: ${args.width}px;`
    const mapImg = document.createElement('img')
    if(args.whiteMap==true){
      mapImg.className = 'map-img map-img-invert'
    } else {
      mapImg.className = 'map-img'
    }
    
    if(args.mapType==='outline'){
      mapImg.src = "https://map-connections-library.herokuapp.com/mapConnectionsLibrary/world-outline.svg"
    } else if (args.mapType==='outlineFilled') {
      mapImg.src = "https://map-connections-library.herokuapp.com/mapConnectionsLibrary/world-filled-outline.svg"
    } else if (args.mapType==='filled'){
      mapImg.src = "https://map-connections-library.herokuapp.com/mapConnectionsLibrary/world-filled.svg"
    } else {
      mapImg.src = "https://map-connections-library.herokuapp.com/mapConnectionsLibrary/world-outline.svg"
    }

    if(args.imgFilter){
      mapImg.style.filter = args.imgFilter
    }

    mapDiv.append(mapImg)

    const map = document.getElementById(args.divId)
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
      changeX: undefined,
      changeY: undefined,
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
    popupDiv.style.display="none"
    addEventListener('mousemove', mouseMove, false);
  },

  setMarkerInfo: function(args){
    // markerIndex, title, description
    const markerIndex = args.markerIndex
    const title = args.title;
    const description = args.description
    const markerLabel = this.markers[markerIndex].markerDiv.querySelector(".map-marker-label")
    markerLabel.querySelector("h3").textContent = title
    this.markers[markerIndex].title = title
    markerLabel.querySelector("p").textContent = description
    this.markers[markerIndex].description = description
    markerLabel.style.backgroundColor = ""
  },

  setConnectionInfo: function(args){
    const connectionIndex = args.connectionIndex
    const title = args.title
    const description = args.description
    const connectionLabel = this.mapWrap.querySelector("#map-connection-popup")
    connectionLabel.querySelector("h3").textContent = title
    this.connections[connectionIndex].title = title
    connectionLabel.querySelector("p").textContent = description
    this.connections[connectionIndex].description = description
    connectionLabel.style.backgroundColor = ""
  },

  addMarker: function(args){
    // top, left (also optional: title, description, color)
    const top = args.top
    const left = args.left
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

    if(args.color){
      this.setMarkerColor({markerIndex:this.markers.length-1, color:args.color})
    }
    if(args.title || args.description){
      this.setMarkerInfo({markerIndex:this.markers.length-1, title:args.title, description:args.description})
    }
  },

  addMarkerApproxLongLat: function(args){
    // longitude, latitude
    const longitude = args.longitude
    const latitude = args.latitude
    const y = (longitude*-1 + 90)*(this.height/180) + this.height*0.235 + this.verticalShift //accounts for offset
    const x = (latitude+180)*(this.width/360) + this.width*-0.03 + this.horizontalShift //accounts for offset

    this.addMarker({top:y, left:x, ...args});
  },

  setMarkerColor: function(args){
    // markerIndex, color
    const markerIndex = args.markerIndex
    const color= args.color
    this.markers[markerIndex].markerDiv.querySelector(".map-marker-icon").style.backgroundColor = color
    this.markers[markerIndex].color = color
  },

  setConnectionColor: function(args){
    const connectionIndex = args.connectionIndex
    const color= args.color
    this.connections[connectionIndex].connectionDiv.style.backgroundColor = color
    this.connections[connectionIndex].color = color
  },

  setConnectionIconColor: function(args){
    const connectionIndex = args.connectionIndex
    const color= args.color
    this.connections[connectionIndex].iconDiv.style.backgroundColor = color
    this.connections[connectionIndex].color = color
  },

  setBackgroundColor: function(args){
    // color
    const color = args.color
    this.map.style.backgroundColor = color
  },

  setCropSize: function(args){
    // width, height
    const width = args.width
    const height = args.height
    this.map.style.maxWidth = `${width}px`
    this.map.style.maxHeight = `${height}px`
  },

  setMapZoom: function(args){
    // zoom
    const zoom = args.zoom
    if (this.markers.length > 0){
      console.warn("You should add points after setting zoom level")
    }

    this.zoom = zoom
    this.map.querySelector(".map-img").style.width = `${zoom*this.width}px`
    this.width = zoom*this.width
    this.height= zoom*this.height
  },

  setMapShift: function(args){
    // x, y
    const x = args.x
    const y = args.y
    this.map.style.textIndent = `${x}px`
    this.horizontalShift = x
    this.map.querySelector(".map-img").style.marginTop = `${y}px`
    this.verticalShift = y
  },

  hideMarkerIndex: function(args){
    // markerIndex
    const markerIndex = args.markerIndex
    this.markers[markerIndex].markerDiv.querySelector(".map-marker-icon").textContent = ""
  },

  showMarkerIndex: function(args){
    // markerIndex
    const markerIndex = args.markerIndex
    this.markers[markerIndex].markerDiv.querySelector(".map-marker-icon").textContent = markerIndex
  },

  showAllMarkerIndices: function(){
    for(let i = 0; i<this.markers.length; i++){
      this.showMarkerIndex({markerIndex:i})
    }
  },

  hideAllMarkerIndices: function(){
    for(let i = 0; i<this.markers.length; i++){
      this.hideMarkerIndex({markerIndex:i})
    }
  },

  hideConnectionIndex: function(args){
    // connectionIndex
    const connectionIndex = args.connectionIndex
    this.connections[connectionIndex].connectionDiv.textContent = ""
  },

  showConnectionIndex: function(args){
    // connectionIndex
    const connectionIndex = args.connectionIndex
    this.connections[connectionIndex].connectionDiv.textContent = connectionIndex
  },

  showAllConnectionIndices: function(){
    for(let i = 0; i<this.connections.length; i++){
      this.showConnectionIndex({connectionIndex:i})
    }
  },

  hideAllConnectionIndices: function(){
    for(let i = 0; i<this.connections.length; i++){
      this.hideConnectionIndex({connectionIndex:i})
    }
  },

  addConnection: function(args){
    // markerIndexStart, markerIndexEnd, animation=true, iconId=undefined, animationDuration=2500, rotateIcon=false, width=5
    // (also optional: color, title, description)
    const markerIndexStart = args.markerIndexStart
    const markerIndexEnd = args.markerIndexEnd
    const animation = args.animation===undefined ? true : args.animation
    const iconId = args.iconId
    const animationDuration = args.animationDuration===undefined ? 2500 : args.animationDuration
    const rotateIcon = args.rotateIcon===undefined ? false : args.rotateIcon
    const width = args.width===undefined ? 5 : args.width
    
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
    connectionLine.style = `width: ${length}px; height:${width}px`

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
    connectionLineWrap.onmouseover = ()=>{this.showConnectionInfo({connectionIndex:currentIndex})}
    connectionLineWrap.onmouseout = ()=>{this.hideConnectionInfo()}

    if(animation){
      this.createAnimation({connectionIndex:this.connections.length-1, iconId:iconId, animationDuration:animationDuration, rotateIcon:rotateIcon})
    }
    if(args.color){
      this.setConnectionColor({connectionIndex:this.connections.length-1, color:args.color})
    }
    if(args.iconColor){
      this.setConnectionIconColor({connectionIndex:this.connections.length-1, color:args.iconColor})
    }
    if(args.title || args.description){
      this.setConnectionInfo({connectionIndex:this.connections.length-1, title:args.title, description:args.description})
    }
  },

  createAnimation(args){
    // connectionIndex, iconId=undefined, animationDuration=2500, rotateIcon=false
    const connectionIndex = args.connectionIndex
    const iconId = args.iconId
    const animationDuration = args.animationDuration === undefined ? 2500 : args.animationDuration
    const rotateIcon = args.rotateIcon === undefined ? false : args.rotateIcon

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

    let rotateText = ""
    if(rotateIcon){
      rotateText = `rotate(${this.connections[connectionIndex].angle}deg)`
    }
    
    icon.animate([
      { transform: `scale(1) ${rotateText}`},
      { transform: `translate(${changeX}px, ${-changeY}px) ${rotateText}`, offset: 0.7,},
      { transform: `translate(${changeX}px, ${-changeY}px) ${rotateText} scale(0)`, offset: 0.8 },
      { transform: `scale(0) ${rotateText}`, offset: 0.9,},
      { transform: `scale(1) ${rotateText}`}
    ], {
      duration: animationDuration,
      iterations: Infinity,
      easing: "ease-in-out",
    })
    icon.style.transition = `transform ${animationDuration}ms`;
    
    this.connections[connectionIndex].iconDiv = icon    
    this.map.append(icon)
  },

  stopAnimation: function(args){
    // connectionIndex
    const connectionIndex = args.connectionIndex
    this.connections[connectionIndex].iconDiv.style.visibility = "hidden"
  },

  startAnimation: function(args){
    // connectionIndex
    const connectionIndex = args.connectionIndex
    this.connections[connectionIndex].iconDiv.style.visibility = "visible"
  },

  showConnectionInfo: function(args){
    // connectionIndex
    const connectionIndex = args.connectionIndex
    const connectionLabel = this.mapWrap.querySelector("#map-connection-popup")
    connectionLabel.querySelector("h3").textContent = this.connections[connectionIndex].title
    connectionLabel.querySelector("p").textContent = this.connections[connectionIndex].description
    if(this.connections[connectionIndex].title!==undefined || this.connections[connectionIndex].description!==undefined){
      connectionLabel.style.opacity=1
      this.mapWrap.querySelector("#map-connection-popup").style.display="unset"
      clearInterval(this.hideTimer)
    }
  },

  hideConnectionInfo: function(){
    this.mapWrap.querySelector("#map-connection-popup").style.opacity=0
    this.hideTimer = setTimeout(()=>{
      this.mapWrap.querySelector("#map-connection-popup").style.display="none"
    },1000)
  },

  showLegend: function(){
    const legend  = document.createElement('div')
    legend.className = 'legend-box'
    const legendHeader  = document.createElement('h2')
    legendHeader.className = 'legend-header'
    legendHeader.textContent = 'Legend'
    legend.append(legendHeader)


    const legendBoxDetails  = document.createElement('div')
    legendBoxDetails.className = 'legend-box-details'

    const legendBoxDetailsMarker  = document.createElement('div')
    legendBoxDetailsMarker.className = 'legend-box-details-marker'
    const legendHeaderMarker  = document.createElement('h3')
    legendHeaderMarker.textContent = 'Markers'
    legendBoxDetailsMarker.append(legendHeaderMarker)
    for(let marker of this.markers){
      const legendEntry = document.createElement('div')
      legendEntry.className = "legend-entry"

      const legendMarkerMarker  = document.createElement('div')
      legendMarkerMarker.className = "map-marker-icon-legend"
      legendMarkerMarker.style.backgroundColor = marker.color
      legendEntry.append(legendMarkerMarker)
      const legendMarkerLabel  = document.createElement('p')
      legendMarkerLabel.textContent = marker.title===undefined ? "Untitled" : marker.title
      legendEntry.append(legendMarkerLabel)

      legendBoxDetailsMarker.append(legendEntry)
    }
    legendBoxDetails.append(legendBoxDetailsMarker)

    const legendBoxDetailsConnection  = document.createElement('div')
    legendBoxDetailsConnection.className = 'legend-box-details-marker'
    const legendHeaderConnection  = document.createElement('h3')
    legendHeaderConnection.textContent = 'Connections'
    legendBoxDetailsConnection.append(legendHeaderConnection)
    for(let connection of this.connections){
      const legendEntry = document.createElement('div')
      legendEntry.className = "legend-entry"

      const legendConnectionConnection  = document.createElement('div')
      legendConnectionConnection.className = "map-connection-legend"
      legendConnectionConnection.style.backgroundColor = connection.color
      legendEntry.append(legendConnectionConnection)
      const legendConnectionLabel  = document.createElement('p')
      legendConnectionLabel.textContent = connection.title===undefined ? "Untitled" : connection.title
      legendEntry.append(legendConnectionLabel)

      legendBoxDetailsConnection.append(legendEntry)
    }
    legendBoxDetails.append(legendBoxDetailsConnection)

    legend.append(legendBoxDetails)
    
    this.mapWrap.append(legend)
  }

}