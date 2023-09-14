package com.eap_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @RequestMapping("/hello")
    public String helloController() {
        return "<h1>Hello World</h1>";
    }
     @RequestMapping("/goodbye")
    public String goodbyeController() {
        return "<h1>Goodbye World</h1>";
    }
    @RequestMapping("/blog")
    public String blog(){
        return "<h1>Future Updates</h1><p>Future updates for features for the main page.</p><ul><li>Add a map API, DUHH!!!</li></ul>";
    }
  
}