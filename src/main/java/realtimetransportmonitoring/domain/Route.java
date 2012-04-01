package realtimetransportmonitoring.domain;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Класс маршрута
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 */

@Entity
@Table(name = "routes")
public class Route {
	@Id
	@Column(name = "id")
	protected UUID id;

	/**
	 * Имя маршрута
	 */
	@Column(name = "name")
	private String name;

	/**
	 * Описание маршрута
	 */
	@Column(name = "description")
	private String description;

	/**
	 * Тип маршрута
	 */
	@Column(name = "type")
	@Enumerated(EnumType.STRING)
	private RouteType type;

	/**
	 * Точки задающие маршрут
	 */
	@OneToMany(targetEntity = Point.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Point> points;

	public Route() {
		id = UUID.randomUUID();
		name = new String();
		description = new String();
		points = new HashSet<Point>();
		type = RouteType.UNDEFINED;
	}

	public Route(String name, String description) {
		this();
		this.name = name;
		this.description = description;
	}

	public String getId() {
		return id.toString();
	}

	public void setId(String id) {
		this.id = UUID.fromString(id);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Point> getPoints() {
		return points;
	}

	public void setPoints(Set<Point> points) {
		this.points = points;
	}

	public void addPoint(Point point) {
		getPoints().add(point);
	}

	public void removePoint(Point point) {
		getPoints().remove(point);
	}

	public RouteType getType() {
		return type;
	}

	public void setType(RouteType type) {
		this.type = type;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj instanceof Route) {
			Route route = (Route) obj;
			if (getName().equals(route.getName())
					&& getDescription().equals(route.getDescription())
					&& getPoints().equals(route.getPoints())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public String toString() {
		return "Name: " + getName() + " Description: " + getDescription()
				+ " Type: " + type;
	}
}
