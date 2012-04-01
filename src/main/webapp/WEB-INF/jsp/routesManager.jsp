<%@ page language="java" contentType="text/html; charset=utf8"
	pageEncoding="utf8"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>Realtime transport monitoring</title>
</head>
<body> 
<h2>Route manager</h2>

 
<form:form method="post" action="addRoute.html" commandName="route">
 
    <table>
    <tr>
        <td><form:label path="name"><spring:message code="label.routeName"/></form:label></td>
        <td><form:input path="name" /></td>
    </tr>
    <tr>
        <td><form:label path="description"><spring:message code="label.routeDescription"/></form:label></td>
        <td><form:input path="description" /></td>
    </tr>
    <tr>
        <td colspan="2">
            <input type="submit" value="<spring:message code="label.addRoute"/>"/>
        </td>
    </tr>
</table>
</form:form>
 
 
 
 
<h3>Routes</h3>
<c:if  test="${!empty routeList}">
<table class="data">
<tr>
    <th>Name</th>
    <th>Description</th>
</tr>
	<c:forEach items="${routeList}" var="route">
		<tr>
			<td>${route.name}</td>
			<td>${route.description}</td>
		 <td><a href="removeRoute/${route.id}.html">delete</a></td>
		</tr>
	</c:forEach>
</table>
</c:if>
 
</body>
</html>