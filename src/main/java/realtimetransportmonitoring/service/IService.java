package realtimetransportmonitoring.service;

import java.util.List;

import realtimetransportmonitoring.domain.Route;
import realtimetransportmonitoring.domain.Transport;
import realtimetransportmonitoring.domain.yours.YOURSRouteFile;

/**
 * Интерфейс сервиса
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 */
public interface IService {
	public List<Route> getAllRoutes();

	public Route getRoute(String id);

	public void saveRoute(Route route);

	public void removeRoute(Route route);

	public void removeRoute(String routeID);

	public List<Transport> getAllTransports();

	public Transport getTransport(String number);

	public void saveTransport(Transport transport);

	public void removeTransport(Transport transport);

	public void removeTransport(String number);

	public void saveYOURSRouteKML(YOURSRouteFile yoursRouteKML);

	public YOURSRouteFile getYOURSRouteKML(String id);

	public void removeYOURSRouteKML(String id);
}
