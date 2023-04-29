package JuniorsDH.Odontotal.Repository;


import JuniorsDH.Odontotal.Domain.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;




@Repository
public interface OdontologoRepository extends JpaRepository<Odontologo,Long> {



}
