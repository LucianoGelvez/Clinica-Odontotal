package JuniorsDH.Odontotal.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="pacientes")
public class Paciente extends Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // O GenerationType.SEQUENCE
    private Long Id;

    @OneToMany(mappedBy = "paciente",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Turno> turnos= new HashSet<>();

    @Column
    private String historial;

    @Column
    private Boolean validado;

    @Column
    private LocalDate fechaCreacion;

    public Paciente(Long id, String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, Domicilio domicilio, UsuarioRol rol, String historial, Boolean validado, LocalDate fechaCreacion) {
        super(id, email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, domicilio, rol);
        this.historial = historial;
        this.validado = validado;
        this.fechaCreacion = fechaCreacion;
    }

    public Paciente(String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, Domicilio domicilio, UsuarioRol rol, String historial, Boolean validado, LocalDate fechaCreacion) {
        super(email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, domicilio, rol);
        this.historial = historial;
        this.validado = validado;
        this.fechaCreacion = fechaCreacion;
    }

    public Paciente() {
    }

    public Set<Turno> getTurnos() {
        return turnos;
    }

    public void setTurnos(Set<Turno> turnos) {
        this.turnos = turnos;
    }

    public String getHistorial() {
        return historial;
    }

    public void setHistorial(String historial) {
        this.historial = historial;
    }

    public Boolean getValidado() {
        return validado;
    }

    public void setValidado(Boolean validado) {
        this.validado = validado;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    @Override
    public String toString() {
        return "Paciente{" +
                "turnos=" + turnos +
                ", historial='" + historial + '\'' +
                ", validado=" + validado +
                ", fechaCreacion=" + fechaCreacion +
                '}';
    }
}
