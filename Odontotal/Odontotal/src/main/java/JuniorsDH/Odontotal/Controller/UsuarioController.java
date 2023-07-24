package JuniorsDH.Odontotal.Controller;


import JuniorsDH.Odontotal.Domain.Usuario;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> guardarUsuario(@RequestBody UsuarioDto usuarioDto) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.guardarUsuario(usuarioDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<UsuarioDto>> buscarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(usuarioService.buscarUsuario(id));
    }

    @PutMapping
    public ResponseEntity<UsuarioDto> actualizarUsuario(@RequestBody UsuarioDto usuarioDto) throws ResourceNotFoundException {
        UsuarioDto usuarioActualizado = usuarioService.actualizarUsuario(usuarioDto);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok("se eliminó el usuario con id : "+ id );
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDto>> buscarTodos() throws ResourceNotFoundException {
        return ResponseEntity.ok(usuarioService.buscarTodos());
    }

}
