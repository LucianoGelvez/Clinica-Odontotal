package JuniorsDH.Odontotal.Domain;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "protecistas")
public class Protecista extends Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    @Column
    private String matricula;
    @Column
    private String especialidadProtecista;

    public Protecista(Long id, String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, String urlImagen, Domicilio domicilio, UsuarioRol rol, Long id1, String matricula, String especialidadProtecista) {
        super(id, email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, urlImagen, domicilio, rol);
        this.matricula = matricula;
        this.especialidadProtecista = especialidadProtecista;
    }

    public Protecista(String email, String password, String nombre, String apellido, String documento, LocalDate fechaNacimiento, Genero genero, int telefono, String urlImagen, Domicilio domicilio, UsuarioRol rol, String matricula, String especialidadProtecista) {
        super(email, password, nombre, apellido, documento, fechaNacimiento, genero, telefono, urlImagen, domicilio, rol);
        this.matricula = matricula;
        this.especialidadProtecista = especialidadProtecista;
    }

    public Protecista() {
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
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
                ", matricula='" + matricula + '\'' +
                ", especialidadProtecista='" + especialidadProtecista + '\'' +
                '}';
    }
}
