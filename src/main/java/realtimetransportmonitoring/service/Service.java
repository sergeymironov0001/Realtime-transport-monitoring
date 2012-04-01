package realtimetransportmonitoring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import realtimetransportmonitoring.dao.IDAO;
import realtimetransportmonitoring.domain.Route;



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
	public void save(Route route) {
		getDao().save(route);
	}

	@Override
	@Transactional
	public List<Route> getAllRoutes() {
		return getDao().getAllRoutes();
	}

	@Override
	@Transactional
	public void remove(Route route) {
		getDao().remove(route);
	}

}
