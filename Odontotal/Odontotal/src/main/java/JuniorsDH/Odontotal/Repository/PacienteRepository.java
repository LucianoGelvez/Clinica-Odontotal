package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente,Long> {
    Optional<Paciente> findByEmail(String email);
}
