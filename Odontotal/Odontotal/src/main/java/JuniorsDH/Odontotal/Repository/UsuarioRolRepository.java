package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Usuario;
import JuniorsDH.Odontotal.Domain.UsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRolRepository extends JpaRepository<UsuarioRol,Long> {
    Optional<UsuarioRol> findByRol(String rol);
}
