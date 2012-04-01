package realtimetransportmonitoring.dao;

import java.util.List;

import realtimetransportmonitoring.domain.Route;

/**
 * Интерфейс, описывающий классы слоя доступа к объектам
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 */
public interface IDAO {
	void initialize();

	public List<Route> getAllRoutes();

	public void save(Route route);

	public void remove(Route route);
}
