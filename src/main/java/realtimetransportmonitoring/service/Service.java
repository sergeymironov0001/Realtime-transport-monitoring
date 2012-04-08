package realtimetransportmonitoring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import realtimetransportmonitoring.dao.IDAO;
import realtimetransportmonitoring.domain.Route;
import realtimetransportmonitoring.domain.Transport;

/**
 * Класс сервиса
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 * 
 */

@org.springframework.stereotype.Service
class Service implements IService {

	@Autowired
	private IDAO dao;

	public Service() {
	}

	public IDAO getDao() {
		return dao;
	}

	public void setDao(IDAO dao) {
		this.dao = dao;
	}

	@Override
	@Transactional
	public void saveRoute(Route route) {
		getDao().saveRoute(route);
	}

	@Override
	@Transactional
	public List<Route> getAllRoutes() {
		return getDao().getAllRoutes();
	}

	@Override
	@Transactional
	public void removeRoute(Route route) {
		getDao().removeRoute(route);
	}

	@Override
	@Transactional
	public void removeRoute(String routeID) {
		getDao().removeRoute(routeID);
	}

	@Override
	@Transactional
	public List<Transport> getAllTransports() {
		return getDao().getAllTransports();
	}

	@Override
	@Transactional
	public void saveTransport(Transport transport) {
		getDao().saveTransport(transport);
	}

	@Override
	@Transactional
	public void removeTransport(Transport transport) {
		getDao().removeTransport(transport);

	}

	@Override
	@Transactional
	public void removeTransport(String number) {
		getDao().removeTransport(number);
	}

	@Override
	@Transactional
	public Route getRoute(String id) {
		return getDao().getRoute(id);
	}

	@Override
	@Transactional
	public Transport getTransport(String number) {
		return getDao().getTransport(number);
	}

}
