package realtimetransportmonitoring.domain;

import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Класс описывающий объект транспорта
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 * 
 */
@Entity
@Table(name = "transports")
public class Transport {
	@Id
	@Column(name = "id")
	private UUID id;

	/**
	 * Имя транспортного средства
	 */
	@Column(name = "name")
	private String name;

	/**
	 * Описание транспортного средства
	 */
	@Column(name = "description")
	private String description;

	/**
	 * Маршрут, по которому двигается транспорт
	 */
	@ManyToOne(targetEntity = Route.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Route route;

	/**
	 * Текущее положение объекта
	 */
	@OneToOne(targetEntity = Point.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Point position;

	/**
	 * Необходимо для того, что бы при создании объекта приципить нужный маршрут
	 */
	@Transient
	private String routeID;

	public Transport() {
		id = UUID.randomUUID();
		name = new String();
		description = new String();
	}

	public String getId() {
		return id.toString();
	}

	public void setId(String id) {
		this.id = UUID.fromString(id);
	}

	public Route getRoute() {
		return route;
	}

	public void setRoute(Route route) {
		this.route = route;
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

	public String getRouteID() {
		return routeID;
	}

	public void setRouteID(String routeID) {
		this.routeID = routeID;
	}

	public Point getPosition() {
		return position;
	}

	public void setPosition(Point position) {
		this.position = position;
	}
}
