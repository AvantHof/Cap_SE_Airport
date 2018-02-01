package com.capgemini.sechallenge.airport.controller;

import com.capgemini.sechallenge.airport.model.Airplane;
import com.capgemini.sechallenge.airport.repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/airplane/")
public class AirplaneController {

    @Autowired
    private AirplaneRepository airplaneRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Airplane> getAllAirplanes(){
        return this.airplaneRepository.findAll();
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Airplane createAirplane(@RequestBody Airplane airplane){
        //validation
        this.airplaneRepository.save(airplane);
        System.out.println(airplane.getName() + " has been added to the database.");
        return airplane;
    }

    //update

    //delete

}
