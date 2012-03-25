package controller.servlets.routes;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Сервлет обрабатывающий запросы на прокладку маршрутов
 * 
 * @author Mironov S.V.
 * @since 25.03.2012
 */
public class ConstructRouteServlet extends HttpServlet {
	private static final String YOURS_API_URL = "http://www.yournavigation.org/api/1.0/gosmore.php?";
	private static final long serialVersionUID = 4947015484729937749L;

	public ConstructRouteServlet() {
		super();
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {

		ConstructRouteData constructRouteRequest = ConstructRouteData
				.create(request);

		String routeData = "";
		switch (constructRouteRequest.getType()) {
		case FOOT:
			routeData = constructFootRoute(constructRouteRequest);
			break;
		default:
			break;
		}

		response.getWriter().write(routeData);
	}

	/**
	 * Функция прокладывающая пешеходные маршруты
	 * 
	 * @param routeRequest
	 * @return
	 */
	private String constructFootRoute(ConstructRouteData routeRequest) {
		String result = "";
		String yoursAPIRouteConstructRequest = YOURS_API_URL;

		// Формируем запрос к сервису YOURS
		yoursAPIRouteConstructRequest += "format=kml";
		yoursAPIRouteConstructRequest += "&flat="
				+ routeRequest.getStart().getLat();
		yoursAPIRouteConstructRequest += "&flon="
				+ routeRequest.getStart().getLon();
		yoursAPIRouteConstructRequest += "&tlat="
				+ routeRequest.getFinish().getLat();
		yoursAPIRouteConstructRequest += "&tlon="
				+ routeRequest.getFinish().getLon();
		yoursAPIRouteConstructRequest += "&v="
				+ routeRequest.getType().toString().toLowerCase();
		yoursAPIRouteConstructRequest += "&fast="
				+ (routeRequest.isFast() ? 1 : 0);
		yoursAPIRouteConstructRequest += "&layer=mapnik";

		URL url;

		// Отсылаем запрос к сервису YOURS и обрабатываем ответ
		try {
			url = new URL(yoursAPIRouteConstructRequest);
			URLConnection connection = url.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					connection.getInputStream()));
			String inputLine;
			while ((inputLine = in.readLine()) != null) {
				result += inputLine + System.getProperty("line.separator");
			}
			in.close();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}
}
