package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Domain.Protecista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProtecistaRepository extends JpaRepository<Protecista,Long> {
    Optional<Protecista> findByEmail(String email);
}
