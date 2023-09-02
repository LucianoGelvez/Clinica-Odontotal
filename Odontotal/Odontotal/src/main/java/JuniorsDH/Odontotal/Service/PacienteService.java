package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.*;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.PacienteRepository;
import JuniorsDH.Odontotal.Repository.UsuarioRolRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PacienteService {
    private PacienteRepository pacienteRepository;
    private UsuarioRolRepository usuarioRolRepository;

    @Autowired
    private AmazonS3 s3Client;
    @Autowired
    public PacienteService(PacienteRepository pacienteRepository, UsuarioRolRepository usuarioRolRepository) {
        this.pacienteRepository = pacienteRepository;
        this.usuarioRolRepository = usuarioRolRepository;
    }
    private static final Logger logger = Logger.getLogger(PacienteService.class);

    public PacienteDto agregarPaciente (PacienteDto pacienteDto) throws BadRequestException {
        if(pacienteDto.getNombre() != null && pacienteDto.getApellido() != null && pacienteDto.getEmail() != null &&
                pacienteDto.getPassword() != null) {

            BCryptPasswordEncoder cifradorContrasena= new BCryptPasswordEncoder();
            pacienteDto.setPassword(cifradorContrasena.encode(pacienteDto.getPassword()));

            Optional<Paciente> pacienteExistente = pacienteRepository.findByEmail(pacienteDto.getEmail());
            if (pacienteExistente.isPresent()) {
                throw new BadRequestException("Error. El email ya está registrado.");
            } else {
                Paciente paciente = pacienteDtoAPaciente(pacienteDto);
                logger.info("Guardando paciente: " + pacienteDto);
                return pacienteApacienteDTO(pacienteRepository.save(paciente));
            }

        } else {
            logger.error("Error. No se pudo guardar el paciente. Alguno de los campos de registro del usuario está incompleto");
            throw new BadRequestException("Error. No se pudo guardar el paciente. Alguno de los campos de registro del usuario está incompleto");
        }
    }


    public Optional<PacienteDto> listarPaciente (Long id) throws ResourceNotFoundException {
        Optional<Paciente> pacienteABuscar=pacienteRepository.findById(id);
        if (pacienteABuscar.isPresent()){
            return  Optional.of(pacienteApacienteDTO(pacienteABuscar.get()));
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el paciente Buscado");
        }
    }

    public PacienteDto modificarPaciente (PacienteDto pacienteDto)throws ResourceNotFoundException{
        Paciente pacienteModificado;
        Optional<Paciente> pacienteaModificar= pacienteRepository.findById(pacienteDto.getId());
        if (pacienteaModificar.isPresent()){
            if(pacienteDto.getPassword() == null)
            {
                pacienteDto.setPassword(pacienteaModificar.get().getPassword());
            }
            pacienteModificado=  pacienteRepository.save(pacienteDtoAPaciente(pacienteDto) );
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el paciente para actualizar");
        }
        return pacienteApacienteDTO(pacienteModificado);

    }

    public void  eliminarPaciente (Long id) throws ResourceNotFoundException {
        Optional<PacienteDto> pacienteAEliminar= listarPaciente(id);
        if(pacienteAEliminar.isPresent()){
            pacienteRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el paciente registrado con el id:  "+ id);
        }
    }

    public List<PacienteDto>  listarTodosPacientes ()throws ResourceNotFoundException{
        List<Paciente> buscarTodosPacientes = pacienteRepository.findAll();
        List<PacienteDto> todosPacientesDto = new ArrayList<>();
        if (buscarTodosPacientes.isEmpty()){
            throw new ResourceNotFoundException("Error. No se agregaron pacientes, la lista se encuentra vacia");
        }else {
            for ( Paciente paciente : buscarTodosPacientes) {
                todosPacientesDto.add(pacienteApacienteDTO(paciente));
            }
        }
        return todosPacientesDto;
    }

    public Long obtenerUltimoIdAsc() throws ResourceNotFoundException{
        List<Paciente> odontologos = pacienteRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        if (!odontologos.isEmpty()) {
            return odontologos.get(odontologos.size() - 1).getId();
        } else {
            throw new ResourceNotFoundException("No existen ID registrados");
        }
    }

    private PacienteDto pacienteApacienteDTO(Paciente paciente ){

        PacienteDto pacienteDto=new PacienteDto();

        pacienteDto.setId(paciente.getId());
        pacienteDto.setApellido(paciente.getApellido());
        pacienteDto.setNombre(paciente.getNombre());
        pacienteDto.setCalle(paciente.getDomicilio().getCalle());
        pacienteDto.setNumero(paciente.getDomicilio().getNumero());
        pacienteDto.setLocalidad(paciente.getDomicilio().getLocalidad());
        pacienteDto.setProvincia(paciente.getDomicilio().getProvincia());
        pacienteDto.setDocumento(paciente.getDocumento());
        pacienteDto.setEmail(paciente.getEmail());
        pacienteDto.setPassword(paciente.getPassword());
        pacienteDto.setFechaNacimiento(paciente.getFechaNacimiento());
        pacienteDto.setTelefono(paciente.getTelefono());
        pacienteDto.setRol(paciente.getRol().getRol());
        pacienteDto.setFechaCreacion(paciente.getFechaCreacion());
        pacienteDto.setValidado(paciente.getValidado());
        pacienteDto.setGenero(paciente.getGenero().name());
        pacienteDto.setUrlImagen(paciente.getUrlImagen());

        return pacienteDto;
    }

    private Paciente pacienteDtoAPaciente(PacienteDto pacienteDto){

        Paciente paciente=new Paciente();

        paciente.setId(pacienteDto.getId());
        paciente.setApellido(pacienteDto.getApellido());
        paciente.setNombre(pacienteDto.getNombre());
        Domicilio domicilio = new Domicilio(pacienteDto.getCalle(),pacienteDto.getNumero(),pacienteDto.getLocalidad(),pacienteDto.getProvincia());
        paciente.setDomicilio(domicilio);
        paciente.setDocumento(pacienteDto.getDocumento());
        paciente.setEmail(pacienteDto.getEmail());paciente.setEmail(pacienteDto.getEmail());
        paciente.setPassword(pacienteDto.getPassword());
        paciente.setFechaNacimiento(pacienteDto.getFechaNacimiento());
        paciente.setTelefono(pacienteDto.getTelefono());
        UsuarioRol rol = usuarioRolRepository.findByRol(pacienteDto.getRol()).get();
        paciente.setRol(rol);
        paciente.setGenero(Genero.valueOf(pacienteDto.getGenero()));
        paciente.setUrlImagen(pacienteDto.getUrlImagen());
        paciente.setFechaCreacion(pacienteDto.getFechaCreacion());
        paciente.setValidado(pacienteDto.getValidado());

        return paciente;
    }

    public void uploadImageProfile(MultipartFile file, Long id) {
        Paciente paciente = pacienteRepository.findById(id).get();
        String bucketName = "odontotal-images";
        String uniqueFilename = "profile/" + id + ".png";
        String s3Url = "https://" + bucketName + ".s3" + ".amazonaws.com/" + uniqueFilename;

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

        paciente.setUrlImagen(s3Url);
        pacienteRepository.save(paciente);
    }


    public UsuarioDto deleteImage(Long id)
    {
        Paciente paciente = pacienteRepository.findById(id).get();
        paciente.setUrlImagen(null);
        return pacienteApacienteDTO(pacienteRepository.save(paciente));
    }

}
