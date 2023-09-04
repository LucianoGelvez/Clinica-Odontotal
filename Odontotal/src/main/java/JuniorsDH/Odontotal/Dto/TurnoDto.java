package JuniorsDH.Odontotal.Dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class TurnoDto {
    private Long id;
    private LocalDate fecha;
    private LocalTime hora;
    private Long pacienteId;
    private String nombrePaciente;

    private String apellidoPaciente;
    private String documentoPaciente;
    private Long odontologoId;
    private String nombreOdontologo;

    private String apellidoOdontologo;
    private String especialidad;

    private String motivo;

    private String trabajoRealizado;


    public TurnoDto(Long id, LocalDate fecha, LocalTime hora, Long pacienteId, String nombrePaciente, String apellidoPaciente, String documentoPaciente, Long odontologoId, String nombreOdontologo, String apellidoOdontologo, String especialidad, String motivo, String trabajoRealizado) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.pacienteId = pacienteId;
        this.nombrePaciente = nombrePaciente;
        this.apellidoPaciente = apellidoPaciente;
        this.documentoPaciente = documentoPaciente;
        this.odontologoId = odontologoId;
        this.nombreOdontologo = nombreOdontologo;
        this.apellidoOdontologo = apellidoOdontologo;
        this.especialidad = especialidad;
        this.motivo = motivo;
        this.trabajoRealizado = trabajoRealizado;
    }

    public TurnoDto(LocalDate fecha, LocalTime hora, Long pacienteId, String nombrePaciente, String apellidoPaciente, String documentoPaciente, Long odontologoId, String nombreOdontologo, String apellidoOdontologo, String especialidad, String motivo, String trabajoRealizado) {
        this.fecha = fecha;
        this.hora = hora;
        this.pacienteId = pacienteId;
        this.nombrePaciente = nombrePaciente;
        this.apellidoPaciente = apellidoPaciente;
        this.documentoPaciente = documentoPaciente;
        this.odontologoId = odontologoId;
        this.nombreOdontologo = nombreOdontologo;
        this.apellidoOdontologo = apellidoOdontologo;
        this.especialidad = especialidad;
        this.motivo = motivo;
        this.trabajoRealizado = trabajoRealizado;
    }

    public TurnoDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public String getApellidoPaciente() {
        return apellidoPaciente;
    }

    public void setApellidoPaciente(String apellidoPaciente) {
        this.apellidoPaciente = apellidoPaciente;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public String getNombrePaciente() {
        return nombrePaciente;
    }

    public void setNombrePaciente(String nombrePaciente) {
        this.nombrePaciente = nombrePaciente;
    }

    public String getDocumentoPaciente() {
        return documentoPaciente;
    }

    public void setDocumentoPaciente(String documentoPaciente) {
        this.documentoPaciente = documentoPaciente;
    }

    public Long getOdontologoId() {
        return odontologoId;
    }

    public void setOdontologoId(Long odontologoId) {
        this.odontologoId = odontologoId;
    }

    public String getNombreOdontologo() {
        return nombreOdontologo;
    }

    public void setNombreOdontologo(String nombreOdontologo) {
        this.nombreOdontologo = nombreOdontologo;
    }
    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getTrabajoRealizado() {
        return trabajoRealizado;
    }

    public void setTrabajoRealizado(String trabajoRealizado) {
        this.trabajoRealizado = trabajoRealizado;
    }

    public String getApellidoOdontologo() {
        return apellidoOdontologo;
    }

    public void setApellidoOdontologo(String apellidoOdontologo) {
        this.apellidoOdontologo = apellidoOdontologo;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    @Override
    public String toString() {
        return "TurnoDto{" +
                "fecha=" + fecha +
                ", hora=" + hora +
                ", pacienteId=" + pacienteId +
                ", nombrePaciente='" + nombrePaciente + '\'' +
                ", apellidoPaciente='" + apellidoPaciente + '\'' +
                ", documentoPaciente='" + documentoPaciente + '\'' +
                ", odontologoId=" + odontologoId +
                ", nombreOdontologo='" + nombreOdontologo + '\'' +
                ", motivo='" + motivo + '\'' +
                ", trabajoRealizado='" + trabajoRealizado + '\'' +
                '}';
    }
}
