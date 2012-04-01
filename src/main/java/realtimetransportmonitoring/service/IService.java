package realtimetransportmonitoring.service;

import java.util.List;

import realtimetransportmonitoring.domain.Route;

/**
 * Интерфейс сервиса
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 */
public interface IService {
	public List<Route> getAllRoutes();

	public void save(Route route);

	public void remove(Route route);

	public void remove(String routeID);
}
