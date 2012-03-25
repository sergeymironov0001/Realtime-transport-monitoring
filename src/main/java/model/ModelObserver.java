package model;

import java.util.ArrayList;
import java.util.List;

class ModelObserver {
	protected List<IModelChangesListener> listeners;

	public ModelObserver() {
	}

	public void addListener(IModelChangesListener listener) {
		getListeners().add(listener);
	}

	public void removeListener(IModelChangesListener listener) {
		getListeners().remove(listener);
	}

	public List<IModelChangesListener> getListeners() {
		if (listeners == null) {
			listeners = new ArrayList<IModelChangesListener>();
		}
		return listeners;
	}

	public void notifyListeners() {
		for (IModelChangesListener listener : getListeners()) {
			listener.update();
		}
	}
}
