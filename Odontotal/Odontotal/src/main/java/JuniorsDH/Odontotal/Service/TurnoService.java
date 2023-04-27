package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Domain.Turno;
import JuniorsDH.Odontotal.Dto.TurnoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class TurnoService {




    private TurnoRepository turnoRepository;



    @Autowired
    public TurnoService(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }


    public TurnoDto agregarTurno (TurnoDto turnoDto)throws DataInvalidException {

        Turno turnoGuardado;
        if (turnoDto.getOdontologoId() == null || turnoDto.getPacienteId() == null) {
            throw new DataInvalidException("Error. No se puede registrar turno, es necesario registrar un paciente y un odontologo");
        } else {
            turnoGuardado = turnoRepository.save(turnoDTOATurno(turnoDto));
        }
        return turnoATurnoDTO(turnoGuardado);
    }





    public Optional<TurnoDto> listarTurnoOptional(Long id) throws ResourceNotFoundException {
        Optional<Turno> turnoListado= turnoRepository.findById(id);
        if (turnoListado.isPresent()){
            return Optional.of(turnoATurnoDTO(turnoListado.get()));
        }else {
//
            throw new ResourceNotFoundException("Error. Turno no encontrado, se requiere revisar el registro del mismo ");
        }

    }


    public void modificarTurno (TurnoDto turnoDto)throws ResourceNotFoundException{
       Optional<Turno> turnoAModificar=turnoRepository.findById(turnoDto.getId());
       if (turnoAModificar.isPresent()){
           turnoRepository.save(turnoDTOATurno(turnoDto));
       }else {
           throw new ResourceNotFoundException("Error. No se puede modificar el turno, revisar registro del mismo ");
       }

    }



    public void  eliminarTurno (Long id) throws ResourceNotFoundException {

        Optional<TurnoDto> tuernoAEliminar= listarTurnoOptional(id);
        if(tuernoAEliminar.isPresent()){
            turnoRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Error. No se puede eliminar el turno, no existe en el registro");
        }

    }

    public List<TurnoDto> listarTodosTurno () throws ResourceNotFoundException{

        List<Turno> turnoEncontrado= turnoRepository.findAll();
        List<TurnoDto> respuesta= new ArrayList<>();
        if (turnoEncontrado.isEmpty()){
            throw new ResourceNotFoundException("Error. No existe ningun turno registrado");
        }else {
            for (Turno turno : turnoEncontrado) {
                respuesta.add(turnoATurnoDTO(turno));
            }
            return respuesta ;
        }

    }




    private TurnoDto turnoATurnoDTO(Turno turno){
        TurnoDto respuesta= new TurnoDto();
        respuesta.setId(turno.getId());
        respuesta.setPacienteId(turno.getPaciente().getId());
        respuesta.setNombrePaciente(turno.getPaciente().getNombre());
        respuesta.setOdontologoId(turno.getOdontologo().getId());
        respuesta.setNombreOdontologo(turno.getOdontologo().getNombre());
        respuesta.setFecha(turno.getFecha());
        respuesta.setHora(turno.getHora());

        return respuesta;
    }



    private Turno turnoDTOATurno(TurnoDto turnodto){
        Turno respuesta= new Turno();
        Odontologo odontologo= new Odontologo();
        Paciente paciente= new Paciente();

        odontologo.setId(turnodto.getOdontologoId());
        odontologo.setNombre(turnodto.getNombreOdontologo());
        paciente.setId(turnodto.getPacienteId());
        paciente.setNombre(turnodto.getNombrePaciente());
        respuesta.setFecha(turnodto.getFecha());
        respuesta.setHora(turnodto.getHora());
        respuesta.setId(turnodto.getId());
        respuesta.setOdontologo(odontologo);
        respuesta.setPaciente(paciente);
        return respuesta;
    }







}
