package com.capgemini.sechallenge.airport.controller;

import com.capgemini.sechallenge.airport.model.Airplane;
import com.capgemini.sechallenge.airport.model.Airport;
import com.capgemini.sechallenge.airport.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/airport/")
public class AirportController {

    @Autowired
    private AirportRepository airportRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Airport> getAllAirports(){
        Iterable<Airport> airports = this.airportRepository.findAll();

        Iterable<Airport> tempAirports = airports;
        for(Airport airport : tempAirports){
            if(airport.getPlanes()!=null){
                for(Airplane plane : airport.getPlanes()){

                    plane.setAirport(null);
                }

            }
        }


        return tempAirports;
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Airport createAirport(@RequestBody Airport airport){
        //validation
        this.airportRepository.save(airport);
        return airport;
    }

    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public Airport updateAirport(@RequestBody Airport airport){
        //validation
        this.airportRepository.save(airport);
        return airport;
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    public void deleteAirport(@PathVariable long id) {
        this.airportRepository.delete(id);
    }


}
