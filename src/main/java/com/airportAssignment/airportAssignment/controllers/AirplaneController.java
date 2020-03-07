package com.airportAssignment.airportAssignment.controllers;

import com.airportAssignment.airportAssignment.model.Airplane;
import com.airportAssignment.airportAssignment.model.Airport;
import com.airportAssignment.airportAssignment.repositories.AirplaneRepository;
import com.airportAssignment.airportAssignment.repositories.AirportRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/airplanes")
public class AirplaneController {
    @Autowired
    private AirplaneRepository airplaneRepository;
    @Autowired
    private AirportRepository airportRepository;

    @GetMapping
    public List<Airplane> getAirplanes (){
        return airplaneRepository.findAll();
    }

    @PostMapping
    public void addAirplane(@RequestBody Airplane airplane) {
        airplaneRepository.save(airplane);
    }

    @DeleteMapping("/{id}")
    void deleteAirplane(@PathVariable Long id) {
        airplaneRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateAirplane(@PathVariable("id") Long id,  @RequestBody Airplane airplane) throws NotFoundException {
        Optional<Airplane> originalAirplane =airplaneRepository.findById(id);
        if(!originalAirplane.isPresent()) {
            throw new NotFoundException("Airplane not found");
        }
        airplane.setId(id);

        airplaneRepository.save(airplane);
    }

    @PutMapping("/afterFly/{id}")
    public String updateAfterFly (@PathVariable("id") Long id, @RequestParam("airportId") Long airportId) throws NotFoundException {
        Airplane airplane = airplaneRepository.getOne(id);
        String message="";

        for(Airport airport: airportRepository.findAll()){
          if(airport.getId().equals(airportId)&&airplane.getFuelLevel()>=2) {
              if (airplane.getAirport().equals(airport)) {
                  message = "The airplane is already at the destination airport, flight cannot be executed..";
                  break;
              } else {
                  airplane.setAirport(airport);
                  message = "The airplane arrived to " + airport.getName();
                  airplane.setFuelLevel(airplane.getFuelLevel()-2);
                  break;
              }
          }else{
              message = "Please refuel the airplane. There is not enough fuel...";
          }
        }
        airplaneRepository.save(airplane);
        return message;
    }

    @PutMapping("/refuel/{id}")
    public String refuel (@PathVariable("id") Long id) throws NotFoundException {
        String message="";
        Airplane airplane = airplaneRepository.getOne(id);
        if(airplane.getFuelLevel()==5){
            message = "The airplane is already full, cannot be refueled";
        }else {
            airplane.setFuelLevel(5);
            message = "The airplane has refueled..";
            airplaneRepository.save(airplane);
        }
        return message;
    }

}
