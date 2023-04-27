package JuniorsDH.Odontotal.Service;




import JuniorsDH.Odontotal.Domain.Domicilio;
import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PacienteService {



    private PacienteRepository pacienteRepository;


    @Autowired
    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }




      public PacienteDto agregarPaciente (PacienteDto pacienteDto)throws DataInvalidException {
        Paciente respuesta;
        if (pacienteDto.getNombre().isEmpty()|| pacienteDto.getApellido().isEmpty() || pacienteDto.getDomicilio() == null){
            throw new DataInvalidException("Error. Alguno de los campos de registro del paciente  se encuentran incompleto");
        }else{
          respuesta=pacienteRepository.save(pacienteDtoAPaciente(pacienteDto));
        }
        return pacienteApacienteDTO(respuesta);
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
        Optional<Paciente> pacienteaModificar= pacienteRepository.findById(pacienteDto.getIdPaciente());
        if (pacienteaModificar.isPresent()){
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





    private Long idPaciente;
    private String apellido;
    private String nombre;
    private Long idDomicilio;
    private String provincia;

    private PacienteDto pacienteApacienteDTO(Paciente paciente ){

        PacienteDto pacienteDto=new PacienteDto();

        pacienteDto.setIdPaciente(paciente.getId());
        pacienteDto.setApellido(paciente.getApellido());
        pacienteDto.setNombre(paciente.getNombre());
        pacienteDto.setDomicilio(paciente.getDomicilio());

        return pacienteDto;


    }


    private Paciente pacienteDtoAPaciente(PacienteDto pacienteDto){

        Paciente paciente=new Paciente();


        paciente.setId(pacienteDto.getIdPaciente());
        paciente.setApellido(pacienteDto.getApellido());
        paciente.setNombre(pacienteDto.getNombre());


        paciente.setDomicilio(pacienteDto.getDomicilio());


        return paciente;

    }



}
