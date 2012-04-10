package realtimetransportmonitoring.controller.yours;

import java.util.List;

/**
 * Класс данных о машруте, который
 * 
 * @author Mironov S.V.
 * @since 09.04.2012
 */
public class YOURSRouteData {
	private double distance = 0;
	private String coordinates;

	public YOURSRouteData(double distance, String coordinates) {
		setDistance(distance);
		setCoordinates(coordinates);
	}

	public YOURSRouteData() {
		coordinates = new String();
	}

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}

	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}

	private static YOURSRouteData combine(YOURSRouteData routeData1,
			YOURSRouteData routeData2) {
		YOURSRouteData result = new YOURSRouteData();
		routeData1.getDistance();
		result.setDistance(routeData1.getDistance() + routeData2.getDistance());
		result.setCoordinates(routeData1.getCoordinates() + " "
				+ routeData2.getCoordinates());
		return result;
	}

	public static YOURSRouteData combine(List<YOURSRouteData> yoursRouteData) {
		YOURSRouteData result = new YOURSRouteData();
		for (YOURSRouteData tmp : yoursRouteData) {
			result = YOURSRouteData.combine(result, tmp);
		}
		return result;
	}

	@Override
	public String toString() {
		String result = "Distance: " + getDistance()
				+ System.getProperty("line.separator");
		result += getCoordinates();
		return result;
	}
}
