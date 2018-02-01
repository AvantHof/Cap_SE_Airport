package com.capgemini.sechallenge.airport.repository;

import com.capgemini.sechallenge.airport.model.Airport;
import org.springframework.data.repository.CrudRepository;

public interface AirportRepository extends CrudRepository<Airport, Long> {
}
