# Map Connections
<p align="center">
  <a href="https://jameskokoska.github.io/Map-Connections/">
    <img src="./docs/route.png" width=150/>
  </a>
</p>


# Getting Started
The libraries starter guide, examples, and documentation can be viewed here: https://jameskokoska.github.io/Map-Connections/

## Installing the Library
### Add the Library and Depend on it
In the `head` tag in your HTML, import the <i>Map Connections</i> library and CSS styles:
```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jameskokoska/Map-Connections@latest/pub/mapConnectionsLibrary/mapConnectionsStyles.css">
  <script defer type="text/javascript" src='https://cdn.jsdelivr.net/gh/jameskokoska/Map-Connections@latest/pub/mapConnectionsLibrary/mapConnections.js'></script>
  ...
</head>
```

There are no other dependencies required.

## Create a Simple Map
Add the HTML to your body, pass in the div ID when creating the map with JavaScript.
```html
<div id="map-div"></div>
```
```JS
const map = new MapConnections({ divId:'map-div', width:400 })
map.addMarker({ top:200, left:100, title:"Marker Title", description:"Some description here." })
map.addMarkerApproxLongLat({ longitude:27, latitude:108 })
map.addConnection({
  markerIndexStart: 0,
  markerIndexEnd: 1,
  animationDuration: 5000,
  iconColor: 'red',
  title: "Connection Title",
  description: "Some description here."
})
```
Starter Guide available here: https://jameskokoska.github.io/Map-Connections/starter-guide.html

API Documentation available here: https://jameskokoska.github.io/Map-Connections/api-documentation.html

# Other Information
## Sources
* World map image from https://mapsvg.com/maps/world
* Package icon from Chanut-is-Industries https://www.flaticon.com
* Navigation route icon (modified) from Freepik https://www.flaticon.com
* Airplane icon from Freepik https://www.flaticon.com
* Car icon (modified) from Freepik https://www.flaticon.com
* Cruise icon (modified) from Freepik https://www.flaticon.com

## Other Libraries Used
* HighlightJS from https://highlightjs.org/ for syntax highlighting

## GitHub Hosting
* This library has moved away from Heroku from due to recent changes: https://blog.heroku.com/next-chapter
* The library is available on GitHub: https://raw.githubusercontent.com/jameskokoska/Map-Connections/main/pub/mapConnectionsLibrary/mapConnections.js
* With the styles: https://raw.githubusercontent.com/jameskokoska/Map-Connections/main/pub/mapConnectionsLibrary/mapConnectionsStyles.css
* To use in a project however, you cannot use GitHub as a CDN since GitHub provides `text/plain`, not `application/javascript` or `text/javascript`
* As a work around, you can use https://www.jsdelivr.com/rawgit
