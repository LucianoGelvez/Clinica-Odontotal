package JuniorsDH.Odontotal.Controller;


import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;





@CrossOrigin(origins = "http://127.0.0.1:5173/", allowCredentials = "true")
@RestController
@RequestMapping("/pacientes")
public class PacienteController {


    private PacienteService pacienteService;


    @Autowired
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }




@PutMapping
public ResponseEntity<PacienteDto> actualizarPaciente(@RequestBody PacienteDto pacienteDto)throws ResourceNotFoundException {
    PacienteDto pacienteActualizado = pacienteService.modificarPaciente(pacienteDto);
    return ResponseEntity.ok(pacienteActualizado);
}

    @GetMapping ("/{id}")
    public ResponseEntity<PacienteDto> buscarPaciente(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<PacienteDto> listarPaciente = pacienteService.listarPaciente(id);
            return ResponseEntity.ok( listarPaciente.get());
    }


    @PostMapping
    ResponseEntity <PacienteDto> registrarPaciente(@RequestBody PacienteDto paciente) throws DataInvalidException {
        return ResponseEntity.ok(pacienteService.agregarPaciente(paciente)) ;}



    @GetMapping
    public ResponseEntity<List<PacienteDto>> buscarTodos()throws ResourceNotFoundException{
        List<PacienteDto> pacientes = pacienteService.listarTodosPacientes();
        return ResponseEntity.ok(pacientes);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Long id)throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.ok("se elimino el odontologo con id : "+ id );
    }


}

