package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.*;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.UsuarioRepository;
import JuniorsDH.Odontotal.Repository.UsuarioRolRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Primary
public class UsuarioService implements UserDetailsService {

    private UsuarioRepository usuarioRepository;
    private UsuarioRolRepository usuarioRolRepository;


    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioRolRepository usuarioRolRepository){
        this.usuarioRepository = usuarioRepository;
        this.usuarioRolRepository = usuarioRolRepository;
    }

    private static final Logger logger = Logger.getLogger(UsuarioService.class);

    public UsuarioDto guardarUsuario(UsuarioDto usuarioDto) throws BadRequestException {
        if(usuarioDto.getNombre() != null && usuarioDto.getApellido() != null && usuarioDto.getEmail() != null &&
                usuarioDto.getPassword() != null) {

            BCryptPasswordEncoder cifradorContrasena= new BCryptPasswordEncoder();
            usuarioDto.setPassword(cifradorContrasena.encode(usuarioDto.getPassword()));

            Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuarioDto.getEmail());
            if (usuarioExistente.isPresent()) {
                throw new BadRequestException("Error. El email ya está registrado.");
            } else {
                Usuario usuario = usuarioDtoAUsuario(usuarioDto);
                logger.info("Guardando usuario: " + usuarioDto);
                return usuarioAUsuarioDto(usuarioRepository.save(usuario));
            }

        } else {
            logger.error("Error. No se pudo guardar el usuario. Alguno de los campos de registro del usuario está incompleto");
            throw new BadRequestException("Error. No se pudo guardar el usuario. Alguno de los campos de registro del usuario está incompleto");
        }
    }

    public UsuarioDto actualizarUsuario(UsuarioDto usuarioDto) throws ResourceNotFoundException {
        Usuario usuarioModificado;
        Optional<Usuario> usuarioaModificar= usuarioRepository.findById(usuarioDto.getId());
        if (usuarioaModificar.isPresent()){
            if(usuarioDto.getPassword() == null)
            {
                usuarioDto.setPassword(usuarioaModificar.get().getPassword());
            }
            usuarioModificado= usuarioRepository.save(usuarioDtoAUsuario(usuarioDto));

        }else {
            throw new ResourceNotFoundException("Error. No se encontró el usuario para actualizar");
        }
        return usuarioAUsuarioDto(usuarioModificado);
    }

    public Optional<UsuarioDto> buscarUsuario(Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuarioABuscar=usuarioRepository.findById(id);
        if (usuarioABuscar.isPresent()){
            return  Optional.of(usuarioAUsuarioDto(usuarioABuscar.get()));
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el usuario buscado");
        }
    }

    public void eliminarUsuario(Long id) throws ResourceNotFoundException {
        Optional<UsuarioDto> usuarioAEliminar= buscarUsuario(id);
        if(usuarioAEliminar.isPresent()){
            usuarioRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el usuario registrado con el id:  "+ id);
        }
    }

    public List<UsuarioDto> buscarTodos() throws ResourceNotFoundException {
        List<Usuario> buscarTodosUsuarios = usuarioRepository.findAll();
        List<UsuarioDto> todosUsuariosDto = new ArrayList<>();
        if (buscarTodosUsuarios.isEmpty()){
            throw new ResourceNotFoundException("Error. No se agregaron usuarios, la lista se encuentra vacia");
        }else {
            for ( Usuario usuario : buscarTodosUsuarios) {
                todosUsuariosDto.add(usuarioAUsuarioDto(usuario));
            }
        }
        return todosUsuariosDto;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Buscando usuario con email: " + email);
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if (usuario.isPresent()){
            logger.info("Usuario encontrado: " + usuario.get());
            return usuario.get();
        }
        else{
            logger.error("Error. Usuario no encontrado en la BD");
            throw new UsernameNotFoundException("Error. Usuario no encontrado en la BD");
        }
    }


    public Optional<UsuarioDto> getUserByEmail(String email) throws ResourceNotFoundException {
        Optional<Usuario> userSearch = usuarioRepository.findByEmail(email);
        if (userSearch.isPresent()) {
            return Optional.of(usuarioAUsuarioDto(userSearch.get()));
        } else {
            throw new ResourceNotFoundException("Usuario con " + email + " no encontrado");
        }
    }

    private UsuarioDto usuarioAUsuarioDto(Usuario usuario){
        UsuarioDto respuesta= new UsuarioDto();
        respuesta.setId(usuario.getId());
        respuesta.setNombre(usuario.getNombre());
        respuesta.setApellido(usuario.getApellido());
        respuesta.setEmail(usuario.getEmail());
        respuesta.setDocumento(usuario.getDocumento());
        respuesta.setFechaNacimiento(usuario.getFechaNacimiento());
        respuesta.setGenero(usuario.getGenero().name());
        respuesta.setTelefono(usuario.getTelefono());
        respuesta.setCalle(usuario.getDomicilio().getCalle());
        respuesta.setNumero(usuario.getDomicilio().getNumero());
        respuesta.setLocalidad(usuario.getDomicilio().getLocalidad());
        respuesta.setProvincia(usuario.getDomicilio().getProvincia());
        respuesta.setRol(usuario.getRol().getRol());
        respuesta.setUrlImagen(usuario.getUrlImagen());
        return  respuesta;
    }

    private Usuario usuarioDtoAUsuario(UsuarioDto usuarioDto){
        Usuario respuesta= new Usuario();
        respuesta.setId(usuarioDto.getId());
        respuesta.setNombre(usuarioDto.getNombre());
        respuesta.setApellido(usuarioDto.getApellido());
        respuesta.setEmail(usuarioDto.getEmail());
        respuesta.setPassword(usuarioDto.getPassword());
        respuesta.setDocumento(usuarioDto.getDocumento());
        respuesta.setFechaNacimiento(usuarioDto.getFechaNacimiento());
        respuesta.setGenero(Genero.valueOf(usuarioDto.getGenero()));
        respuesta.setTelefono(usuarioDto.getTelefono());
        Domicilio domicilio = new Domicilio(usuarioDto.getCalle(),usuarioDto.getNumero(),usuarioDto.getLocalidad(),usuarioDto.getProvincia());
        respuesta.setDomicilio(domicilio);
        UsuarioRol rol = usuarioRolRepository.findByRol(usuarioDto.getRol()).get();
        respuesta.setRol(rol);
        respuesta.setUrlImagen(usuarioDto.getUrlImagen());
        return  respuesta;
    }


    public void uploadImageProfile(MultipartFile file, Long id) {
        Usuario user = usuarioRepository.findById(id).get();
        String bucketName = "odontotal-images";
        String uniqueFilename = "profile/" + id + ".png";
        String s3Url = "https://" + bucketName + ".s3." + ".amazonaws.com/" + uniqueFilename;

        try {
            byte[] bytes = file.getBytes();
            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(bytes.length);
            metadata.setContentType("profile/png");

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFilename, inputStream, metadata);
            s3Client.putObject(putObjectRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        user.setUrlImagen(s3Url);
        usuarioRepository.save(user);
    }


    public UsuarioDto deleteImage(Long id)
    {
        Usuario user = usuarioRepository.findById(id).get();
        user.setUrlImagen(null);
        return usuarioAUsuarioDto(usuarioRepository.save(user));
    }


}
