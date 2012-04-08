package realtimetransportmonitoring.utils;

import java.util.Collection;

import realtimetransportmonitoring.domain.Transport;

/**
 * Класс инструментов по генерированию xml документов
 * 
 * @author Mironov S.V.
 * @since 04.04.2012
 */
public class XMLUtils {

	/**
	 * Метод формирующий xml документ с данными о транспорте
	 * 
	 * @param transports
	 * @return
	 */
	static public String createTransportXML(Collection<Transport> transports) {
		String result = new String();
		// Открываем корневой тег документа
		result += "<object>";
		// Добавляем теги с данными о транспорте
		for (Transport transport : transports) {
			result += createMoveTransportElement(transport);
		}
		// Закрываем корневой тег документа
		result += "</object>";
		return result;
	}

	/**
	 * Метод формирующий xml тег, который содержит данные о объекте транспорта
	 * 
	 * @param transport
	 * @return
	 */
	static private String createMoveTransportElement(Transport transport) {
		String result = new String(
				"<object id=\"%1\" routeID=\"%2\"  lon=\"%3\" lat=\"%4\" name=\"%5\" description=\"%6\" />");
		result = StringUtils.replaceSubstring(result, "%1",
				String.valueOf(transport.getNumber()));
		result = StringUtils.replaceSubstring(result, "%2",
				String.valueOf(transport.getRoute().getId()));
		if (transport.getPosition() != null) {
			result = StringUtils.replaceSubstring(result, "%3",
					String.valueOf(transport.getPosition().getLon()));
			result = StringUtils.replaceSubstring(result, "%4",
					String.valueOf(transport.getPosition().getLat()));
		} else {
			result = StringUtils.replaceSubstring(result, "%3",
					String.valueOf(0));
			result = StringUtils.replaceSubstring(result, "%4",
					String.valueOf(0));
		}
		result = StringUtils
				.replaceSubstring(result, "%5", transport.getName());
		result = StringUtils.replaceSubstring(result, "%6",
				transport.getDescription());
		return result;
	}
}
