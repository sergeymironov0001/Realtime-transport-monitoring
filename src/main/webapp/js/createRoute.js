(function() {	
	var addMarkerOnClickControl;
	var addPointToRouteOnClickControl;
	var routePoints;
	var SAVE_ROUTE_BASE_URL="saveRoute.html?"
	
	function createSaveRouteUrl(name, description, routePoints){
		var resultUrl=SAVE_ROUTE_BASE_URL;
		resultUrl += "name=" + name;
		resultUrl += "&description=" + description;
		for ( var i = 0; i < routePoints.length; i++) {
			resultUrl += "&points[" + i + "].lon=" + routePoints[i].lon;
			resultUrl += "&points[" + i + "].lat=" + routePoints[i].lat;
		}
		return resultUrl;
	}
	
	function outputMessage(message) {
		var out = document.getElementById("output");
		out.innerHTML = message;
	}

	function initControls(){
		addMarkerOnClickControl = createAddMarkerOnClickControl(map, markers);
		map.addControl(addMarkerOnClickControl);
		
		addPointToRouteOnClickControl = createAddPointToRouteOnClickControl(map, routePoints);
		map.addControl(addPointToRouteOnClickControl);
		
		document.getElementById("addPoint").onclick = function() {
			addMarkerOnClickControl.activate();
			addPointToRouteOnClickControl.activate();
		}
		
		document.getElementById("saveRoute").onclick = function() {
			var name = document.getElementById("name").value;
			var description = document.getElementById("description").value;
			window.location = createSaveRouteUrl(name, description, routePoints);
		}
	}
	
	function myRouteCallback(code, result) {
		//alert(code);
	}
	
	function updateWaypointCallback(waypoint) {
	}
	
	function MyCallBack(response) {
		alert(response);
	}
	
	window.onload = function() {
		routePoints = new Array();
		initOSMMap();
		initControls();
		
		//alert("0");
		//var MyFirstRoute = new Yours.Route(map);
		//MyFirstRoute.parameters.layer = 'mapnik';
		//MyFirstRoute.parameters.fast = '1';
		
		//var startPoint = new OpenLayers.LonLat(35.90027, 56.83752);
		//var finishPoint = new OpenLayers.LonLat(35.80504, 56.84477);
		//MyFirstRoute.addWaypoint("from").lonlat = startPoint;
		//MyFirstRoute.addWaypoint("to").lonlat = finishPoint;
		//alert("1");
		
		//var flat=51.158883504779;
		//var flon=3.220214843821;
		//var tlat=51.241492039675;
		//var tlon=4.472656250021;
		//MyFirstRoute.waypoint("from").lonlat = new OpenLayers.LonLat(flon,flat);
		//MyFirstRoute.waypoint("to").lonlat = new OpenLayers.LonLat(tlon,tlat);
		//MyFirstRoute.draw();
		//alert("2");
	}
})();