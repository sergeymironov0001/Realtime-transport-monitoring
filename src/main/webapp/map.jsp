<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Realtime-transport-monitoring</title>

<style>
#map {
	height: 500px;
	width: 1024px;
}

#controls{
	height: 50px;
	width: 100px;
}

</style>

<script src="http://www.openlayers.org/api/OpenLayers.js"></script>
<script src="js/Ajax.js"></script>
<script src="js/routesUtils.js"></script>
<script src="js/utils.js"></script>
<script src="js/Map.js"></script>


</head>
<body>
	<center>
		<div id="controls">
		<input type="button" value="Add marker"
					id="addMarkerButton"/> 
		<input type="button" value="Construct trace"
					id="constructTraceButton"/> 
		</div>
		<div id="map"></div>
		
		<p id="output"></p>
	</center>
</body>
</html>