package it.css;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Home redirection to swagger api documentation
 */
@Controller
public class HomeController {

    private static final String CLASSNAME = HomeController.class.getSimpleName();

    @GetMapping(value = "/")
    public String index() {
        return "redirect:swagger-ui.html";
    }
}
