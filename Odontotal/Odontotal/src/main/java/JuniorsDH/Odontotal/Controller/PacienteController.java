package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
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

    @PostMapping("/registrar")
    ResponseEntity <PacienteDto> registrarPaciente(@RequestBody PacienteDto paciente) throws BadRequestException {
        return ResponseEntity.ok(pacienteService.agregarPaciente(paciente)) ;}


    @GetMapping
    public ResponseEntity<List<PacienteDto>> buscarTodos()throws ResourceNotFoundException{
        List<PacienteDto> pacientes = pacienteService.listarTodosPacientes();
        return ResponseEntity.ok(pacientes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Long id)throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.ok("se eliminó el paciente con id : "+ id );
    }

    @PutMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@ModelAttribute("file") MultipartFile file, @RequestParam("id") Long id)
    {
        pacienteService.uploadImageProfile(file, id);
        return ResponseEntity.ok("Image uploaded");
    }

    @DeleteMapping("/deleteImage/{id}")
    public ResponseEntity<UsuarioDto> deleteImage(@PathVariable Long id)
    {
        return ResponseEntity.ok(pacienteService.deleteImage(id));
    }

}

