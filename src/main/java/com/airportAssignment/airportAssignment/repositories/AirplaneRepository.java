package com.airportAssignment.airportAssignment.repositories;

import com.airportAssignment.airportAssignment.model.Airplane;
import com.airportAssignment.airportAssignment.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirplaneRepository extends JpaRepository<Airplane, Long> {
}
