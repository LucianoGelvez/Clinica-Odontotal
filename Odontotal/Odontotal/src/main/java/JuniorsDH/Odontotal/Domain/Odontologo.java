package JuniorsDH.Odontotal.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table (name="odontologos")
public class Odontologo extends Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column
    private String matricula;

    @Enumerated(EnumType.STRING)
    private Especialidad especialidad;



    @OneToMany(mappedBy = "odontologo",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Turno> turnos= new HashSet<>();

    public Odontologo(Long id, String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, Domicilio domicilio, UsuarioRol rol, String matricula, Especialidad especialidad, String urlImagen) {
        super(id, email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, urlImagen, domicilio, rol);
        this.matricula = matricula;
        this.especialidad = especialidad;
    }

    public Odontologo(String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, Domicilio domicilio, UsuarioRol rol, String matricula, Especialidad especialidad, String urlImagen) {
        super(email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, urlImagen,domicilio, rol);
        this.matricula = matricula;
        this.especialidad = especialidad;
    }

    public Odontologo() {
    }

    @Override
    public Long getId() {
        return Id;
    }

    @Override
    public void setId(Long id) {
        Id = id;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }


    public Set<Turno> getTurnos() {
        return turnos;
    }

    public void setTurnos(Set<Turno> turnos) {
        this.turnos = turnos;
    }

    @Override
    public String toString() {
        return "Odontologo{" +
                "matricula='" + matricula + '\'' +
                ", especialidad=" + especialidad +
                '}';
    }
}