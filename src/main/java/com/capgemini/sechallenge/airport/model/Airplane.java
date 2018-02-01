package com.capgemini.sechallenge.airport.model;

import jdk.nashorn.internal.ir.annotations.Ignore;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;

@Entity
public class Airplane {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private int gas;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="airport_id")
    private Airport airport;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGas() {
        return gas;
    }

    public void setGas(int gas) {
        this.gas = gas;
    }

    public Airport getAirport() {
        return airport;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }
}
