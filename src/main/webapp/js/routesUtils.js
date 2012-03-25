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

	var result = ROUTING_API_URL + "&slat=" + startPoint.lat + "&slon="
			+ startPoint.lon + "&flat=" + finishPoint.lat + "&flon="
			+ finishPoint.lon + "&type=" + routeType + "&fast=" + fast;

	return result;
}