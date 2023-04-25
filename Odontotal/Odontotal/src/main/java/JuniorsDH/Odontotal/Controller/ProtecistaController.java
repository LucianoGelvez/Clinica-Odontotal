package JuniorsDH.Odontotal.Controller;


import JuniorsDH.Odontotal.Domain.Protecista;
import JuniorsDH.Odontotal.Dto.ProtecistaDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.ProtecistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/protecistas")
public class ProtecistaController {

    private ProtecistaService protecistaService;

    @Autowired
    public ProtecistaController(ProtecistaService protecistaService) {
        this.protecistaService = protecistaService;
    }

    @PostMapping
    ResponseEntity<ProtecistaDto> agregarProtecista(@RequestBody ProtecistaDto protecistaDto) throws DataInvalidException {
        ProtecistaDto protecistaAgregado= protecistaService.agregarProtecista(protecistaDto);
       return ResponseEntity.status(HttpStatus.CREATED).body(protecistaAgregado);
    }

    @GetMapping("/{id}")
    ResponseEntity<ProtecistaDto> buscarProtecista (@PathVariable Long id ) throws ResourceNotFoundException {
        Optional<ProtecistaDto> protecistaBuscado= protecistaService.listarProtecista(id);
        return ResponseEntity.ok(protecistaBuscado.get());

    }

    @PutMapping
    ResponseEntity<ProtecistaDto> actualizarProtecista (@RequestBody ProtecistaDto protecistaDto) throws ResourceNotFoundException {
       ProtecistaDto protecistaDtoactualizado=protecistaService.modificarProtecista(protecistaDto);
       return ResponseEntity.ok(protecistaDtoactualizado);
    }

    @DeleteMapping ("/{id}")
    ResponseEntity<String> eliminarProtecista (@PathVariable Long id ) throws ResourceNotFoundException {
        protecistaService.eliminarProtecista(id);
        return ResponseEntity.ok("se elimino el odontologo con id : "+ id );
    }

    @GetMapping
    ResponseEntity<List<ProtecistaDto>> listarProtecistas () throws ResourceNotFoundException {
        List<ProtecistaDto>protecistasList= protecistaService.listarTodosProtecistas();
        return ResponseEntity.ok(protecistasList);
    }


}
