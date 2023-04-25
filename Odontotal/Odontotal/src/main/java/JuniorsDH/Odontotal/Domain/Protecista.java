package JuniorsDH.Odontotal.Domain;

import javax.persistence.*;

@Entity
@Table(name = "protecistas")
public class Protecista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;
    @Column
    private String apellido;
    @Column
    private String matricula;
    @Column
    private String email;
    @Column
    private Integer telefono;
    @Column
    private String especialidadProtecista;


    public Protecista(Long id, String nombre, String apellido, String matricula, String email, Integer telefono, String especialidadProtecista) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.email = email;
        this.telefono = telefono;
        this.especialidadProtecista = especialidadProtecista;
    }


    public Protecista(String nombre, String apellido, String matricula, String email, Integer telefono, String especialidadProtecista) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.email = email;
        this.telefono = telefono;
        this.especialidadProtecista = especialidadProtecista;
    }

    public Protecista() {
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
        return this.apellido;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getEspecialidadProtecista() {
        return especialidadProtecista;
    }

    public void setEspecialidadProtecista(String especialidadProtecista) {
        this.especialidadProtecista = especialidadProtecista;
    }

    @Override
    public String toString() {
        return "Protecista{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", matricula='" + matricula + '\'' +
                ", email='" + email + '\'' +
                ", telefono=" + telefono +
                ", especialidadProtecista='" + especialidadProtecista + '\'' +
                '}';
    }
}
