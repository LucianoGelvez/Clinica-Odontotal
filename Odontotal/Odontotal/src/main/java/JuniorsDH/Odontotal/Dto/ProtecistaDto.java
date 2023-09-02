package JuniorsDH.Odontotal.Dto;

import JuniorsDH.Odontotal.Domain.Domicilio;
import JuniorsDH.Odontotal.Domain.UsuarioRol;

import javax.persistence.Column;
import java.time.LocalDate;

public class ProtecistaDto {
    private Long Id;

    private String nombre;

    private String apellido;

    private String matricula;

    private String especialidadProtecista;

    private Integer telefono;

    private String email;

    public ProtecistaDto(Long id, String nombre, String apellido, String matricula, String especialidadProtecista, Integer telefono, String email) {
        Id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.especialidadProtecista = especialidadProtecista;
        this.telefono = telefono;
        this.email = email;
    }

    public ProtecistaDto(String nombre, String apellido, String matricula, String especialidadProtecista, Integer telefono, String email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.especialidadProtecista = especialidadProtecista;
        this.telefono = telefono;
        this.email = email;
    }

    public ProtecistaDto() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
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

    public String getEspecialidadProtecista() {
        return especialidadProtecista;
    }

    public void setEspecialidadProtecista(String especialidadProtecista) {
        this.especialidadProtecista = especialidadProtecista;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "ProtecistaDto{" +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", matricula='" + matricula + '\'' +
                ", especialidadProtecista='" + especialidadProtecista + '\'' +
                ", telefono=" + telefono +
                ", email='" + email + '\'' +
                '}';
    }
}
