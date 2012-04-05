/**
 * 
 * @param viewPortPosition -
 *            позиция на панели отображения
 *            карты
 * 
 * @retrun - координаты точки на карте
 */
function convertViewPortPositionToMapPosition(map, viewPortPosition) {
	var lonlat = map.getLonLatFromViewPortPx(viewPortPosition);
	lonlat.transform(map.projection, map.displayProjection);
	return lonlat;
}
	
function addMarker(marker, markers){
	markers.addMarker(marker);
}

function createMarker(map, id, position) {
	var lonlat = new OpenLayers.LonLat(position.lon, position.lat)
				.transform(map.displayProjection, map.getProjectionObject());
	var marker = new OpenLayers.Marker(lonlat);
	marker.id = id;
	return marker;
}

/**
* markers - OpenLayers.Layer.Markers
*/
function findMarker(markerID, markers){
	var marker = findElement(markers.markers, "id", markerID);
	return marker;
}

function moveMarker(map, markerID, newPosition, markers) {
		var lonlat = new OpenLayers.LonLat(newPosition.lon, newPosition.lat).transform(
				map.displayProjection, map.getProjectionObject());
		var marker = findMarker(markerID, markers);
		if (marker != null) {
			var newPx = map.getLayerPxFromLonLat(lonlat);
			marker.moveTo(newPx);
		} else {
			marker = createMarker(map, markerID, newPosition);
			addMarker(marker, markers);
		}
}

function setMarkerVisible(markerID, visible, markers) {
	var marker = findMarker(markerID, markers);
	if(marker != null){
		marker.display(visible);
	}
}

//marker = new ....
//var size = new OpenLayers.Size(25, 12);
//var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
//marker.icon = new OpenLayers.Icon("marker.png", size, offset);
//UPDATE AGAIN
//marker.icon.size = size;
//marker.icon.offset = offset;
//marker.draw();