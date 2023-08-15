package JuniorsDH.Odontotal.Domain;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="turnos")
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id",referencedColumnName = "id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "odontologos_id" , referencedColumnName = "id")
    private Odontologo odontologo;

    @Column
    private LocalDate fecha;

    @Column
    private LocalTime hora;

    @Column
    private String reasonForTurn;

    @Column
    private String whatWasDone;

    public Turno(Long id, Paciente paciente, Odontologo odontologo, LocalDate fecha, LocalTime hora, String reasonForTurn, String whatWasDone) {
        this.id = id;
        this.paciente = paciente;
        this.odontologo = odontologo;
        this.fecha = fecha;
        this.hora = hora;
        this.reasonForTurn = reasonForTurn;
        this.whatWasDone = whatWasDone;
    }
    public Turno(Paciente paciente, Odontologo odontologo, LocalDate fecha, LocalTime hora, String reasonForTurn, String whatWasDone) {
        this.paciente = paciente;
        this.odontologo = odontologo;
        this.fecha = fecha;
        this.hora = hora;
        this.reasonForTurn = reasonForTurn;
        this.whatWasDone = whatWasDone;
    }

    public Turno() {
    }

    public Turno(Odontologo odontologo, Paciente paciente, LocalDate of) {
    }

    public String getReasonForTurn() {
        return reasonForTurn;
    }

    public void setReasonForTurn(String reasonForTurn) {
        this.reasonForTurn = reasonForTurn;
    }

    public String getWhatWasDone() {
        return whatWasDone;
    }

    public void setWhatWasDone(String whatWasDone) {
        this.whatWasDone = whatWasDone;
    }

    public LocalTime sumarHorarioMas30Minutos(){
        return hora.minusMinutes(30);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
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

    @Override
    public String toString() {
        return "Turno{" +
                "id=" + id +
                ", paciente=" + paciente +
                ", odontologo=" + odontologo +
                ", fecha=" + fecha +
                ", hora=" + hora +
                '}';
    }
}
