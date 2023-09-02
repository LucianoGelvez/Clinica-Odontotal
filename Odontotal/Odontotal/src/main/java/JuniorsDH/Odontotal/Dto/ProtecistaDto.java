package JuniorsDH.Odontotal.Dto;

import JuniorsDH.Odontotal.Domain.Domicilio;
import JuniorsDH.Odontotal.Domain.UsuarioRol;

import java.time.LocalDate;

public class ProtecistaDto extends  UsuarioDto{
    private String matricula;
    private String especialidadProtecista;

    public ProtecistaDto(Long id, String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, int telefono, String calle, String numero, String localidad, String provincia, String rol, String urlImagen, String matricula, String especialidadProtecista) {
        super(id, nombre, apellido, email, password, documento, fechaNacimiento, genero, telefono, calle, numero, localidad, provincia, rol, urlImagen);
        this.matricula = matricula;
        this.especialidadProtecista = especialidadProtecista;
    }

    public ProtecistaDto(String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, int telefono, String calle, String numero, String localidad, String provincia, String rol, String urlImagen, String matricula, String especialidadProtecista) {
        super(nombre, apellido, email, password, documento, fechaNacimiento, genero, telefono, calle, numero, localidad, provincia, rol, urlImagen);
        this.matricula = matricula;
        this.especialidadProtecista = especialidadProtecista;
    }

    public ProtecistaDto() {
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
        return "ProtecistaDto{" +
                "matricula='" + matricula + '\'' +
                ", especialidadProtecista='" + especialidadProtecista + '\'' +
                '}';
    }
}
