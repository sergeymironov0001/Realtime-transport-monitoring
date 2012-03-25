package controller.servlets.routes;

import javax.servlet.http.HttpServletRequest;

import model.Point;
import model.RouteType;

/**
 * Класс предоставляющий данные для прокладки маршрута
 * 
 * @author Mironov S.V.
 * @since 25.03.2012
 */
public class ConstructRouteData {
	private Point start;
	private Point finish;
	private RouteType type;
	private boolean isFast;

	public static ConstructRouteData create(HttpServletRequest request) {
		ConstructRouteData result = new ConstructRouteData();

		// TODO добавить обработку ошибок
		Point startPoint = new Point(Double.valueOf(request
				.getParameter("slon")), Double.valueOf(request
				.getParameter("slat")));
		Point finishPoint = new Point(Double.valueOf(request
				.getParameter("flon")), Double.valueOf(request
				.getParameter("flat")));
		RouteType type = RouteType.valueOf(request.getParameter("type")
				.toUpperCase());
		Boolean fast = Boolean.valueOf(request.getParameter("fast"));

		result.setStart(startPoint);
		result.setFinish(finishPoint);
		result.setType(type);
		result.setFast(fast);

		return result;
	}

	public ConstructRouteData() {
		start = new Point();
		finish = new Point();
	}

	public Point getStart() {
		return start;
	}

	public void setStart(Point start) {
		this.start = start;
	}

	public Point getFinish() {
		return finish;
	}

	public void setFinish(Point finish) {
		this.finish = finish;
	}

	public RouteType getType() {
		return type;
	}

	public void setType(RouteType type) {
		this.type = type;
	}

	public boolean isFast() {
		return isFast;
	}

	public void setFast(boolean isFast) {
		this.isFast = isFast;
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		return super.equals(obj);
	}

	@Override
	public String toString() {
		return "Start: " + getStart() + " ; Finish: " + getFinish()
				+ "; Type: " + getType() + " ; Fatest: " + isFast();
	}

}
