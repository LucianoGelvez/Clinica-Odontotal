package JuniorsDH.Odontotal.ServiceTest;

import JuniorsDH.Odontotal.Domain.Especialidad;
import JuniorsDH.Odontotal.Dto.OdontologoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.OdontologoService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class OdontologoTest {

    @Autowired
    private OdontologoService odontologoService;

    @Test
    @Order(1)
    public void agregarOdontologo() throws DataInvalidException {

        OdontologoDto odontologo1= new OdontologoDto("nombre1","apellido1",Especialidad.ESPECIALIDAD_ORTODONCISTA.name());

        OdontologoDto odontologoAgregado= odontologoService.agregarOdontologo(odontologo1);


    assertTrue(odontologoAgregado.getId().describeConstable().isPresent());

    }


    @Test
    @Order(2)
    public void buscarOdontologo() throws ResourceNotFoundException {

        Long id=1L;



        Optional<OdontologoDto> odontologoBuscado= odontologoService.listarOdontologo(id);

        assertNotNull(odontologoBuscado.get());


    }


    @Test
    @Order(3)
    public void buscarTodosOdontologos () throws DataInvalidException, ResourceNotFoundException {

        OdontologoDto odontologo1= new OdontologoDto("pablo","rubeno",Especialidad.ESPECIALIDAD_ODONTOPEDIATRIA.name());

        odontologoService.agregarOdontologo(odontologo1);

        List<OdontologoDto> odontologosList = odontologoService.listarTodosOdontologo();


    assertTrue( odontologosList.size()>2);
    }


    @Test
    @Order(4)
    public void modificarOdontologo() throws ResourceNotFoundException, DataInvalidException {


        OdontologoDto odontologo= new OdontologoDto(1L,"juan", "pablo", Especialidad.ESPECIALIDAD_ORTODONCISTA.name());
        OdontologoDto odontologoGuardado= odontologoService.agregarOdontologo(odontologo);

        OdontologoDto odontologoModificado= new OdontologoDto(1L,"ra", "luciano",Especialidad.ESPECIALIDAD_ODONTOPEDIATRIA.name());

        OdontologoDto odontologoModificadoDevuelto= odontologoService.modificarOdontologo(odontologoModificado);

        Optional<OdontologoDto> odontologoBuscado= odontologoService.listarOdontologo(odontologoModificadoDevuelto.getId());
        Assertions.assertEquals(odontologoModificado.getId(),odontologoModificadoDevuelto.getId());

    }


    @Test
    @Order(5)
    public void eliminarOdontologo() throws ResourceNotFoundException, DataInvalidException {
        OdontologoDto odontologo = new OdontologoDto(10L,"odo1", "apeOdo", Especialidad.ESPECIALIDAD_ORTODONCISTA.name());
        odontologoService.agregarOdontologo(odontologo);

        odontologoService.eliminarOdontologo(odontologo.getId());

        assertFalse(odontologoService.listarTodosOdontologo().contains(odontologo));
    }
}
