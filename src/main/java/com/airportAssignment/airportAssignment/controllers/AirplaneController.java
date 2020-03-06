package com.airportAssignment.airportAssignment.controllers;

import com.airportAssignment.airportAssignment.model.Airplane;
import com.airportAssignment.airportAssignment.repositories.AirplaneRepository;
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
        public void updateAfterFly (@PathVariable("id") Long id,  @RequestParam("destination") String destination) throws NotFoundException {
            Airplane airplane = airplaneRepository.getOne(id);
//            airplane.setAirport(destination);
            airplane.setFuelLevel(airplane.getFuelLevel()-2);
            airplaneRepository.save(airplane);
        }

        @PutMapping("/refuel/{id}")
        public void refuel (@PathVariable("id") Long id) throws NotFoundException {
            Airplane airplane = airplaneRepository.getOne(id);
            airplane.setFuelLevel(5);

            airplaneRepository.save(airplane);
        }

}
