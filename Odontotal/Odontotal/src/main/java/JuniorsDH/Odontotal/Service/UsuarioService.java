package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.Usuario;
import JuniorsDH.Odontotal.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario guardarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarUsuario(Long id){
        return usuarioRepository.findById(id);
    }

    public void eliminarUsuario(Long id){
        usuarioRepository.deleteById(id);
    }

    public List<Usuario> buscarTodos(){
        return usuarioRepository.findAll();
    }

}
