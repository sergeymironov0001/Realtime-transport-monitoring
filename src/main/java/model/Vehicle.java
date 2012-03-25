package model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Vehicle")
public class Vehicle {
	@Id
	@Column(name = "id")
	private UUID id;
	@Column(name = "id")
	private String name;
	@Column(name = "description")
	private String description;

}
