"use strict";
function getRandomColor(){
  const colors = ["#8BA1CC","#87A3DD","#A6D9F1","#94C7CE","#AE9DE7","#D58EE7","#C3D9EE"]
  return colors[Math.floor(Math.random()*colors.length)]
}

const numberPoints = 8

const landingMap = new MapConnections({
  divId:'map-landing',
  width:800,
  whiteMap:true,
})
landingMap.addMarkerApproxLongLat({longitude:40,latitude:-79})
landingMap.addMarkerApproxLongLat({longitude:-47,latitude:-98})
landingMap.addMarkerApproxLongLat({longitude:75,latitude:51.268})
landingMap.addMarker({top:350,left:460})
landingMap.addMarker({top:100,left:360})
landingMap.addMarker({top:300,left:660})
landingMap.addMarker({top:100,left:160})
landingMap.addMarker({top:450,left:700})
landingMap.setBackgroundColor({color:"#212B47"})

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
    landingMap.addConnection({markerIndexStart:connectionPoint.endPoint,markerIndexEnd:connectionPoint.startPoint,animationDuration:Math.random()*5000 + 3000})
    landingMap.setConnectionColor({connectionIndex:connectionsMade.length,color:getRandomColor()})
    landingMap.setConnectionIconColor({connectionIndex:connectionsMade.length,color:getRandomColor()})
    connectionsMade.push(connectionPoint)
  }
}

for(let p = 0; p<landingMap.markers.length; p++){
  landingMap.setMarkerColor({markerIndex:p,color:getRandomColor()})
}