package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Dto.TurnoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.OdontologoService;
import JuniorsDH.Odontotal.Service.PacienteService;
import JuniorsDH.Odontotal.Service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/turnos")
public class TurnoController {
    private TurnoService turnoService;
    private PacienteService pacienteService;
    private OdontologoService odontologoService;

    @Autowired
    public TurnoController(TurnoService turnoService, PacienteService pacienteService, OdontologoService odontologoService) {
        this.turnoService = turnoService;
        this.pacienteService = pacienteService;
        this.odontologoService = odontologoService;
    }

    @PostMapping
    public ResponseEntity<TurnoDto> registrarTurno(@RequestBody TurnoDto turno) throws DataInvalidException {
            return ResponseEntity.ok(turnoService.agregarTurno(turno));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurnoDto> listarTurno(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<TurnoDto> turnoBuscado= turnoService.listarTurnoOptional(id);
            return ResponseEntity.ok(turnoBuscado.get());
    }

    @GetMapping
    public ResponseEntity<List<TurnoDto>> listarTodosTurnos() throws ResourceNotFoundException {
        return ResponseEntity.ok(turnoService.listarTodosTurno());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTurno(@PathVariable Long id) throws ResourceNotFoundException {
        turnoService.eliminarTurno(id);
        return ResponseEntity.ok("Se eliminó el turno" +" con id = " + id);
    }

    @PutMapping()
    public ResponseEntity<String> actualizarTurno(@RequestBody TurnoDto turno) throws ResourceNotFoundException {
        turnoService.modificarTurno(turno);
        return ResponseEntity.ok("Se actualizó el turno con id= " + turno.getId());
    }

    @GetMapping("/turnosPaciente/{id}")
    public ResponseEntity<List<TurnoDto>> historialPaciente(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(turnoService.listarTurnoPaciente(id));
    }
    @GetMapping("/turnoOdontologo/{id}")
    public ResponseEntity<List<TurnoDto>> turnoOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(turnoService.listarTurnoOdontologo(id));
    }
}
