package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.MailService;
import JuniorsDH.Odontotal.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pacientes")
public class PacienteController {
    private PacienteService pacienteService;
    private MailService mailService;

    private Logger logger = Logger.getLogger(PacienteController.class.getName());
    @Autowired
    public PacienteController(PacienteService pacienteService, MailService mailService) {
        this.pacienteService = pacienteService;
        this.mailService = mailService;
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
    ResponseEntity <PacienteDto> registrarPaciente(@RequestBody PacienteDto pacienteDto) throws Exception {
        PacienteDto pacienteGuardado = pacienteService.agregarPaciente(pacienteDto);
        mailService.enviarCorreoValidacion(pacienteGuardado);
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteDto);
    }


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

    @PutMapping("/validar/{id}")
    public ResponseEntity<String> validarCuenta(@PathVariable Long id) throws Exception {
        // Checamos si existe el usuario
        Optional<PacienteDto> paciente = pacienteService.listarPaciente(id);
        if (paciente.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el paciente con id: " + id);
        }

        // Checamos si la cuenta ya está validada
        logger.info("Validando cuenta del usuario: " + paciente.get());
        if (paciente.get().getValidado() != null) {
            throw new BadRequestException("La cuenta ya está validada");
        }

        // Actualizamos el campo de validación de la cuenta en la base de datos
        PacienteDto pacienteDto = paciente.get();
        pacienteDto.setValidado(true);
        pacienteDto = pacienteService.modificarPacienteValidacion(pacienteDto);
        logger.info("Se validó la cuenta del paciente" + pacienteDto);

        // Enviamos correo de bienvenida
        mailService.enviarCorreoBienvenida(pacienteDto);

        return ResponseEntity.ok("Se validó la cuenta del paciente con id: " + id);
    }

}

