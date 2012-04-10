package realtimetransportmonitoring.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import realtimetransportmonitoring.controller.yours.ConstructRouteKML;
import realtimetransportmonitoring.domain.Point;
import realtimetransportmonitoring.domain.Route;
import realtimetransportmonitoring.domain.Transport;
import realtimetransportmonitoring.service.IService;
import realtimetransportmonitoring.utils.XMLUtils;

/**
 * Класс контроллера
 * 
 * @author Mironov S.V.
 * @since 31.03.2012
 */

@org.springframework.stereotype.Controller
public class Controller {

	@Autowired
	private IService service;

	private IService getService() {
		return service;
	}

	private void setService(IService service) {
		this.service = service;
	}

	@RequestMapping("/hello")
	public ModelAndView helloWorld() {

		// Route route = new Route("First route", "");
		// service.save(route);

		String message = "Hello World, Spring 3.0!";
		return new ModelAndView("hello", "message", message);
	}

	@RequestMapping("/createRoute")
	public String createRoute(Map<String, Object> map) {
		map.put("route", new Route());
		return "createRoute";
	}

	@RequestMapping("/map")
	public String map(Map<String, Object> map) {
		map.put("routeList", getService().getAllRoutes());
		return "map";
	}

	@RequestMapping("/routesManager")
	public String routesManager(Map<String, Object> map) {
		map.put("routeList", getService().getAllRoutes());
		return "routesManager";
	}

	@RequestMapping(value = "/saveRoute", method = RequestMethod.GET)
	public String saveRoute(@ModelAttribute("route") Route route,
			BindingResult result) {

		getService().saveRoute(route);
		getService().saveYOURSRouteKML(
				ConstructRouteKML.constructRouteKML(route));

		return "redirect:/routesManager";
	}

	// @RequestMapping(value = "/saveRoute", method = RequestMethod.GET)
	// public ModelAndView ssaveRoute(@ModelAttribute("route") Route route,
	// BindingResult result) {
	//
	// // getService().saveRoute(route);
	// // getService().saveYOURSRouteKML(
	// ;
	//
	// return new ModelAndView("routeKML", "routeKML", ConstructRouteKML
	// .constructRouteKML(route).getText());
	// }

	@RequestMapping("/getRouteKML/{routeID}")
	public ModelAndView getRouteKML(@PathVariable("routeID") String routeID) {
		String kmlText = getService().getYOURSRouteKML(routeID).getText();
		return new ModelAndView("routeKML", "routeKML", kmlText);
	}

	@RequestMapping("/removeRoute/{routeID}")
	public String removeRoute(@PathVariable("routeID") String routeID) {
		getService().removeRoute(routeID);
		return "redirect:/routesManager";
	}

	@RequestMapping("/transportsManager")
	public String transportManager(Map<String, Object> map) {
		Transport transport = new Transport();
		transport.setRoute(new Route());
		map.put("transport", transport);
		map.put("transportList", getService().getAllTransports());
		map.put("routeList", getService().getAllRoutes());
		return "transportsManager";
	}

	@RequestMapping(value = "/addTransport", method = RequestMethod.POST)
	public String addTransport(
			@ModelAttribute("transport") Transport transport,
			BindingResult result) {
		try {
			UUID.fromString(transport.getRouteID());
		} catch (IllegalArgumentException e) {
			return "redirect:/transportsManager";
		}
		Route route = getService().getRoute(transport.getRouteID());
		if (route == null) {
			return "redirect:/addTransport";
		}
		transport.setRoute(route);
		transport.setPosition(new Point(35.74265, 56.82925));
		getService().saveTransport(transport);
		return "redirect:/transportsManager";
	}

	@RequestMapping("/removeTransport/{transportID}")
	public String removeTransport(
			@PathVariable("transportID") String transportID) {
		getService().removeTransport(transportID);
		return "redirect:/transportsManager";
	}

	@RequestMapping("/getAllTransportData")
	public ModelAndView getAllTransportData() {
		List<Transport> transports = getService().getAllTransports();
		String xml = XMLUtils.createTransportXML(transports);
		// response.setContentType("text/xml");
		// response.setHeader("Cache-Control", "no-cache");
		// try {
		// response.getWriter().write(xml);
		// } catch (IOException e) {
		// e.printStackTrace();
		// }
		return new ModelAndView("transportData", "transportData", xml);
	}
}
