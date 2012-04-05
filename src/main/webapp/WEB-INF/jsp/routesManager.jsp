<%@ page language="java" contentType="text/html; charset=utf8"
	pageEncoding="utf8"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>Realtime transport monitoring</title>
    
    
<style>
#map {
	height: 800px;
	width: 800px;
}
</style>
    
<script type="text/javascript" src="http://www.openlayers.org/api/OpenLayers.js"></script>
<script type="text/javascript" src="<spring:url value="/js/Ajax.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/js/utils.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/js/mapUtils.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/controlUtils.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/js/routesUtils.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/initMap.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/routeManager.js" />"></script>    
 
</head>
<body> 
<h2><spring:message code="label.routesManager"/></h2>

<a href="createRoute.html"><spring:message code="label.createRoute"/></a> 

<h3>Routes</h3>
<c:if  test="${!empty routeList}">
<table class="data">
<tr>
    <th><spring:message code="label.routeName"/></th>
    <th><spring:message code="label.routeDescription"/></th>
</tr>
	<c:forEach items="${routeList}" var="route">
		<tr>
			<td>${route.name}</td>
			<td>${route.description}</td>
		 <td><a href="removeRoute/${route.id}.html"><spring:message code="label.removeRoute"/></a></td>
		</tr>
		
		
	</c:forEach>
</table>
</c:if>
 
 <center>
		</div>
		<div id="map"></div>
		<p id="output"></p>
</body>
</html>