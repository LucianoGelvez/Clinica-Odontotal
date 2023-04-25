package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Protecista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProtecistaRepository extends JpaRepository<Protecista,Long> {
}
