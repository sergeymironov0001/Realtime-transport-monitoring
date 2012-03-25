/**
 * Поиск элемента в массиве по указанному занчению указанного свойства
 * 
 * @param array -
 * 
 * @param propertyName -
 * 
 * @param propertyValue -
 * 
 * @returns
 */
function findElement(array, propertyName, propertyValue) {
	for ( var i = 0; i < array.length; i++) {
		if (array[i][propertyName] == propertyValue) {
			return array[i];
		}
	}
	return null;
}

/**
 * Получить все названия свойств и их значения у указанного объекта
 * 
 * @param obj -
 * 
 * @param objName -
 *            имя объекта (не объязательно)
 * @returns {String} - названия свойств и их значения
 */
function getObjectProperties(obj, objName) {
	var result = "";
	for ( var i in obj) {
		result += objName + "." + i + " = " + obj[i] + "<br />\n";
	}
	return result;
}