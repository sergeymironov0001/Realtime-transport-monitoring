package realtimetransportmonitoring.dao;

import java.util.List;
import java.util.UUID;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import realtimetransportmonitoring.domain.Route;
import realtimetransportmonitoring.domain.Transport;
import realtimetransportmonitoring.domain.yours.YOURSRouteFile;

/**
 * Класс слоя доступа к объектам, основанный на JPA
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 * 
 */
@Repository
public class DAOJPA implements IDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public DAOJPA() {
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void initialize() {
		// TODO Auto-generated method stub

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Route> getAllRoutes() {
		return getSessionFactory().getCurrentSession()
				.createQuery("from Route").list();
	}

	@Override
	public Route getRoute(String id) {
		Route route = (Route) sessionFactory.getCurrentSession().load(
				Route.class, UUID.fromString(id));
		return route;
	}

	@Override
	public void saveRoute(Route route) {
		sessionFactory.getCurrentSession().save(route);
	}

	@Override
	public void removeRoute(Route route) {
		sessionFactory.getCurrentSession().delete(route);
	}

	@Override
	public void removeRoute(String id) {

		removeRoute(getRoute(id));
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Transport> getAllTransports() {
		return getSessionFactory().getCurrentSession()
				.createQuery("from Transport").list();
	}

	@Override
	public void saveTransport(Transport transport) {
		sessionFactory.getCurrentSession().save(transport);
	}

	@Override
	public void removeTransport(String number) {
		removeTransport(getTransport(number));
	}

	@Override
	public void removeTransport(Transport transport) {
		sessionFactory.getCurrentSession().delete(transport);
	}

	@Override
	public Transport getTransport(String number) {
		Transport transport = (Transport) sessionFactory.getCurrentSession()
				.load(Transport.class, UUID.fromString(number));
		return transport;
	}

	@Override
	public void saveYOURSRouteKML(YOURSRouteFile yoursRouteKML) {
		sessionFactory.getCurrentSession().save(yoursRouteKML);

	}

	@Override
	public YOURSRouteFile getYOURSRouteKML(String id) {
		YOURSRouteFile yoursRouteKML = null;
		try {
			yoursRouteKML = (YOURSRouteFile) sessionFactory.getCurrentSession()
					.load(YOURSRouteFile.class, UUID.fromString(id));

		} catch (org.hibernate.ObjectNotFoundException ex) {

		}
		return yoursRouteKML;
	}

	@Override
	public void removeYOURSRouteKML(String id) {
		removeYOURSRouteKML(getYOURSRouteKML(id));
	}

	@Override
	public void removeYOURSRouteKML(YOURSRouteFile yoursRouteKML) {
		if (yoursRouteKML != null) {
			sessionFactory.getCurrentSession().delete(yoursRouteKML);
		}
	}
}
