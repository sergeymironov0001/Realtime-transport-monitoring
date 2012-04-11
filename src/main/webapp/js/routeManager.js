(function() {	
	var addMarkerOnClickControl;
	var addPointToRouteOnClickControl;
	var routePoints;
	function initControls(){
	}
	
	function outputMessage(message) {
		var out = document.getElementById("output");
		
		out.innerHTML = getObjectProperties(message.responseXML.documentElement);
	}
	
	window.onload = function() {
		//routePoints = new Array();
		//initOSMMap();
		//initControls();
	}
})();