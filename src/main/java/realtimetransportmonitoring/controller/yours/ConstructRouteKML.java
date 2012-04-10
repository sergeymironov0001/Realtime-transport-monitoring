package realtimetransportmonitoring.controller.yours;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import realtimetransportmonitoring.domain.Route;
import realtimetransportmonitoring.domain.yours.YOURSRouteFile;

public class ConstructRouteKML {
	private static final String YOURS_API_URL = "http://www.yournavigation.org/api/1.0/gosmore.php?";
	private static final String PATTERN_FILE_URL = "kml/patterns/YOURSRouteKMLPattern.kml";

	/**
	 * Функция прокладывающая маршруты
	 * 
	 * @param routeData
	 * @return kml файл с данными о маршруте
	 */
	public static YOURSRouteFile constructTwoPointsRouteKML(
			TwoPointsRouteData routeData) {
		String result = "";
		String yoursAPIRouteConstructRequest = YOURS_API_URL;

		// Формируем запрос к сервису YOURS
		yoursAPIRouteConstructRequest += "format=kml";
		yoursAPIRouteConstructRequest += "&flat="
				+ routeData.getStart().getLat();
		yoursAPIRouteConstructRequest += "&flon="
				+ routeData.getStart().getLon();
		yoursAPIRouteConstructRequest += "&tlat="
				+ routeData.getFinish().getLat();
		yoursAPIRouteConstructRequest += "&tlon="
				+ routeData.getFinish().getLon();
		yoursAPIRouteConstructRequest += "&v="
				+ routeData.getType().toString().toLowerCase();
		yoursAPIRouteConstructRequest += "&fast="
				+ (routeData.isFast() ? 1 : 0);
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
		YOURSRouteFile routeFile = new YOURSRouteFile(result);
		routeFile.setType(YOURSRouteFileType.KML);
		return routeFile;
	}

	public static YOURSRouteFile constructRouteKML(Route route) {
		List<YOURSRouteFile> kmls = new ArrayList<YOURSRouteFile>();
		for (int i = 1; i < route.getPoints().size(); ++i) {
			TwoPointsRouteData twoPointsRouteData = new TwoPointsRouteData(
					route.getPoints().get(i - 1), route.getPoints().get(i),
					route.getType(), true);
			YOURSRouteFile tmpKML = constructTwoPointsRouteKML(twoPointsRouteData);
			kmls.add(tmpKML);
		}
		YOURSRouteFile result = new YOURSRouteFile(combineRouteKML(kmls));
		result.setId(route.getId());
		result.setType(YOURSRouteFileType.KML);
		return result;
	}

	/**
	 * 
	 * 
	 * @param routeData
	 * @return
	 */
	private static String combineRouteKML(List<YOURSRouteFile> yoursRouteKMLs) {
		List<YOURSRouteData> routeDataList = new ArrayList<YOURSRouteData>();
		String result = new String();
		for (YOURSRouteFile kml : yoursRouteKMLs) {
			routeDataList.add(kml.parse());
		}
		YOURSRouteData yoursRouteData = YOURSRouteData.combine(routeDataList);
		return createRouteKML(yoursRouteData);
	}

	private static String createRouteKML(YOURSRouteData yoursRouteData) {
		String kml = getRouteKMLPattern();
		kml = kml.replaceAll("%distance%",
				String.valueOf(yoursRouteData.getDistance()));
		kml = kml.replaceAll("%coordinates%",
				String.valueOf(yoursRouteData.getCoordinates()));
		return kml;
	}

	private static String getRouteKMLPattern() {
		String pattern = new String();
		// try {
		// Scanner scanner = new Scanner(new FileInputStream(new File(
		// PATTERN_FILE_URL)));
		// while (scanner.hasNextLine()) {
		// pattern += scanner.hasNextLine();
		// }
		// scanner.close();
		// } catch (FileNotFoundException e) {
		// e.printStackTrace();
		// }

		pattern += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		pattern += "<kml xmlns=\"http://earth.google.com/kml/2.0\">";
		pattern += "<Document>";
		pattern += "<name>KML Samples</name>";
		pattern += "<open>1</open>";
		pattern += "<distance>%distance%</distance>";
		pattern += "<description></description>";
		pattern += "<Folder>";
		pattern += "<name>Paths</name>";
		pattern += "<visibility>0</visibility>";
		pattern += "<description>Examples of paths.</description>";
		pattern += "<Placemark>";
		pattern += "<name>Tessellated</name>";
		pattern += "<visibility>0</visibility>";
		pattern += "<description></description>";
		pattern += "<LineString>";
		pattern += "<tessellate>1</tessellate>";
		pattern += "<coordinates>%coordinates%</coordinates>";
		pattern += "</LineString>";
		pattern += "</Placemark>";
		pattern += "</Folder>";
		pattern += "</Document>";
		pattern += "</kml>";
		return pattern;
	}
}
