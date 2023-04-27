package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface PacienteRepository extends JpaRepository<Paciente,Long> {
}
