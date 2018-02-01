package com.capgemini.sechallenge.airport.repository;

import com.capgemini.sechallenge.airport.model.Airplane;
import org.springframework.data.repository.CrudRepository;

public interface AirplaneRepository extends CrudRepository<Airplane, Long> {
}
