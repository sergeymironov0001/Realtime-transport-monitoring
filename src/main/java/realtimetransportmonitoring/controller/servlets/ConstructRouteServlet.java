package realtimetransportmonitoring.controller.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import realtimetransportmonitoring.controller.yours.ConstructRouteKML;
import realtimetransportmonitoring.controller.yours.TwoPointsRouteData;

/**
 * Сервлет обрабатывающий запросы на прокладку маршрутов
 * 
 * @author Mironov S.V.
 * @since 25.03.2012
 */
public class ConstructRouteServlet extends HttpServlet {

	private static final long serialVersionUID = 4947015484729937749L;

	public ConstructRouteServlet() {
		super();
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {

		TwoPointsRouteData constructRouteRequest = TwoPointsRouteData
				.create(request);

		String routeData = "";
		switch (constructRouteRequest.getType()) {
		case FOOT:
			routeData = ConstructRouteKML.constructTwoPointsRouteKML(
					constructRouteRequest).getText();
			break;
		case MOTORCAR:
			routeData = ConstructRouteKML.constructTwoPointsRouteKML(
					constructRouteRequest).getText();
			break;
		default:
			break;
		}

		response.getWriter().write(routeData);
	}

}
