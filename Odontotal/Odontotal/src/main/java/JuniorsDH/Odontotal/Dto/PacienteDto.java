package JuniorsDH.Odontotal.Dto;

import JuniorsDH.Odontotal.Domain.Domicilio;

public class PacienteDto {

    private Long idPaciente;
    private String apellido;
    private String nombre;
    private Domicilio domicilio;
    private String documento;

    public PacienteDto(Long idPaciente, String apellido, String nombre, Domicilio domicilio, String documento) {
        this.idPaciente = idPaciente;
        this.apellido = apellido;
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.documento = documento;
    }

    public PacienteDto(String apellido, String nombre, Domicilio domicilio, String documento) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.documento = documento;
    }

    public PacienteDto() {
    }


    public Long getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Long idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Domicilio getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(Domicilio domicilio) {
        this.domicilio = domicilio;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    @Override
    public String toString() {
        return "PacienteDto{" +
                "idPaciente=" + idPaciente +
                ", apellido='" + apellido + '\'' +
                ", nombre='" + nombre + '\'' +
                ", domicilio=" + domicilio +
                ", documento='" + documento + '\'' +
                '}';
    }
}
