package model;

/**
 * Класс описывающий точку на карте
 * 
 * @author Mironov S.V.
 * @since 25.03.2012
 */
public class Point {
	private double lon;
	private double lat;

	public Point() {
	}

	public Point(double lon, double lat) {
		this.lon = lon;
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		return super.equals(obj);
	}

	@Override
	public String toString() {
		return "Lon: " + getLon() + " Lat: " + getLat();
	}

}
