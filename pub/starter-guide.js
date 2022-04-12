"use strict";

const mapGettingStarted = new MapConnections({divId:'map-getting-started',width:400})
const mapGettingStarted2 = new MapConnections({divId:'map-getting-started2',width:400})
mapGettingStarted2.addMarker({top:200,left:100})
mapGettingStarted2.addMarkerApproxLongLat({longitude:27,latitude:108})
mapGettingStarted2.addConnection({markerIndexStart:0,markerIndexEnd:1})

const mapGettingStarted3 = new MapConnections({divId:'map-getting-started3',width:400})
mapGettingStarted3.addMarker({top:200,left:100})
mapGettingStarted3.addMarkerApproxLongLat({longitude:27,latitude:108})
mapGettingStarted3.addConnection({markerIndexStart:0,markerIndexEnd:1})
mapGettingStarted3.showAllConnectionIndices()
mapGettingStarted3.showAllMarkerIndices()
mapGettingStarted3.hideMarkerIndex({markerIndex:0})

const toggleMarkerIndicesButton = document.getElementById('toggle-marker-indices');
function toggleMarkerIndices() {
  if(toggleMarkerIndicesButton.textContent==="Show All Marker Indices"){
    mapGettingStarted3.showAllMarkerIndices()
    toggleMarkerIndicesButton.textContent = "Hide All Marker Indices"
  } else {
    mapGettingStarted3.hideAllMarkerIndices()
    toggleMarkerIndicesButton.textContent = "Show All Marker Indices"
  }
}

const toggleConnectionIndicesButton = document.getElementById('toggle-connection-indices');
function toggleConnectionIndices() {
  if(toggleConnectionIndicesButton.textContent==="Show All Connection Indices"){
    mapGettingStarted3.showAllConnectionIndices()
    toggleConnectionIndicesButton.textContent = "Hide All Connection Indices"
  } else {
    mapGettingStarted3.hideAllConnectionIndices()
    toggleConnectionIndicesButton.textContent = "Show All Connection Indices"
  }
}

const mapGettingStarted4 = new MapConnections({divId:'map-getting-started4',width:400})
mapGettingStarted4.addMarker({top:200,left:100})
mapGettingStarted4.addMarkerApproxLongLat({longitude:27,latitude:108})
mapGettingStarted4.addConnection({markerIndexStart:0,markerIndexEnd:1})
mapGettingStarted4.showAllConnectionIndices()
mapGettingStarted4.showAllMarkerIndices()
mapGettingStarted4.hideMarkerIndex({markerIndex:0})
// mapGettingStarted4.stopAnimation({connectionIndex:0})

const toggleAnimationButton = document.getElementById('toggle-animation');
function toggleAnimation() {
  if(toggleAnimationButton.textContent==="Start Animation"){
    mapGettingStarted4.startAnimation({connectionIndex:0})
    toggleAnimationButton.textContent = "Stop Animation"
  } else {
    mapGettingStarted4.stopAnimation({connectionIndex:0})
    toggleAnimationButton.textContent = "Start Animation"
  }
}

const mapGettingStarted5 = new MapConnections({divId:'map-getting-started5',width:400})
mapGettingStarted5.addMarker({top:200,left:100})
mapGettingStarted5.addMarkerApproxLongLat({longitude:27,latitude:108})
mapGettingStarted5.addConnection({markerIndexStart:0,markerIndexEnd:1})
mapGettingStarted5.showAllConnectionIndices()
mapGettingStarted5.showAllMarkerIndices()
mapGettingStarted5.hideMarkerIndex({markerIndex:0})
mapGettingStarted5.setConnectionInfo({connectionIndex:0,title:"Connection Title",description:"Some description here."})
mapGettingStarted5.setMarkerInfo({markerIndex:0,title:"Marker Title",description:"Some description here."})

const mapGettingStarted6 = new MapConnections({divId:'map-getting-started6',width:400})
mapGettingStarted6.addMarker({top:200,left:100})
mapGettingStarted6.addMarkerApproxLongLat({longitude:27,latitude:108})
mapGettingStarted6.addConnection({markerIndexStart:0,markerIndexEnd:1})
mapGettingStarted6.showAllConnectionIndices()
mapGettingStarted6.showAllMarkerIndices()
mapGettingStarted6.hideMarkerIndex({markerIndex:0})
mapGettingStarted6.setConnectionInfo({connectionIndex:0,title:"Connection Title",description:"Some description here."})
mapGettingStarted6.setMarkerInfo({markerIndex:0,title:"Marker Title",description:"Some description here."})

function toggleBackgroundColor(){
  mapGettingStarted6.setBackgroundColor({color:"#779ED1"})
  setTimeout(()=>{
    mapGettingStarted6.setBackgroundColor({color:"#94bd9f"})
  }, 2000)
}

function toggleMarkerColor(){
  mapGettingStarted6.setMarkerColor({markerIndex: 0, color:"#2F38A8"})
  mapGettingStarted6.setMarkerColor({markerIndex: 1, color:"#2F38A8"})
  setTimeout(()=>{
    mapGettingStarted6.setMarkerColor({markerIndex: 0, color:"white"})
    mapGettingStarted6.setMarkerColor({markerIndex: 1, color:"white"})
  }, 2000)
}

function toggleConnectionColor(){
  mapGettingStarted6.setConnectionColor({connectionIndex: 0, color:"#2F38A8"})
  setTimeout(()=>{
    mapGettingStarted6.setConnectionColor({connectionIndex: 0, color:"white"})
  }, 2000)
}

function toggleConnectionIconColor(){
  mapGettingStarted6.setConnectionIconColor({connectionIndex: 0, color:"#2F38A8"})
  setTimeout(()=>{
    mapGettingStarted6.setConnectionIconColor({connectionIndex: 0, color:"white"})
  }, 2000)
}

const mapGettingStarted7 = new MapConnections({divId:'map-getting-started7',width:400})
mapGettingStarted7.addMarker({top:200,left:100})
mapGettingStarted7.addMarkerApproxLongLat({longitude:27,latitude:108})
mapGettingStarted7.addConnection({markerIndexStart:0,markerIndexEnd:1,iconId:"package-icon-example",animationDuration:5000, rotateIcon: true})
mapGettingStarted7.showAllConnectionIndices()
mapGettingStarted7.showAllMarkerIndices()
mapGettingStarted7.hideMarkerIndex({markerIndex:0})
mapGettingStarted7.setConnectionInfo({connectionIndex:0,title:"Connection Title",description:"Some description here."})
mapGettingStarted7.setMarkerInfo({markerIndex:0,title:"Marker Title",description:"Some description here."})

const mapGettingStarted8 = new MapConnections({divId:'map-getting-started8',width:400})
mapGettingStarted8.addMarker({top:200,left:100})
mapGettingStarted8.addMarkerApproxLongLat({longitude:27,latitude:108})
mapGettingStarted8.addConnection({markerIndexStart:0,markerIndexEnd:1, animationDuration:5000, iconColor:'red'})
mapGettingStarted8.showAllConnectionIndices()
mapGettingStarted8.showAllMarkerIndices()
mapGettingStarted8.hideMarkerIndex({markerIndex:0})
mapGettingStarted8.setConnectionInfo({connectionIndex:0,title:"Connection Title",description:"Some description here."})
mapGettingStarted8.setMarkerInfo({markerIndex:0,title:"Marker Title",description:"Some description here."})
mapGettingStarted8.setMarkerInfo({markerIndex:1, title:"Marker 2"})
mapGettingStarted8.setMarkerColor({markerIndex: 0, color:"#2E326E"})
mapGettingStarted8.setMarkerColor({markerIndex: 1, color:"#9B53EE"})
mapGettingStarted8.setConnectionColor({connectionIndex: 0, color:"#FF2424"})
mapGettingStarted8.showLegend()