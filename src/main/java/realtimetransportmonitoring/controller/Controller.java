package realtimetransportmonitoring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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
}
