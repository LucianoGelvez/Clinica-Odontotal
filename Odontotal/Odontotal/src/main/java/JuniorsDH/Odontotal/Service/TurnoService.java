package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Domain.Protecista;
import JuniorsDH.Odontotal.Domain.Turno;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Dto.TurnoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
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
        if (turnoDto.getOdontologoId() == null || turnoDto.getPacienteId() == null||turnoDto.getFecha()==null||turnoDto.getHora()==null) {
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

    public TurnoDto modificarTurno (TurnoDto turnoDto)throws ResourceNotFoundException{
        Turno turnoModificado;
       Optional<Turno> turnoAModificar=turnoRepository.findById(turnoDto.getId());
       if (turnoAModificar.isPresent()){
           turnoModificado=turnoRepository.save(turnoDTOATurno(turnoDto));
       }else {
           throw new ResourceNotFoundException("Error. No se puede modificar el turno, revisar registro del mismo ");
       }

        return turnoATurnoDTO(turnoModificado);
    }

    public void  eliminarTurno (Long id) throws ResourceNotFoundException {
        Optional<TurnoDto> turnoAEliminar= listarTurnoOptional(id);
        if(turnoAEliminar.isPresent()){
            turnoRepository.deleteById(id);
//            if (turnoRepository.findById(id).isPresent()) {
//                throw new ResourceNotFoundException("Error. No se puede eliminar el turno");
//            }
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

    public Long obtenerUltimoIdAsc() throws ResourceNotFoundException{
        List<Turno> odontologos = turnoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        if (!odontologos.isEmpty()) {
            return odontologos.get(odontologos.size() - 1).getId();
        } else {
            throw new ResourceNotFoundException("No existen ID registrados");
        }
    }


    private TurnoDto turnoATurnoDTO(Turno turno){
        TurnoDto respuesta= new TurnoDto();
        respuesta.setId(turno.getId());
        respuesta.setPacienteId(turno.getPaciente().getId());
        respuesta.setNombrePaciente(turno.getPaciente().getNombre());
        respuesta.setApellidoPaciente(turno.getPaciente().getApellido());
        respuesta.setDocumentoPaciente(turno.getPaciente().getDocumento());
        respuesta.setOdontologoId(turno.getOdontologo().getId());
        respuesta.setNombreOdontologo(turno.getOdontologo().getNombre());
        respuesta.setFecha(turno.getFecha());
        respuesta.setHora(turno.getHora());
        respuesta.setReasonForTurn(turno.getReasonForTurn());
        respuesta.setWhatWasDone(turno.getWhatWasDone());

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
        paciente.setApellido(turnodto.getApellidoPaciente());
        paciente.setDocumento(turnodto.getDocumentoPaciente());
        respuesta.setFecha(turnodto.getFecha());
        respuesta.setHora(turnodto.getHora());
        respuesta.setId(turnodto.getId());
        respuesta.setOdontologo(odontologo);
        respuesta.setPaciente(paciente);
        respuesta.setReasonForTurn(turnodto.getReasonForTurn());
        respuesta.setWhatWasDone(turnodto.getWhatWasDone());
        return respuesta;
    }


    public List<TurnoDto> listarTurnoPaciente(Long id) throws ResourceNotFoundException {
        List<TurnoDto> turnosEncontrados = listarTodosTurno();
        List<TurnoDto> respuesta = new ArrayList<>();
        if(turnosEncontrados.isEmpty()){
            throw  new ResourceNotFoundException("El paciente no tiene historia registrado");
        }
        else {
            for (TurnoDto turnoDTO : turnosEncontrados){
                if (turnoDTO.getPacienteId() == id)
                respuesta.add(turnoDTO);
            }
            return respuesta;
        }
    }

    public List<TurnoDto> listarTurnoOdontologo(Long id) throws ResourceNotFoundException {
        List<TurnoDto> turnosEncontrados = listarTodosTurno();
        List<TurnoDto> respuesta = new ArrayList<>();
        if(turnosEncontrados.isEmpty()){
            throw  new ResourceNotFoundException("El odontologo no tiene historia registrado");
        }
        else {
            for (TurnoDto turnoDTO : turnosEncontrados){
                if (turnoDTO.getOdontologoId() == id)
                    respuesta.add(turnoDTO);
            }
            return respuesta;
        }
    }


}
