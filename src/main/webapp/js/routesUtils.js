/**
 * Метод создает url запроса на сервер для прокаладки маршурта
 * 
 * @param startPoint -
 *            точка начала маршрута
 * @param finishPoint -
 *            точка окончания маршрута
 * 
 * @param routeType -
 *            тип маршрута (foot, car...)
 * @param fast -
 *            true -самый быстрый путь, false - самый короткий путь
 * 
 * @returns - url запроса на сервер для прокаладки маршурта
 */
function createRouteConstructUrl(startPoint, finishPoint, routeType, fast) {

	var ROUTING_API_URL = "http://localhost:8080/Realtime-transport-monitoring/constructroute?";

	var result = ROUTING_API_URL + "slat=" + startPoint.lat + "&slon="
			+ startPoint.lon + "&flat=" + finishPoint.lat + "&flon="
			+ finishPoint.lon + "&type=" + routeType + "&fast=" + fast;
	return result;
}

/**
	 * ������� ���������
	 * ��������� �� �����
	 * 
	 * @param routesName -
	 *            �������� ���������
	 * @param routesData -
	 *            ������ ���������
	 * @param routesDataFormat -
	 *            ������ ������
	 *            ��������� (��� OpenLayers.Format)
	 * @param mapStyle -
	 *            ����� ����������
	 *            ��������� (��� OpenLayers.StyleMap)
	 */
function outputRoutes(map, routesName, routesDataUrl, routesDataFormat, mapStyle) {
		var layer = new OpenLayers.Layer.Vector(routesName, {
			projection : map.displayProjection,
			strategies : [ new OpenLayers.Strategy.Fixed() ],
			protocol : new OpenLayers.Protocol.HTTP({
				url : routesDataUrl,
				format : routesDataFormat
			}),
			styleMap : mapStyle
		});
		map.addLayer(layer);
}


/**
 * ������� �������� �������
 * �� �����
 * 
 * @param routeName -
 *            �������� ��������
 * @param routesData -
 *            ������ ��������
 * @param routesDataFormat -
 *            ������ ������ ��������
 *            (��� OpenLayers.Format)
 */
function outputRoute(map, routeName, routeData, routeDataFormat) {
	// ������� ����� ����� ���
	// ��������� ��������
	var style = new OpenLayers.Style({
		fillColor : "red"
	}, {
		rules : [ new OpenLayers.Rule({
			filter : new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : "name",
				value : routeName
			}),
			symbolizer : {
				fillColor : "blue",
				strokeWidth : 4,
				strokeOpacity : 0.5,
				strokeColor : "red"
			}
		}), new OpenLayers.Rule({
			elseFilter : true,
			symbolizer : {
				fillColor : "blue",
				strokeWidth : 4,
				strokeOpacity : 0.5,
				strokeColor : "green"
			}
		}) ]
	});
	var styleMap = new OpenLayers.StyleMap({
		"default" : style,
		"select" : new OpenLayers.Style({
			fillColor : "fuchsia"
		})
	});

	// var styleMap = new OpenLayers.StyleMap(style);
	outputRoutes(map, routeName, routeData, routeDataFormat, styleMap);
}


function addPointToRoute(routePoints, point){
	routePoints.push(point);
}
	
function createAddMarkerOnClickControl(map, markers){
	var handler = function(control, evt){
			var point = convertViewPortPositionToMapPosition(map, evt.xy)
			var marker = createMarker(map, 12, point);
			addMarker(marker, markers);
			control.deactivate();
	}
	return createOneClickControl(handler);
}

function createAddPointToRouteOnClickControl(map, routePoints){
	var handler = function(control, evt){
		var point = convertViewPortPositionToMapPosition(map, evt.xy)
		addPointToRoute(routePoints, point);
		control.deactivate();		
		if(routePoints.length > 1){
			var url = createRouteConstructUrl( routePoints[routePoints.length - 2],
										routePoints[routePoints.length - 1], "foot", "true");
			outputRoute(map, "Path from: " + (routePoints.length - 1) + " to: " + routePoints.length, url, new OpenLayers.Format.KML());
		}
	} 
	return createOneClickControl(handler);
}