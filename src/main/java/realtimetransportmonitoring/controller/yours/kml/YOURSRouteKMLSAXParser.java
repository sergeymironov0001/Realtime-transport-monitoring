package realtimetransportmonitoring.controller.yours.kml;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import realtimetransportmonitoring.controller.yours.YOURSRouteData;

/**
 * Класс реализующий разбор kml файлов cодержащий описание маршрута получаемых с
 * сервиса YOURS
 * 
 * @author Mironov S.V.
 * @since 09.04.2012
 */
public class YOURSRouteKMLSAXParser extends DefaultHandler {
	private static final String DISTANCE_TAG = "distance";
	private static final String COORDINATES_TAG = "coordinates";

	private String currentElement = new String();

	private YOURSRouteData routeData;

	public YOURSRouteKMLSAXParser() {
		super();
	}

	@Override
	public void startDocument() throws SAXException {
		super.startDocument();
		routeData = new YOURSRouteData();
		currentElement = "";
	}

	@Override
	public void endDocument() throws SAXException {
		super.endDocument();
	}

	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		super.startElement(uri, localName, qName, attributes);
		setCurrentElement(qName);
	}

	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		super.endElement(uri, localName, qName);
	}

	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		// super.characters(ch, start, length);
		String text = new String(ch, start, length);
		// if (getCurrentElement().equalsIgnoreCase(DISTANCE_TAG)) {
		// // getRouteData().setDistance(Double.parseDouble(text));
		//
		if (getCurrentElement().equalsIgnoreCase(COORDINATES_TAG)) {
			getRouteData().setCoordinates(
					getRouteData().getCoordinates() + text);
		}
	}

	private String getCurrentElement() {
		return currentElement;
	}

	private void setCurrentElement(String currentElement) {
		this.currentElement = currentElement;
	}

	public YOURSRouteData getRouteData() {
		return routeData;
	}

	public void setRouteData(YOURSRouteData routeData) {
		this.routeData = routeData;
	}

}
