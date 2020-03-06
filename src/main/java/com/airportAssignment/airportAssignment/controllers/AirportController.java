package com.airportAssignment.airportAssignment.controllers;

import com.airportAssignment.airportAssignment.model.Airplane;
import com.airportAssignment.airportAssignment.model.Airport;
import com.airportAssignment.airportAssignment.repositories.AirplaneRepository;
import com.airportAssignment.airportAssignment.repositories.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/airports")
public class AirportController {
    @Autowired
    private AirportRepository airportRepository;

    @GetMapping
    public List<Airport> getAirports (){
        return airportRepository.findAll();
    }

    @PostMapping
    public void addAirport(@RequestBody Airport airport) {
        airportRepository.save(airport);
    }

    @DeleteMapping("/{id}")
    void deleteAirport(@PathVariable Long id) {
        airportRepository.deleteById(id);
    }
}
