package realtimetransportmonitoring.domain;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
	@Column(name = "name")
	private String name;
	@Column(name = "description")
	private String description;

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
}
