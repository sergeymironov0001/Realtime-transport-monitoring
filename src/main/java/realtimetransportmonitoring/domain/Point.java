package realtimetransportmonitoring.domain;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Класс описывающий точку на карте
 * 
 * @author Mironov S.V.
 * @since 25.03.2012
 */

@Entity
@Table(name = "points")
public class Point {

	private static final Projection DEFAULT_PROJECTION = Projection.EPSG_4326;

	@Id
	@Column(name = "id")
	private UUID id;

	@Column(name = "projection")
	@Enumerated(EnumType.STRING)
	private Projection projection;

	@Column(name = "lon")
	private double lon;

	@Column(name = "lar")
	private double lat;

	public Point() {
		this(0, 0, DEFAULT_PROJECTION);
	}

	public Point(double lon, double lat) {
		this(lon, lat, DEFAULT_PROJECTION);
	}

	public Point(double lon, double lat, Projection projection) {
		this.id = UUID.randomUUID();
		this.lon = lon;
		this.lat = lat;
		this.projection = projection;
	}

	public String getId() {
		return id.toString();
	}

	public void setId(String id) {
		this.id = UUID.fromString(id);
	}

	public Projection getProjection() {
		return projection;
	}

	public void setProjection(Projection projection) {
		this.projection = projection;
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
		if (this == obj) {
			return true;
		}
		if (obj instanceof Point) {
			Point point = (Point) obj;
			if (getLon() == point.getLon() && getLat() == point.getLat()
					&& getProjection() == point.getProjection()) {
				return true;
			}
		}
		return false;
	}

	@Override
	public String toString() {
		return "Lon: " + getLon() + " Lat: " + getLat() + " Projection: "
				+ projection;
	}

}
