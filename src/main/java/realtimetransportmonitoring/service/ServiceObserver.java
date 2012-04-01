package realtimetransportmonitoring.service;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 * 
 */
class ServiceObserver {
	protected List<IServiceListener> listeners;

	public ServiceObserver() {
	}

	public void addListener(IServiceListener listener) {
		getListeners().add(listener);
	}

	public void removeListener(IServiceListener listener) {
		getListeners().remove(listener);
	}

	public List<IServiceListener> getListeners() {
		if (listeners == null) {
			listeners = new ArrayList<IServiceListener>();
		}
		return listeners;
	}

	public void notifyListeners() {
		for (IServiceListener listener : getListeners()) {
			listener.update();
		}
	}
}
