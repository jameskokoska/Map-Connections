"use strict";

//Create a new 800px wide map, with a white contour
const mapExample = new MapConnections({
  divId: 'map-example',
  width: 800,
  whiteMap: true
})
//Set the crop and zoom level to fit the locations
mapExample.setCropSize({
  width: 700,
  height: 600
})
mapExample.setMapShift({
  x: -200,
  y: -600
})
mapExample.setMapZoom({
  zoom: 3
})
mapExample.setBackgroundColor({
  color: "#0C2E05"
})
//Add the warehouse marker
mapExample.addMarker({
  top: 100,
  left: 160
})
mapExample.setMarkerInfo({
  markerIndex: 0,
  title: "Warehouse",
  description: "Your package came from here!"
})
mapExample.setMarkerColor({
  markerIndex: 0,
  color: "#696E68"
})
//Add the current location marker using longitude and latitude
mapExample.addMarkerApproxLongLat({
  longitude: 43.6532,
  latitude: -79.3832
})
mapExample.setMarkerInfo({
  markerIndex: 1,
  title: "Toronto",
  description: "This marker was put at 43.6532° N, 79.3832° W"
})
mapExample.setMarkerColor({
  markerIndex: 1,
  color: "#7FE96A"
})
//Add the destination marker
mapExample.addMarker({
  top: 500,
  left: 260
})
mapExample.setMarkerInfo({
  markerIndex: 2,
  title: "Your House",
  description: "Your delivery address."
})
mapExample.setMarkerColor({
  markerIndex: 2,
  color: "#DB5567"
})
//Add the connection from warehouse marker to current location marker
mapExample.addConnection({
  markerIndexStart: 0,
  markerIndexEnd: 1,
  animation: true,
  iconId: "",
  animationDuration: 10000
})
mapExample.setConnectionInfo({
  connectionIndex: 0,
  title: "Already completed",
  description: "Your package arrived from the warehouse already!"
})
mapExample.setConnectionColor({
  connectionIndex: 0,
  color: "#58584C"
})
mapExample.setConnectionIconColor({
  connectionIndex: 0,
  color: "#898A64"
})
//Add the connection from current location marker to destination marker
mapExample.addConnection({
  markerIndexStart: 1,
  markerIndexEnd: 2,
  iconId: "package-icon",
  animationDuration: 5000,
  title: "Package",
  description: "Your package is on the way from Toronto!",
  color: "#DADD26"
})
//Show the legend below the map
mapExample.showLegend()

//Create a new 1000px wide map
const mapExampleTravel = new MapConnections({
  divId: 'map-example-travel',
  width: 1000,
  whiteMap: true,
  mapType: "filled",
  imgFilter: "invert(100%) sepia(20%) saturate(7461%) hue-rotate(47deg) brightness(110%) contrast(96%)"
})
//Set the crop and zoom level to fit the locations
mapExampleTravel.setCropSize({
  width: 1000,
  height: 600
})
mapExampleTravel.setMapShift({
  x: -250,
  y: -500
})
mapExampleTravel.setMapZoom({
  zoom: 2
})
mapExampleTravel.setBackgroundColor({
  color: "#4ac0ff"
})
//Add the first marker
mapExampleTravel.addMarker({
  top: 450,
  left: 360
})
mapExampleTravel.setMarkerInfo({
  markerIndex: 0,
  title: "Start",
  description: "Your journey starts here!"
})
mapExampleTravel.setMarkerColor({
  markerIndex: 0,
  color: "#4AAC37"
})
//Add the second marker
mapExampleTravel.addMarkerApproxLongLat({
  longitude: 35.6532,
  latitude: 20.3832
})
mapExampleTravel.setMarkerInfo({
  markerIndex: 1,
  description: "Time to get on the cruise!"
})
mapExampleTravel.setMarkerColor({
  markerIndex: 1,
  color: "#E1E96A"
})
//Add the third marker
mapExampleTravel.addMarker({
  top: 200,
  left: 260
})
mapExampleTravel.setMarkerInfo({
  markerIndex: 2,
  title: "Pit Stop!",
  description: "Time to get in the car!"
})
mapExampleTravel.setMarkerColor({
  markerIndex: 2,
  color: "#E1E96A"
})
//Add the destination marker
mapExampleTravel.addMarker({
  top: 150,
  left: 160
})
mapExampleTravel.setMarkerInfo({
  markerIndex: 3,
  title: "End"
})
mapExampleTravel.setMarkerColor({
  markerIndex: 3,
  color: "#DB5567"
})
//Add the connections
mapExampleTravel.addConnection({
  markerIndexStart: 0,
  markerIndexEnd: 1,
  animation: true,
  iconId: "airplane-icon",
  animationDuration: 10000,
  rotateIcon: true, //Rotate the plane icon to face along the path
  width: 8
})
mapExampleTravel.setConnectionColor({
  connectionIndex: 0,
  color: "#FFFFFFA1"
})
mapExampleTravel.setConnectionInfo({
  connectionIndex: 0,
  title: "Plane travel",
  description: "This flight will be quick!"
})

mapExampleTravel.addConnection({
  markerIndexStart: 1,
  markerIndexEnd: 2,
  animation: true,
  iconId: "cruise-icon",
  animationDuration: 30000,
  width: 2
})
mapExampleTravel.setConnectionColor({
  connectionIndex: 1,
  color: "#4F5FB6D2"
})
mapExampleTravel.setConnectionInfo({
  connectionIndex: 1,
  title: "Cruise",
  description: "Enjoy the sights, this will take a while"
})

mapExampleTravel.addConnection({
  markerIndexStart: 2,
  markerIndexEnd: 3,
  animation: true,
  iconId: "car-icon",
  animationDuration: 35000
})
mapExampleTravel.setConnectionColor({
  connectionIndex: 2,
  color: "#EBC677C0"
})
mapExampleTravel.setConnectionInfo({
  connectionIndex: 2,
  title: "Car",
  description: "The final stretch!"
})