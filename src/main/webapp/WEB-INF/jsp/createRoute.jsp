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
<!--<script type="text/javascript" src="http://openstreetmap.org/openlayers/OpenStreetMap.js"></script>
<script type="text/javascript" src="<spring:url value="/js/jQuery/jquery.min.js" />"></script> 
<script type="text/javascript" src="http://www.yournavigation.org/jquery/jquery.js"></script>
<script type="text/javascript" src="http://www.yournavigation.org/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="http://www.yournavigation.org/api/dev/yours.js"></script>-->

<script type="text/javascript" src="<spring:url value="/js/Ajax.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/js/mapUtils.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/controlUtils.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/js/routesUtils.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/initMap.js" />"></script>
<script type="text/javascript" src="<spring:url value="/js/createRoute.js" />"></script>

</head>
<body> 
<h2><spring:message code="label.createRoute"/></h2>

<form:form method="get" action="addRoute.html" commandName="route">
 
    <table>
    <tr>
        <td><form:label path="name"><spring:message code="label.routeName"/></form:label></td>
        <td><form:input path="name" id="name"/></td>
    </tr>
    <tr>
        <td><form:label path="description"><spring:message code="label.routeDescription"/></form:label></td>
        <td><form:input path="description" id="description"/></td>
    </tr>
    <tr>
        <td colspan="2">
           
        </td>
    </tr>
</table>
</form:form>
 	<input type="submit" value="<spring:message code="label.saveRoute"/>" id="saveRoute"/>

	<input type="button" value="Add point"
					id="addPoint"/> 

	<center>
		</div>
		<div id="map"></div>
		
		<p id="output"></p>
	</center>
</body>
</html>