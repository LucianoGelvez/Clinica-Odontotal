package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Dto.TurnoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.MailService;
import JuniorsDH.Odontotal.Service.OdontologoService;
import JuniorsDH.Odontotal.Service.PacienteService;
import JuniorsDH.Odontotal.Service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private MailService mailService;

    @Autowired
    public TurnoController(TurnoService turnoService, PacienteService pacienteService, OdontologoService odontologoService,MailService mailService) {
        this.turnoService = turnoService;
        this.pacienteService = pacienteService;
        this.odontologoService = odontologoService;
        this.mailService = mailService;
    }

    @PostMapping
    public ResponseEntity<TurnoDto> registrarTurno(@RequestBody TurnoDto turno) throws Exception {
        // Almacenamos el turno
        TurnoDto turnoGuardado = turnoService.agregarTurno(turno);

        //Trear el paciente para luego usar su correo
        PacienteDto pacienteDto = pacienteService.listarPaciente(turno.getPacienteId()).get();

        // Enviamos el correo de confirmación del turno
        mailService.enviarCorreoTurno(pacienteDto.getEmail(),turnoGuardado);

        return ResponseEntity.status(HttpStatus.CREATED).body(turnoGuardado);
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

    @PutMapping("/{id}")
    public ResponseEntity<TurnoDto> actualizarTurno(@RequestBody TurnoDto turno) throws Exception {
        TurnoDto turnoModificado = turnoService.modificarTurno(turno);
        //Trear el paciente para luego usar su correo
        PacienteDto pacienteDto = pacienteService.listarPaciente(turno.getPacienteId()).get();

        // Enviamos el correo de confirmación del turno
        mailService.enviarCorreoTurno(pacienteDto.getEmail(),turnoModificado);
        return ResponseEntity.status(HttpStatus.OK).body(turnoModificado);
    }

    @PutMapping("/completarTurno/{id}")
    public ResponseEntity<TurnoDto> completarTurno(@RequestBody TurnoDto turno) throws Exception {
        TurnoDto turnoModificado = turnoService.modificarTurno(turno);
        return ResponseEntity.status(HttpStatus.OK).body(turnoModificado);
    }

    @GetMapping("/turnosPaciente/{id}")
    public ResponseEntity<List<TurnoDto>> historialPaciente(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(turnoService.listarTurnoPaciente(id));
    }
    @GetMapping("/turnoOdontologo/{id}")
    public ResponseEntity<List<TurnoDto>> turnoOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        List<TurnoDto> turnos = turnoService.obtenerTurnosPorOdontologo(id);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }
}
