package com.capgemini.sechallenge.airport.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String location;

    @OneToMany(mappedBy="airport", cascade= CascadeType.ALL)
    private List<Airplane> planes;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Airplane> getPlanes() {
        return planes;
    }

    public void setPlanes(List<Airplane> planes) {
        this.planes = planes;
    }
}
