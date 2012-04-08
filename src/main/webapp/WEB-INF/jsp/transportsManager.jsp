<%@ page language="java" contentType="text/html; charset=utf8"
	pageEncoding="utf8"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title><spring:message code="title.realtimeTransportMonitoring"/></title>
<style>
#map {
	height: 800px;
	width: 800px;
}
</style>
    
 
</head>
<body> 
<h1><spring:message code="label.transportsManager"/></h1>


<h2><spring:message code="label.addTransport"/></h2>
<form:form method="post" action="addTransport.html" commandName="transport">
<table>
    <tr>
    	<td><form:label path="routeID"><spring:message code="label.route"/></form:label></td>
    	<td><form:select path="routeID">
    	 	<form:option value="0"><spring:message code="label.selectRoute"/></form:option>
		   	<form:options items="${routeList}" itemLabel="name" itemValue="id" />
			</form:select>
		</td>
		<td><form:errors path="routeID"  /></td>
    </tr>
    <tr>
        <td><form:label path="number"><spring:message code="label.carNumber"/></form:label></td>
        <td><form:input path="number" id="number"/></td>
        <td><form:errors path="number" /></td>
    </tr>
    <tr>
        <td><form:label path="name"><spring:message code="label.transportName"/></form:label></td>
        <td><form:input path="name" id="name"/></td>
        <td><form:errors path="name" /></td>
    </tr>
    <tr>
        <td><form:label path="description"><spring:message code="label.transportDescription"/></form:label></td>
        <td><form:input path="description" id="description"/></td>
        <td><form:errors path="description" /></td>
    </tr>
    <tr>
        <td colspan="2">
           <input type="submit" value="<spring:message code="label.addTransport"/>" id="addTransport"/>
        </td>
    </tr>
</table>
</form:form>
 	
<h2><spring:message code="label.transports"/></h2>
<c:if  test="${!empty transportList}">
<table class="data">
<tr>
	<th><spring:message code="label.route"/></th>
	<th><spring:message code="label.carNumber"/></th>
    <th><spring:message code="label.transportName"/></th>
    <th><spring:message code="label.transportDescription"/></th>
</tr>
	<c:forEach items="${transportList}" var="transport">
			<td>${transport.route.name}</td>
			<td>${transport.number}</td>
			<td>${transport.name}</td>
			<td>${transport.description}</td>
		 	<td><a href="removeTransport/${transport.number}.html"><spring:message code="label.removeTransport"/></a></td>
		</tr>
	</c:forEach>
</table>
</c:if>
</html>