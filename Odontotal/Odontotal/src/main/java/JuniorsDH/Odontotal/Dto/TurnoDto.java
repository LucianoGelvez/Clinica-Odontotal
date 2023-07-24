package JuniorsDH.Odontotal.Dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class TurnoDto {
    private Long id;
    private LocalDate fecha;
    private LocalTime hora;
    private Long pacienteId;
    private String nombrePaciente;
    private String documentoPaciente;
    private Long odontologoId;
    private String nombreOdontologo;

    public TurnoDto(Long id, LocalDate fecha, LocalTime hora, Long pacienteId, String nombrePaciente, String documentoPaciente, Long odontologoId, String nombreOdontologo) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.pacienteId = pacienteId;
        this.nombrePaciente = nombrePaciente;
        this.documentoPaciente = documentoPaciente;
        this.odontologoId = odontologoId;
        this.nombreOdontologo = nombreOdontologo;
    }

    public TurnoDto(LocalDate fecha, LocalTime hora, Long pacienteId, String nombrePaciente, String documentoPaciente, Long odontologoId, String nombreOdontologo) {
        this.fecha = fecha;
        this.hora = hora;
        this.pacienteId = pacienteId;
        this.nombrePaciente = nombrePaciente;
        this.documentoPaciente = documentoPaciente;
        this.odontologoId = odontologoId;
        this.nombreOdontologo = nombreOdontologo;
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

    @Override
    public String toString() {
        return "TurnoDto{" +
                "id=" + id +
                ", fecha=" + fecha +
                ", hora=" + hora +
                ", pacienteId=" + pacienteId +
                ", nombrePaciente='" + nombrePaciente + '\'' +
                ", documentoPaciente='" + documentoPaciente + '\'' +
                ", odontologoId=" + odontologoId +
                ", nombreOdontologo='" + nombreOdontologo + '\'' +
                '}';
    }
}
