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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @OneToMany(mappedBy = "paciente",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Turno> turnos= new HashSet<>();

    @Column
    private Boolean validado;

    @Column
    private LocalDate fechaCreacion;

    public Paciente(Long id, String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, String urlImagen, Domicilio domicilio, UsuarioRol rol, Long id1, Boolean validado, LocalDate fechaCreacion) {
        super(id, email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, urlImagen, domicilio, rol);
        this.validado = validado;
        this.fechaCreacion = fechaCreacion;
    }

    public Paciente(String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, String urlImagen, Domicilio domicilio, UsuarioRol rol, Boolean validado, LocalDate fechaCreacion) {
        super(email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, urlImagen, domicilio, rol);
        this.validado = validado;
        this.fechaCreacion = fechaCreacion;
    }

    public Paciente() {
    }

    @Override
    public Long getId() {
        return Id;
    }

    @Override
    public void setId(Long id) {
        Id = id;
    }

    public Set<Turno> getTurnos() {
        return turnos;
    }

    public void setTurnos(Set<Turno> turnos) {
        this.turnos = turnos;
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
                ", validado=" + validado +
                ", fechaCreacion=" + fechaCreacion +
                '}';
    }
}
