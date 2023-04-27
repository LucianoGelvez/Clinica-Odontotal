package JuniorsDH.Odontotal.Service;




import JuniorsDH.Odontotal.Domain.Especialidad;
import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Dto.OdontologoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.OdontologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
public class OdontologoService {



    private OdontologoRepository odontologoRepository;


    @Autowired
    public OdontologoService(OdontologoRepository odontologoRepository) {
        this.odontologoRepository = odontologoRepository;
    }





    public OdontologoDto agregarOdontologo (OdontologoDto odontologoDto)throws DataInvalidException {
        Odontologo odontologoGuardado;
        if (odontologoDto.getNombre().isEmpty()||odontologoDto.getApellido().isEmpty()|| odontologoDto.getEspecialidad()==null){
            throw new DataInvalidException("Error. Alguno de los campos de registro de Odontologo  se encuentran incompleto");
        }else{
            odontologoGuardado=  odontologoRepository.save(odontologoDtoAOdontologo(odontologoDto));
        }
        return odontologoAOdontologoDto(odontologoGuardado);
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



    private OdontologoDto odontologoAOdontologoDto(Odontologo odontologo){
        OdontologoDto respuesta= new OdontologoDto();
        respuesta.setId(odontologo.getId());
        respuesta.setNombre(odontologo.getNombre());
        respuesta.setApellido(odontologo.getApellido());
        respuesta.setEspecialidad(odontologo.getEspecialidad().name());
    return  respuesta;
    }


    private Odontologo odontologoDtoAOdontologo(OdontologoDto odontologoDto){
        Odontologo respuesta=new Odontologo();
        respuesta.setId(odontologoDto.getId());
        respuesta.setNombre(odontologoDto.getNombre());
        respuesta.setApellido(odontologoDto.getApellido());
        respuesta.setEspecialidad(Especialidad.valueOf(odontologoDto.getEspecialidad()));
        return respuesta;
    }

}
