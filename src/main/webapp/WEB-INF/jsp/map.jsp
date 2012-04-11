<%@ page language="java" contentType="text/html; charset=utf8"
	pageEncoding="utf8"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
	height: 30px;
	width: 800px;
}

</style>

<script type="text/javascript" src="http://www.openlayers.org/api/OpenLayers.js"></script>
<script type="text/javascript" src="<spring:url value="/js/Ajax.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/js/utils.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/mapUtils.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/controlUtils.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/js/routesUtils.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/initMap.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/Map.js" />"></script>

</head>
<body>

	<h2><spring:message code="label.routes"/></h2>
	<c:if  test="${!empty routeList}">
	
	<table class="data">
	<c:forEach items="${routeList}" var="route">
	<tr>
			<td><input type="checkbox" name="${route.name}" id="${route.id}" onClick="setVisibleRouteTrace(this.id, this.checked);">${route.name}</td>
	</tr>
	</c:forEach>
	</table>
</c:if>

	<center>
		<div id="controls">
			<input type="button" value="Add marker" id="addMarkerButton"s/>
			<input type="button" value="Construct foot trace" id="constructFootTrace"/>
			<input type="button" value="Construct bicycle trace" id="constructBicycleTrace"/>
			<input type="button" value="Construct car trace" id="constructCarTrace"/>  
		</div>
		<div id="map"></div>
		
		<p id="output"></p>
	</center>
</body>
</html>