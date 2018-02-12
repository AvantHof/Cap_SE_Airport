package com.capgemini.sechallenge.airport.controller;

import com.capgemini.sechallenge.airport.model.Airplane;
import com.capgemini.sechallenge.airport.model.Airport;
import com.capgemini.sechallenge.airport.repository.AirplaneRepository;
import com.capgemini.sechallenge.airport.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/airplane/")
public class AirplaneController {

    @Autowired
    private AirplaneRepository airplaneRepository;


    @Autowired
    private AirportRepository airportRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Airplane> getAllAirplanes(){
        Iterable<Airplane> planes = airplaneRepository.findAll();
        for(Airplane airplane : planes ){
            if(airplane.getAirport()!=null){
                airplane.getAirport().setPlanes(new ArrayList<Airplane>());

            }
        }
        return planes;
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Airplane createAirplane(@RequestBody Airplane airplane){
        //validation

        if (((List) airplaneRepository.findAll()).contains(airplane)) {
            return airplane;
        }

        this.airplaneRepository.save(airplane);
//        Airport airport = this.airportRepository.findOne(airplane.getId());
//        airport.getPlanes().add(airplane);
//        this.airportRepository.save(airport);

        return airplane;
    }

    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public Airplane updateAirplane(@RequestBody Airplane airplane){
        //validation
        this.airplaneRepository.save(airplane);
        return airplane;
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    public void deleteAirplane(@PathVariable long id) {
        this.airplaneRepository.delete(id);
    }

}
