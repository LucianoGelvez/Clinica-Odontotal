package JuniorsDH.Odontotal.Dto;

import java.time.LocalDate;
import java.util.Date;

public class PacienteDto extends UsuarioDto{

    private Boolean validado;

    private Date fechaCreacion;

    public PacienteDto(Long id, String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, Long telefono, String calle, String numero, String localidad, String provincia, String rol, String urlImagen, Boolean validado, Date fechaCreacion) {
        super(id, nombre, apellido, email, password, documento, fechaNacimiento, genero, telefono, calle, numero, localidad, provincia, rol, urlImagen);
        this.validado = validado;
        this.fechaCreacion = fechaCreacion;
    }

    public PacienteDto(String nombre, String apellido, String email, String password, String documento, LocalDate fechaNacimiento, String genero, Long telefono, String calle, String numero, String localidad, String provincia, String rol, String urlImagen, Boolean validado, Date fechaCreacion) {
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

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
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
