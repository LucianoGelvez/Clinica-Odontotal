package JuniorsDH.Odontotal.Domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table (name="odontologos")
public class Odontologo {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;
    @Column
    private String apellido;
    @Column
    private String matricula;

@Enumerated(EnumType.STRING)
private Especialidad especialidad;






    @OneToMany(mappedBy = "odontologo")
    private Set<Turno> turnos= new HashSet<>();


    public Odontologo(Long id, String nombre, String apellido, String matricula, Especialidad especialidad, Set<Turno> turnos) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.especialidad = especialidad;
        this.turnos = turnos;
    }

    public Odontologo(String nombre, String apellido, String matricula, Especialidad especialidad, Set<Turno> turnos) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.especialidad = especialidad;
        this.turnos = turnos;
    }

    public Odontologo() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
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
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", matricula='" + matricula + '\'' +
                ", especialidad=" + especialidad +
                ", turnos=" + turnos +
                '}';
    }
}
