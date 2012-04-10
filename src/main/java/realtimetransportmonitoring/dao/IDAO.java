package realtimetransportmonitoring.dao;

import java.util.List;

import realtimetransportmonitoring.domain.Route;
import realtimetransportmonitoring.domain.Transport;
import realtimetransportmonitoring.domain.yours.YOURSRouteFile;

/**
 * Интерфейс, описывающий классы слоя доступа к объектам
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 */
public interface IDAO {
	void initialize();

	public List<Route> getAllRoutes();

	public Route getRoute(String id);

	public void saveRoute(Route route);

	public void removeRoute(String id);

	public void removeRoute(Route route);

	public List<Transport> getAllTransports();

	public Transport getTransport(String number);

	public void saveTransport(Transport transport);

	public void removeTransport(String number);

	public void removeTransport(Transport transport);

	public void saveYOURSRouteKML(YOURSRouteFile yoursRouteKML);

	public YOURSRouteFile getYOURSRouteKML(String id);

	public void removeYOURSRouteKML(String id);

	public void removeYOURSRouteKML(YOURSRouteFile yoursRouteKML);
}
