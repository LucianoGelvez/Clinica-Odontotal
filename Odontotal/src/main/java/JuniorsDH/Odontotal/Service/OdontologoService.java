package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.*;
import JuniorsDH.Odontotal.Dto.OdontologoDto;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.OdontologoRepository;
import JuniorsDH.Odontotal.Repository.UsuarioRolRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class OdontologoService {

    private OdontologoRepository odontologoRepository;
    private UsuarioRolRepository usuarioRolRepository;

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    public OdontologoService(OdontologoRepository odontologoRepository, UsuarioRolRepository usuarioRolRepository) {
        this.odontologoRepository = odontologoRepository;
        this.usuarioRolRepository = usuarioRolRepository;
    }

    private static final org.apache.log4j.Logger logger = Logger.getLogger(OdontologoService.class);

    public OdontologoDto agregarOdontologo (OdontologoDto odontologoDto) throws BadRequestException {
        if(odontologoDto.getNombre() != null && odontologoDto.getApellido() != null && odontologoDto.getEmail() != null &&
                odontologoDto.getPassword() != null) {

            BCryptPasswordEncoder cifradorContrasena= new BCryptPasswordEncoder();
            odontologoDto.setPassword(cifradorContrasena.encode(odontologoDto.getPassword()));

            Optional<Odontologo> pacienteExistente = odontologoRepository.findByEmail(odontologoDto.getEmail());
            if (pacienteExistente.isPresent()) {
                throw new BadRequestException("Error. El email ya está registrado.");
            } else {
                Odontologo odontologo = odontologoDtoAOdontologo(odontologoDto);
                logger.info("Guardando paciente: " + odontologoDto);
                return odontologoAOdontologoDto(odontologoRepository.save(odontologo));
            }

        } else {
            logger.error("Error. No se pudo guardar el paciente. Alguno de los campos de registro del usuario está incompleto");
            throw new BadRequestException("Error. No se pudo guardar el paciente. Alguno de los campos de registro del usuario está incompleto");
        }
    }

    public Optional<OdontologoDto> listarOdontologo (Long id) throws ResourceNotFoundException {
        Optional<Odontologo> OdontologoABuscar=odontologoRepository.findById(id);
        if (OdontologoABuscar.isPresent()){
            return  Optional.of(odontologoAOdontologoDto(OdontologoABuscar.get()));
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el Odontologo Buscado");
        }
    }

    public OdontologoDto modificarOdontologo (OdontologoDto odontologoDto)throws ResourceNotFoundException{
        Odontologo odontologoModificado;
        Optional<Odontologo> odontologoaModificar= odontologoRepository.findById(odontologoDto.getId());
        if (odontologoaModificar.isPresent()){
            if(!odontologoDto.getPassword().equals(odontologoaModificar.get().getPassword()) && odontologoDto.getPassword() != null){
                BCryptPasswordEncoder cifradorContrasena= new BCryptPasswordEncoder();
                odontologoDto.setPassword(cifradorContrasena.encode(odontologoDto.getPassword()));
            }
            if(odontologoDto.getPassword() == null)
            {
                odontologoDto.setPassword(odontologoaModificar.get().getPassword());
            }
            odontologoModificado= odontologoRepository.save(odontologoDtoAOdontologo(odontologoDto));
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el odontologo para actualizar");
        }
        return odontologoAOdontologoDto(odontologoModificado);
    }

    public void  eliminarOdontologo (Long id)throws ResourceNotFoundException{
        Optional<OdontologoDto> pacienteAEliminar=listarOdontologo(id);
        if(pacienteAEliminar.isPresent()){
            odontologoRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el Odontologo registrado con el id:  "+ id);
        }
    }


    public List<OdontologoDto> listarTodosOdontologo ()throws ResourceNotFoundException{
        List<Odontologo> buscarTodosLosOdontologos= odontologoRepository.findAll();
        List<OdontologoDto> todosodontologosADto =  new ArrayList<>();

        if (buscarTodosLosOdontologos.isEmpty()){
            throw new ResourceNotFoundException("Error. No se agregaron Odontologos, la lista se encuentra vacia");
        }else {
            for (Odontologo odontologo : buscarTodosLosOdontologos) {
                todosodontologosADto.add(odontologoAOdontologoDto(odontologo));
            }
            return todosodontologosADto;
        }
    }

    public Long obtenerUltimoIdAsc() throws ResourceNotFoundException{
        List<Odontologo> odontologos = odontologoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        if (!odontologos.isEmpty()) {
            return odontologos.get(odontologos.size() - 1).getId();
        } else {
            throw new ResourceNotFoundException("No existen ID registrados");
        }
    }

    private OdontologoDto odontologoAOdontologoDto(Odontologo odontologo){
        OdontologoDto respuesta= new OdontologoDto();
        respuesta.setId(odontologo.getId());
        respuesta.setNombre(odontologo.getNombre());
        respuesta.setApellido(odontologo.getApellido());
        respuesta.setEspecialidad(odontologo.getEspecialidad().name());
        respuesta.setMatricula(odontologo.getMatricula());
        respuesta.setUrlImagen(odontologo.getUrlImagen());
        respuesta.setEmail(odontologo.getEmail());
        respuesta.setDocumento(odontologo.getDocumento());
        respuesta.setCalle(odontologo.getDomicilio().getCalle());
        respuesta.setNumero(odontologo.getDomicilio().getNumero());
        respuesta.setLocalidad(odontologo.getDomicilio().getLocalidad());
        respuesta.setProvincia(odontologo.getDomicilio().getProvincia());
        respuesta.setFechaNacimiento(odontologo.getFechaNacimiento());
        respuesta.setUrlImagen(odontologo.getUrlImagen());
        respuesta.setGenero(odontologo.getGenero().name());
        respuesta.setTelefono(odontologo.getTelefono());
        respuesta.setRol(odontologo.getRol().getRol());
        respuesta.setPassword(odontologo.getPassword());
        return  respuesta;
    }


    private Odontologo odontologoDtoAOdontologo(OdontologoDto odontologoDto){
        Odontologo respuesta=new Odontologo();
        respuesta.setId(odontologoDto.getId());
        respuesta.setNombre(odontologoDto.getNombre());
        respuesta.setApellido(odontologoDto.getApellido());
        respuesta.setEspecialidad(Especialidad.valueOf(odontologoDto.getEspecialidad()));
        respuesta.setMatricula(odontologoDto.getMatricula());
        respuesta.setUrlImagen(odontologoDto.getUrlImagen());
        respuesta.setEmail(odontologoDto.getEmail());
        respuesta.setPassword(odontologoDto.getPassword());
        respuesta.setFechaNacimiento(odontologoDto.getFechaNacimiento());
        respuesta.setTelefono(odontologoDto.getTelefono());
        UsuarioRol rol = usuarioRolRepository.findByRol(odontologoDto.getRol()).get();
        respuesta.setRol(rol);
        Domicilio domicilio = new Domicilio(odontologoDto.getCalle(),odontologoDto.getNumero(),odontologoDto.getLocalidad(),odontologoDto.getProvincia());
        respuesta.setDomicilio(domicilio);
        respuesta.setGenero(Genero.valueOf(odontologoDto.getGenero()));
        respuesta.setDocumento(odontologoDto.getDocumento());
        respuesta.setUrlImagen(odontologoDto.getUrlImagen());
        return respuesta;
    }


    public void uploadImageProfile(MultipartFile file, Long id) {
        Odontologo odontologo = odontologoRepository.findById(id).get();
        String bucketName = "odontotal-imagenes";
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

        odontologo.setUrlImagen(s3Url);
        odontologoRepository.save(odontologo);
    }


    public UsuarioDto deleteImage(Long id)
    {
        Odontologo odontologo = odontologoRepository.findById(id).get();
        odontologo.setUrlImagen(null);
        return odontologoAOdontologoDto(odontologoRepository.save(odontologo));
    }
}