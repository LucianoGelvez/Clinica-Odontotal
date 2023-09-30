package JuniorsDH.Odontotal.Dto;

import java.time.LocalDate;

public class OdontologoDto extends UsuarioDto {

    private String matricula;
    private String especialidad;

    private String urlImagen;

    public OdontologoDto(Long id, String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, Long telefono, String calle, String numero, String localidad, String provincia, String rol, String matricula, String especialidad, String urlImagen) {
        super(id, nombre, apellido, email, password, documento, fechaNacimiento, genero, telefono, calle, numero, localidad, provincia, rol, urlImagen);
        this.matricula = matricula;
        this.especialidad = especialidad;
    }

    public OdontologoDto(String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, Long telefono, String calle, String numero, String localidad, String provincia, String rol, String matricula, String especialidad, String urlImagen) {
        super(nombre, apellido, email, password, documento, fechaNacimiento, genero, telefono, calle, numero, localidad, provincia, rol, urlImagen);
        this.matricula = matricula;
        this.especialidad = especialidad;
    }

    public OdontologoDto() {
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }


    @Override
    public String toString() {
        return "OdontologoDto{" +
                "matricula='" + matricula + '\'' +
                ", especialidad='" + especialidad + '\'' +
                '}';
    }
}