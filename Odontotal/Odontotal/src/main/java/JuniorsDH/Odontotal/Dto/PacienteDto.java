package JuniorsDH.Odontotal.Dto;

public class PacienteDto {

    private Long idPaciente;
    private String apellido;
    private String nombre;
    private Long idDomicilio;
    private String provincia;


    public PacienteDto(Long idPaciente, String apellido, String nombre, Long idDomicilio, String provincia) {
        this.idPaciente = idPaciente;
        this.apellido = apellido;
        this.nombre = nombre;
        this.idDomicilio = idDomicilio;
        this.provincia = provincia;
    }


    public PacienteDto(String apellido, String nombre, Long idDomicilio, String provincia) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.idDomicilio = idDomicilio;
        this.provincia = provincia;
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

    public Long getIdDomicilio() {
        return idDomicilio;
    }

    public void setIdDomicilio(Long idDomicilio) {
        this.idDomicilio = idDomicilio;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    @Override
    public String toString() {
        return "PacienteDto{" +
                "idPaciente=" + idPaciente +
                ", apellido='" + apellido + '\'' +
                ", nombre='" + nombre + '\'' +
                ", idDomicilio=" + idDomicilio +
                ", provincia='" + provincia + '\'' +
                '}';
    }
}
