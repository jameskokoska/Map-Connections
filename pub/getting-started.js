"use strict";

const map = new MapConnections({ divId:'map-div', width:400 })
map.addMarker({ top:200, left:100, title:"Marker Title", description:"Some description here." })
map.addMarkerApproxLongLat({ longitude:27, latitude:108 })
map.addConnection({ markerIndexStart:0, markerIndexEnd:1, animationDuration:5000, iconColor:'red',title:"Connection Title", description:"Some description here." })