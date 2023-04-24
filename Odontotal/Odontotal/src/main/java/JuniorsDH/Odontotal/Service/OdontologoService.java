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

//la clase "OdontologoService" proporciona una capa de abstracción entre la aplicación y la base de datos,
// permitiendo a los usuarios realizar operaciones CRUD en objetos "Odontologo" de manera fácil y segura.


//La anotación "@Service" indica que esta clase es un componente de servicio y puede ser administrada por un contenedor de Spring.

@Service
public class OdontologoService {

    //La clase tiene un campo odontologoRepository que se inicializa mediante inyección de dependencia a través del constructor con la anotación @Autowired,
    // que utiliza el repositorio OdontologoRepository.


    private OdontologoRepository odontologoRepository;


    @Autowired
    public OdontologoService(OdontologoRepository odontologoRepository) {
        this.odontologoRepository = odontologoRepository;
    }




    //agregarOdontologo: recibe un objeto Odontologo, verifica que los campos nombre, apellido y matricula no estén vacíos,
    // y si están completos, guarda el objeto en la base de datos utilizando el odontologoRepository.
    public OdontologoDto agregarOdontologo (OdontologoDto odontologoDto)throws DataInvalidException {
        Odontologo odontologoGuardado;
        if (odontologoDto.getNombre().isEmpty()||odontologoDto.getApellido().isEmpty()|| odontologoDto.getEspecialidad()==null){
            throw new DataInvalidException("Error. Alguno de los campos de registro de Odontologo  se encuentran incompleto");
        }else{
            odontologoGuardado=  odontologoRepository.save(odontologoDtoAOdontologo(odontologoDto));
        }
        return odontologoAOdontologoDto(odontologoGuardado);
    }



    //listarOdontologo: recibe un id de tipo Long, busca un objeto Odontologo en la base de datos con ese id utilizando el odontologoRepository,
    // y si lo encuentra, devuelve un objeto Optional con el Odontologo buscado. Si no lo encuentra, lanza una excepción ResourceNotFoundException.
    public Optional<OdontologoDto> listarOdontologo (Long id) throws ResourceNotFoundException {
        Optional<Odontologo> OdontologoABuscar=odontologoRepository.findById(id);
        if (OdontologoABuscar.isPresent()){
          return  Optional.of(odontologoAOdontologoDto(OdontologoABuscar.get()));
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el Odontologo Buscado");
        }

    }


    //modificarOdontologo: recibe un objeto Odontologo, busca un objeto Odontologo en la base de datos con el id del objeto recibido utilizando el odontologoRepository,
    // y si lo encuentra, guarda el objeto recibido en la base de datos utilizando el odontologoRepository. Si no lo encuentra, lanza una excepción ResourceNotFoundException.

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



    //eliminarOdontologo: recibe un id de tipo Long, busca un objeto Odontologo en la base de datos con ese id utilizando el odontologoRepository,
    // y si lo encuentra, lo elimina de la base de datos utilizando el odontologoRepository. Si no lo encuentra, lanza una excepción ResourceNotFoundException.
    public void  eliminarOdontologo (Long id)throws ResourceNotFoundException{
        Optional<OdontologoDto> pacienteAEliminar=listarOdontologo(id);
        if(pacienteAEliminar.isPresent()){
            odontologoRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el Odontologo registrado con el id:  "+ id);
        }

    }




    //listarTodosOdontologo: busca todos los objetos Odontologo en la base de datos utilizando el odontologoRepository y si la lista no está vacía,
    // devuelve la lista de objetos Odontologo. Si la lista está vacía, lanza una excepción ResourceNotFoundException.
    public List<OdontologoDto> listarTodosOdontologo ()throws ResourceNotFoundException{
       List<Odontologo> buscarTodosLosOdontologos= odontologoRepository.findAll();
        List<OdontologoDto> todosodontologosADto = new ArrayList<>();

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

//Se utiliza el método valueOf() para convertir una cadena de texto (en este caso, el valor de odontologoDto.getEspecialidad()) en un objeto de tipo Enum.
// El método valueOf() es un método estático definido en la clase del Enum, que toma un String como parámetro y devuelve el objeto de tipo Enum correspondiente.
//En este caso, el método Especialidad.valueOf(odontologoDto.getEspecialidad()) convierte el valor de la cadena de texto que se encuentra en odontologoDto.getEspecialidad() en un objeto de tipo Especialidad.
// El método valueOf() lanza una excepción si el valor de la cadena de texto no corresponde a uno de los valores definidos en el Enum.

}
