/* JS Library usage examples */
"use strict";
function getRandomColor(){
  const colors = ["#8BA1CC","#87A3DD","#A6D9F1","#94C7CE","#AE9DE7","#D58EE7","#C3D9EE"]
  return colors[Math.floor(Math.random()*colors.length)]
}

const numberPoints = 8

const landingMap = new MapConnections('map-landing',800,true)
landingMap.addMarkerApproxLongLat(40,-79)
landingMap.addMarkerApproxLongLat(-47,-98)
landingMap.addMarkerApproxLongLat(75,51.268)
landingMap.addMarker(350,460)
landingMap.addMarker(100,360)
landingMap.addMarker(300,660)
landingMap.addMarker(100,160)
landingMap.addMarker(450,700)
landingMap.setBackgroundColor("#212B47")

let connectionsMade = []
for(let p = 0; p<10; p++){
  let connectionPoint = {
    startPoint: Math.floor(Math.random()*numberPoints),
    endPoint: Math.floor(Math.random()*numberPoints)
  }
  let alreadyMade = false
  for(let connection of connectionsMade){
    if(connectionPoint.startPoint === connection.startPoint && connectionPoint.endPoint === connection.endPoint){
      alreadyMade = true
      break
    }
  }
  if(connectionPoint.startPoint !== connectionPoint.endPoint && alreadyMade === false){
    landingMap.addConnection(connectionPoint.endPoint,connectionPoint.startPoint,true,"", Math.random()*5000 + 3000)
    landingMap.setConnectionColor(connectionsMade.length,getRandomColor())
    landingMap.setConnectionIconColor(connectionsMade.length,getRandomColor())
    connectionsMade.push(connectionPoint)
  }
}

for(let p = 0; p<landingMap.markers.length; p++){
  landingMap.setMarkerColor(p,getRandomColor())
}

const mapGettingStarted = new MapConnections('map-getting-started',400)
const mapGettingStarted2 = new MapConnections('map-getting-started2',400)
mapGettingStarted2.addMarker(200,100)
mapGettingStarted2.addMarkerApproxLongLat(27,108)
mapGettingStarted2.addConnection(0,1)

const mapGettingStarted3 = new MapConnections('map-getting-started3',400)
mapGettingStarted3.addMarker(200,100)
mapGettingStarted3.addMarkerApproxLongLat(27,108)
mapGettingStarted3.addConnection(0,1)
mapGettingStarted3.showAllConnectionIndices()
mapGettingStarted3.showAllMarkerIndices()
mapGettingStarted3.hideMarkerIndex(0)

const mapGettingStarted4 = new MapConnections('map-getting-started4',400)
mapGettingStarted4.addMarker(200,100)
mapGettingStarted4.addMarkerApproxLongLat(27,108)
mapGettingStarted4.addConnection(0,1)
mapGettingStarted4.showAllConnectionIndices()
mapGettingStarted4.showAllMarkerIndices()
mapGettingStarted4.hideMarkerIndex(0)
mapGettingStarted4.stopAnimation(0)

const mapGettingStarted5 = new MapConnections('map-getting-started5',400)
mapGettingStarted5.addMarker(200,100)
mapGettingStarted5.addMarkerApproxLongLat(27,108)
mapGettingStarted5.addConnection(0,1)
mapGettingStarted5.showAllConnectionIndices()
mapGettingStarted5.showAllMarkerIndices()
mapGettingStarted5.hideMarkerIndex(0)
mapGettingStarted5.stopAnimation(0)
mapGettingStarted5.setConnectionInfo(0,"Connection Title","Some description here.")
mapGettingStarted5.setMarkerInfo(0,"Marker Title","Some description here.")

const mapGettingStarted6 = new MapConnections('map-getting-started6',400)
mapGettingStarted6.addMarker(200,100)
mapGettingStarted6.addMarkerApproxLongLat(27,108)
mapGettingStarted6.addConnection(0,1,true,"package-icon-example",5000)
mapGettingStarted6.showAllConnectionIndices()
mapGettingStarted6.showAllMarkerIndices()
mapGettingStarted6.hideMarkerIndex(0)
mapGettingStarted6.setConnectionInfo(0,"Connection Title","Some description here.")
mapGettingStarted6.setMarkerInfo(0,"Marker Title","Some description here.")

//Create a new 800px wide map, with a white contour
const mapExample = new MapConnections('map-example',800, true)
//Set the crop and zoom level to fit the locations
mapExample.setCropSize(700, 600)
mapExample.setMapShift(-200,-600)
mapExample.setMapZoom(3)
mapExample.setBackgroundColor("#0C2E05")
//Add the warehouse marker
mapExample.addMarker(100,160)
mapExample.setMarkerInfo(0, "Warehouse","Your package came from here!")
mapExample.setMarkerColor(0,"#696E68")
//Add the current location marker using longitude and latitude
mapExample.addMarkerApproxLongLat(43.6532,-79.3832)
mapExample.setMarkerInfo(1, "Toronto","This marker was put at 43.6532° N, 79.3832° W")
mapExample.setMarkerColor(1,"#7FE96A")
//Add the destination marker
mapExample.addMarker(500,260)
mapExample.setMarkerInfo(2, "Your House","Your delivery address.")
mapExample.setMarkerColor(2,"#DB5567")
//Add the connection from warehouse marker to current location marker
mapExample.addConnection(0,1,true,"", 10000)
mapExample.setConnectionInfo(0, "Already completed","Your package arrived from the warehouse already!")
mapExample.setConnectionColor(0, "#58584C")
mapExample.setConnectionIconColor(0,"#898A64")
//Add the connection from current location marker to destination marker
mapExample.addConnection(1,2,true,"package-icon", 5000)
mapExample.setConnectionInfo(1, "Package","Your package is on the way from Toronto!")
mapExample.setConnectionColor(1, "#DADD26")

//Create a new 1000px wide map
const mapExampleTravel = new MapConnections('map-example-travel',1000)
//Set the crop and zoom level to fit the locations
mapExampleTravel.setCropSize(1000, 600)
mapExampleTravel.setMapShift(-250,-500)
mapExampleTravel.setMapZoom(2)
mapExampleTravel.setBackgroundColor("#6F5088")
//Add the first marker
mapExampleTravel.addMarker(450,360)
mapExampleTravel.setMarkerInfo(0, "Start","Your journey starts here!")
mapExampleTravel.setMarkerColor(0,"#7FE96A")
//Add the second marker
mapExampleTravel.addMarkerApproxLongLat(35.6532,20.3832)
mapExampleTravel.setMarkerInfo(1, "","Time to get on the cruise!")
mapExampleTravel.setMarkerColor(1,"#E1E96A")
//Add the third marker
mapExampleTravel.addMarker(200,260)
mapExampleTravel.setMarkerInfo(2, "Pit Stop!","Time to get in the car!")
mapExampleTravel.setMarkerColor(2,"#E1E96A")
//Add the destination marker
mapExampleTravel.addMarker(150,160)
mapExampleTravel.setMarkerInfo(3, "End","")
mapExampleTravel.setMarkerColor(3,"#DB5567")
//Add the connections
mapExampleTravel.addConnection(0,1,true,"airplane-icon", 10000)
mapExampleTravel.setConnectionColor(0,"#FFFFFF60")
mapExampleTravel.setConnectionInfo(0, "Plane travel","This flight will be quick!")

mapExampleTravel.addConnection(1,2,true,"cruise-icon", 30000)
mapExampleTravel.setConnectionColor(1,"#7789EBA6")
mapExampleTravel.setConnectionInfo(1, "Cruise","Enjoy the sights, this will take a while")

mapExampleTravel.addConnection(2,3,true,"car-icon", 35000)
mapExampleTravel.setConnectionColor(2,"#EBC677A6")
mapExampleTravel.setConnectionInfo(2, "Car","The final stretch!")