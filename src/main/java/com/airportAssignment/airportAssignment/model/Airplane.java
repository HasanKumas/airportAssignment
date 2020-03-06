package com.airportAssignment.airportAssignment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Airplane {
    @Id
    @GeneratedValue
    private Long id;

    private String airPlaneIdentity;
    private Integer fuelLevel;

    @ManyToOne
    private Airport airport;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAirPlaneIdentity() {
        return airPlaneIdentity;
    }

    public void setAirPlaneIdentity(String airPlaneIdentity) {
        this.airPlaneIdentity = airPlaneIdentity;
    }

    public Integer getFuelLevel() {
        return fuelLevel;
    }

    public void setFuelLevel(Integer fuelLevel) {
        this.fuelLevel = fuelLevel;
    }

    public Airport getAirport() {
        return airport;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }
}
