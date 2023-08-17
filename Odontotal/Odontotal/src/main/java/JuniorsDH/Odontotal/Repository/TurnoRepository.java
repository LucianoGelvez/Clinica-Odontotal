package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Domain.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TurnoRepository extends JpaRepository<Turno,Long> {
    boolean existsByFechaAndHoraAndOdontologo(LocalDate fecha, LocalTime hora, Odontologo odontologo);
    boolean existsByFechaAndHoraAndPaciente(LocalDate fecha, LocalTime hora, Paciente paciente);
    @Query(value = "SELECT * FROM turnos WHERE odontologos_id = ?1", nativeQuery = true)
    List<Turno> findByOdontologoId(Long odontologoId);

    @Query(value = "SELECT * FROM turnos WHERE paciente_id = ?1", nativeQuery = true)
    List<Turno> findByPacienteId(Long odontologoId);
}
