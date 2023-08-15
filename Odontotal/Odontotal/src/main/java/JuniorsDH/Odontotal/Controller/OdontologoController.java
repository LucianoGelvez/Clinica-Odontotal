package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Dto.OdontologoDto;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.BadRequestException;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/odontologos")
public class OdontologoController {
    private OdontologoService odontologoService;
    @Autowired
    public OdontologoController(OdontologoService odontologoService) {
        this.odontologoService = odontologoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OdontologoDto> buscarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<OdontologoDto> listaOdontologo= odontologoService.listarOdontologo(id);
            return ResponseEntity.ok(listaOdontologo.get());
    }

    @PutMapping
    public ResponseEntity<OdontologoDto> actualizarOdontologo(@RequestBody OdontologoDto odontologoDto)throws ResourceNotFoundException{
        OdontologoDto odontologoActualizado = odontologoService.modificarOdontologo(odontologoDto);
        return ResponseEntity.ok(odontologoActualizado);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<OdontologoDto>> buscarTodosOdontologos() throws ResourceNotFoundException {
        List<OdontologoDto> listaOdontologos = odontologoService.listarTodosOdontologo();
        return ResponseEntity.ok(listaOdontologos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        odontologoService.eliminarOdontologo(id);
        return ResponseEntity.ok("se eliminó el odontologo con id : "+ id );
    }

    @PostMapping
    public ResponseEntity<OdontologoDto> agregarOdontologo(@RequestBody OdontologoDto dontologo) throws BadRequestException {
        OdontologoDto odontologoAgregado = odontologoService.agregarOdontologo(dontologo);
        return ResponseEntity.status(HttpStatus.CREATED).body(odontologoAgregado);
    }

    @PutMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@ModelAttribute("file") MultipartFile file, @RequestParam("id") Long id)
    {
        odontologoService.uploadImageProfile(file, id);
        return ResponseEntity.ok("Image uploaded");
    }

    @DeleteMapping("/deleteImage/{id}")
    public ResponseEntity<UsuarioDto> deleteImage(@PathVariable Long id)
    {
        return ResponseEntity.ok(odontologoService.deleteImage(id));
    }
}










