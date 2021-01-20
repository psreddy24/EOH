package co.za.eoh.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_number")
    private String employeeNumber;

    @Column(name = "employed_date")
    private Instant employedDate;

    @Column(name = "terminated_date")
    private Instant terminatedDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public Employee employeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
        return this;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public Instant getEmployedDate() {
        return employedDate;
    }

    public Employee employedDate(Instant employedDate) {
        this.employedDate = employedDate;
        return this;
    }

    public void setEmployedDate(Instant employedDate) {
        this.employedDate = employedDate;
    }

    public Instant getTerminatedDate() {
        return terminatedDate;
    }

    public Employee terminatedDate(Instant terminatedDate) {
        this.terminatedDate = terminatedDate;
        return this;
    }

    public void setTerminatedDate(Instant terminatedDate) {
        this.terminatedDate = terminatedDate;
    }

    public Person getPerson() {
        return person;
    }

    public Employee person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", employeeNumber='" + getEmployeeNumber() + "'" +
            ", employedDate='" + getEmployedDate() + "'" +
            ", terminatedDate='" + getTerminatedDate() + "'" +
            "}";
    }
}
