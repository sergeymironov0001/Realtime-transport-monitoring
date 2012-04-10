package realtimetransportmonitoring.domain.yours;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.SAXException;

import realtimetransportmonitoring.controller.yours.YOURSRouteData;
import realtimetransportmonitoring.controller.yours.YOURSRouteFileType;
import realtimetransportmonitoring.controller.yours.kml.YOURSRouteKMLSAXParser;

/**
 * 
 * @author Mironov S.V.
 * @since 09.04.2012
 */
@Entity
@Table(name = "yoursroutefiles")
public class YOURSRouteFile {
	@Id
	@Column(name = "id")
	UUID id;

	@Column(name = "text", length = 50000)
	private String text;

	@Column(name = "type")
	@Enumerated(EnumType.STRING)
	private YOURSRouteFileType type;

	public YOURSRouteFile() {
		text = new String();
		type = YOURSRouteFileType.UNDEFINED;
	}

	public YOURSRouteFile(String text) {
		this.text = text;
	}

	public String getId() {
		return id.toString();
	}

	public void setId(String id) {
		this.id = UUID.fromString(id);
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public YOURSRouteFileType getType() {
		return type;
	}

	public void setType(YOURSRouteFileType type) {
		this.type = type;
	}

	public YOURSRouteData parse() {
		switch (getType()) {
		case KML:
			try {
				SAXParserFactory factory = SAXParserFactory.newInstance();
				SAXParser parser = factory.newSAXParser();
				YOURSRouteKMLSAXParser yoursRouteKMLSAXParser = new YOURSRouteKMLSAXParser();
				InputStream stream = new ByteArrayInputStream(getText()
						.getBytes());
				parser.parse(stream, yoursRouteKMLSAXParser);
				return yoursRouteKMLSAXParser.getRouteData();
			} catch (ParserConfigurationException e) {
				e.printStackTrace();
			} catch (SAXException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			break;
		default:
			break;
		}

		return null;
	}
}
