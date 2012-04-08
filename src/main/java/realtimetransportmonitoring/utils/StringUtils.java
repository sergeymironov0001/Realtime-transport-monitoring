package realtimetransportmonitoring.utils;

/**
 * Класс предоставляющий инструменты по работе со строками
 * 
 * @author Mironov S.V.
 * @since 04.04.2012
 * 
 */
public class StringUtils {

	public static String replaceSubstring(String aStr, String aSubstring,
			String aNewSubstring) {
		StringBuilder stringBuilder = new StringBuilder(aStr);
		int insertIndex = stringBuilder.indexOf(aSubstring);
		while (insertIndex != -1) {
			stringBuilder = stringBuilder.replace(insertIndex, insertIndex
					+ aSubstring.length(), aNewSubstring);
			insertIndex = stringBuilder.indexOf(aSubstring, insertIndex);
		}
		return stringBuilder.toString();
	}
}
