package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.*;
import JuniorsDH.Odontotal.Dto.OdontologoDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.OdontologoRepository;
import JuniorsDH.Odontotal.Repository.UsuarioRolRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class OdontologoService {

    private OdontologoRepository odontologoRepository;
    private UsuarioRolRepository usuarioRolRepository;

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
        Optional<Odontologo> pacienteaModificar= odontologoRepository.findById(odontologoDto.getId());
        if (pacienteaModificar.isPresent()){
            odontologoModificado=odontologoRepository.save(odontologoDtoAOdontologo(odontologoDto));
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
        respuesta.setGenero(odontologo.getGenero().name());
        respuesta.setTelefono(odontologo.getTelefono());
        respuesta.setRol(odontologo.getRol().getRol());
        respuesta.setUrlImagen(odontologo.getUrlImagen());
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
}
