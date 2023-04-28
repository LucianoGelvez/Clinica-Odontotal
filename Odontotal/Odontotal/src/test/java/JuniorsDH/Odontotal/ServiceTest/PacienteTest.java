package JuniorsDH.Odontotal.ServiceTest;


import JuniorsDH.Odontotal.Domain.Domicilio;
import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.PacienteService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;



@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class PacienteTest {

    @Autowired
    private PacienteService pacienteService;

    @Test
    @Order(1)
    public void guardarPaciente() throws DataInvalidException {


        Domicilio domicilio1=new Domicilio("rubi","123","trompso","oslo");
        PacienteDto paciente1=new PacienteDto("ruiz","tomas",domicilio1);
       PacienteDto pacienteaGuardar= pacienteService.agregarPaciente(paciente1);
        assertTrue(pacienteaGuardar.getIdPaciente().describeConstable().isPresent());

    }

    @Test
    @Order(2)
    public void buscarPaciente() throws ResourceNotFoundException {
        Long id=1L;

        Optional<PacienteDto> pacienteaBuscar= pacienteService.listarPaciente(id);

        assertNotNull(pacienteaBuscar.get());




    }


    @Test
    @Order(3)
    public void listarTodosPacientes() throws ResourceNotFoundException, DataInvalidException {

        Domicilio domicilio1 = new Domicilio("Algala", "111", "vn", "ny");
        PacienteDto paciente1=new PacienteDto("ruiz","tomas",domicilio1);
        pacienteService.agregarPaciente(paciente1);



        List<PacienteDto> pacientesListados = pacienteService.listarTodosPacientes();

        assertTrue( pacientesListados.size()>2);

    }



    @Test
    @Order(4)
    public void modificarPaciente() throws ResourceNotFoundException, DataInvalidException {

        Domicilio domicilio1=new Domicilio(1L,"rubi","123","trompso","oslo");
        PacienteDto paciente1=new PacienteDto(1L,"ruiz","tomas",domicilio1);
        PacienteDto pacienteGuardado= pacienteService.agregarPaciente(paciente1);

        PacienteDto pacienteModificado= new PacienteDto(1L,"ruiz","tomas",domicilio1);
        PacienteDto pacienteModificadoDevuelto= pacienteService.modificarPaciente(pacienteModificado);


       Optional<PacienteDto> pacienteBuscado= pacienteService.listarPaciente(pacienteModificadoDevuelto.getIdPaciente());

       Assertions.assertEquals(pacienteModificado.getIdPaciente(),pacienteModificadoDevuelto.getIdPaciente());



    }


    @Test
    @Order(5)
    public void eliminarPaciente() throws ResourceNotFoundException, DataInvalidException {

        Domicilio domicilio1 = new Domicilio("Algala", "111", "vn", "ny");
        PacienteDto paciente1 = new PacienteDto("ruiz","tomas",domicilio1);
        PacienteDto pacienteGuardado = pacienteService.agregarPaciente(paciente1);

        pacienteService.eliminarPaciente(pacienteGuardado.getIdPaciente());

        assertThrows(ResourceNotFoundException.class, () -> {
            pacienteService.listarPaciente(pacienteGuardado.getIdPaciente());
        });

    }



}
