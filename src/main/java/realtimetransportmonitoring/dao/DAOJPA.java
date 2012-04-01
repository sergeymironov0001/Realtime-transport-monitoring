package realtimetransportmonitoring.dao;

import java.util.List;
import java.util.UUID;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import realtimetransportmonitoring.domain.Route;

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
	public void save(Route route) {
		sessionFactory.getCurrentSession().save(route);
	}

	@Override
	public void remove(Route route) {
		sessionFactory.getCurrentSession().delete(route);
	}

	@Override
	public void remove(String routeID) {
		Route route = (Route) sessionFactory.getCurrentSession().load(
				Route.class, UUID.fromString(routeID));
		remove(route);
	}

}
