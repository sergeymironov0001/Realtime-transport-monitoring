package realtimetransportmonitoring.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import realtimetransportmonitoring.domain.Route;
import realtimetransportmonitoring.service.IService;

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

	@RequestMapping("/hello")
	public ModelAndView helloWorld() {

		// Route route = new Route("First route", "");
		// service.save(route);

		String message = "Hello World, Spring 3.0!";
		return new ModelAndView("hello", "message", message);
	}

	@RequestMapping("/routesManager")
	public String listContacts(Map<String, Object> map) {
		map.put("route", new Route());
		map.put("routeList", service.getAllRoutes());

		return "routesManager";
	}

	@RequestMapping(value = "/addRoute", method = RequestMethod.POST)
	public String addRoute(@ModelAttribute("route") Route route,
			BindingResult result) {

		service.save(route);

		return "redirect:/routesManager";
	}

	@RequestMapping("/removeRoute/{routeID}")
	public String removeRoute(@PathVariable("routeID") String routeID) {
		service.remove(routeID);
		return "redirect:/routesManager";
	}
}
