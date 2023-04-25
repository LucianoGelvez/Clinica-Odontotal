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


//define un controlador para manejar solicitudes HTTP relacionadas con la entidad "Pacientes"

//@RestController se utiliza para definir una clase que maneja las solicitudes HTTP de entrada y devuelve una respuesta HTTP de salida en formato JSON o XML.


// @RequestMapping("/pacientes")  se utiliza para asignar URLs a métodos específicos dentro de una clase controladora. Al agregar @RequestMapping("/pacientes")
//en la declaración de clase del controlador,
//se indica que todas las solicitudes que comiencen con /pacientes se manejarán en la clase pacientesController.

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    //Utiliza un Servicio de pacientes
    private PacienteService pacienteService;


    //@Autowired es una de las formas en que se puede inyectar una dependencia en Spring Framework
    //se utiliza para permitir que Spring resuelva y cree automáticamente una instancia de una clase o interfaz, que se puede utilizar en el componente actual.
    // Inyecta la dependencia de la clase Service en el controlador
    @Autowired
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }





//El primer método "@PutMapping" recibe una solicitud HTTP con un objeto de tipo Paciente en el cuerpo,
// actualiza los datos del paciente en la base de datos utilizando el servicio "pacienteService.modificarPaciente",
// y devuelve una respuesta HTTP con el objeto Paciente actualizado.

@PutMapping
public ResponseEntity<PacienteDto> actualizarPaciente(@RequestBody PacienteDto pacienteDto)throws ResourceNotFoundException {
    PacienteDto pacienteActualizado = pacienteService.modificarPaciente(pacienteDto);
    return ResponseEntity.ok(pacienteActualizado);
}



//El segundo método "@GetMapping" recibe una solicitud HTTP con un parámetro de ruta que representa el ID de un Paciente,
// busca en la base de datos el Paciente correspondiente utilizando el servicio "pacienteService.listarPaciente",
// y devuelve una respuesta HTTP con el objeto Paciente correspondiente si se encuentra, o devuelve una respuesta HTTP sin contenido si no se encuentra el Paciente.

    @GetMapping ("/{id}")
    public ResponseEntity<PacienteDto> buscarPaciente(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<PacienteDto> listarPaciente = pacienteService.listarPaciente(id);
            return ResponseEntity.ok( listarPaciente.get());
    }


    //El tercer método "@PostMapping" recibe una solicitud HTTP con un objeto de tipo Paciente en el cuerpo,
    // verifica si los campos requeridos están completos, agrega el nuevo Paciente a la base de datos utilizando el servicio "pacienteService.agregarPaciente",
    // y devuelve una respuesta HTTP con el objeto Paciente agregado.

    @PostMapping
    ResponseEntity <PacienteDto> registrarPaciente(@RequestBody PacienteDto paciente) throws DataInvalidException {
        return ResponseEntity.ok(pacienteService.agregarPaciente(paciente)) ;}




    //El cuarto método "@GetMapping" recibe una solicitud HTTP sin parámetros de ruta,
    // busca en la base de datos todos los pacientes utilizando el servicio "pacienteService.listarTodosPacientes",
    // y devuelve una respuesta HTTP con una lista de objetos Paciente correspondientes.
    @GetMapping
    public ResponseEntity<List<PacienteDto>> buscarTodos()throws ResourceNotFoundException{
        List<PacienteDto> pacientes = pacienteService.listarTodosPacientes();
        return ResponseEntity.ok(pacientes);
    }




//El quinto método "@DeleteMapping" recibe una solicitud HTTP con un parámetro de ruta que representa el ID de un Paciente,
// busca en la base de datos el Paciente correspondiente utilizando el servicio "pacienteService.eliminarPaciente",
// elimina el Paciente de la base de datos si se encuentra, y devuelve una respuesta HTTP sin contenido.
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Long id)throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.ok("se elimino el odontologo con id : "+ id );
    }


}

