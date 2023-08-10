package JuniorsDH.Odontotal.Dto;

import JuniorsDH.Odontotal.Domain.Domicilio;
import JuniorsDH.Odontotal.Domain.UsuarioRol;

import javax.persistence.Column;
import java.time.LocalDate;
import java.util.Date;

public class PacienteDto extends UsuarioDto{

    private Boolean validado;

    private LocalDate fechaCreacion;

    public PacienteDto(Long id, String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, int telefono, String calle, String numero, String localidad, String provincia, String rol, String urlImagen, Boolean validado, LocalDate fechaCreacion) {
        super(id, nombre, apellido, email, password, documento, fechaNacimiento, genero, telefono, calle, numero, localidad, provincia, rol, urlImagen);
        this.validado = validado;
        this.fechaCreacion = fechaCreacion;
    }

    public PacienteDto(String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, int telefono, String calle, String numero, String localidad, String provincia, String rol, String urlImagen, Boolean validado, LocalDate fechaCreacion) {
        super(nombre, apellido, email, password, documento, fechaNacimiento, genero, telefono, calle, numero, localidad, provincia, rol, urlImagen);
        this.validado = validado;
        this.fechaCreacion = fechaCreacion;
    }

    public PacienteDto() {
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
        return "PacienteDto{" +
                ", validado=" + validado +
                ", fechaCreacion=" + fechaCreacion +
                '}';
    }
}
