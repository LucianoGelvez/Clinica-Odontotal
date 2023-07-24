package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OdontologoRepository extends JpaRepository<Odontologo,Long> {
    Optional<Odontologo> findByEmail(String email);

}
