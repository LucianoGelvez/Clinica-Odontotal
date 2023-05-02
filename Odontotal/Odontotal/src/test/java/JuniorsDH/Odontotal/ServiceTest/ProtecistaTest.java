package JuniorsDH.Odontotal.ServiceTest;


import JuniorsDH.Odontotal.Domain.Especialidad;
import JuniorsDH.Odontotal.Dto.OdontologoDto;
import JuniorsDH.Odontotal.Dto.ProtecistaDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.ProtecistaService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProtecistaTest {

    @Autowired
    private ProtecistaService protecistaService;

    @Test
    @Order(1)
    public void agregarProtecista() throws DataInvalidException, ResourceNotFoundException {
        Long ultimoID= protecistaService.obtenerUltimoIdAsc();

        ProtecistaDto protecistaDto =new ProtecistaDto(ultimoID+1,"juan","perez","espeA");

        ProtecistaDto protecistaAgregado= protecistaService.agregarProtecista(protecistaDto);


        assertTrue(protecistaAgregado.getId().describeConstable().isPresent());

    }




    @Test
    @Order(2)
    public void buscarProtecista() throws ResourceNotFoundException {
        Long id=3L;


        Optional<ProtecistaDto> protecistaBuscado= protecistaService.listarProtecista(id);

        assertNotNull(protecistaBuscado.get());

    }


    @Test
    @Order(3)
    public void buscarTodosProtecista () throws DataInvalidException, ResourceNotFoundException {

        Long ultimoID= protecistaService.obtenerUltimoIdAsc();

        ProtecistaDto protecistaDto1 =new ProtecistaDto(ultimoID+1,"juan","perez","espeA");

        protecistaService.agregarProtecista(protecistaDto1);

        List<ProtecistaDto> protecistaList = protecistaService.listarTodosProtecistas();


        assertTrue( protecistaList.size()>2);
    }


    @Test
    @Order(4)
    public void modificarProtecista() throws ResourceNotFoundException, DataInvalidException {

        Long ultimoID= protecistaService.obtenerUltimoIdAsc();

        ProtecistaDto protecistaDto1 =new ProtecistaDto(ultimoID+1,"juan","perez","espeA");
        ProtecistaDto protecistaGuardado=  protecistaService.agregarProtecista(protecistaDto1);

        ProtecistaDto protecistaModificado= new ProtecistaDto(ultimoID+1,"pablo","duarte","espex");

        ProtecistaDto protecistaModificadoDevuelto= protecistaService.modificarProtecista(protecistaModificado);

        Optional<ProtecistaDto>  protecistaBuscado= protecistaService.listarProtecista(protecistaModificadoDevuelto.getId());
        Assertions.assertEquals(protecistaModificado.getId(),protecistaModificadoDevuelto.getId());

    }


    @Test
    @Order(5)
    public void eliminarProtecista() throws ResourceNotFoundException, DataInvalidException {

        Long ultimoID= protecistaService.obtenerUltimoIdAsc();

        ProtecistaDto protecistaDto1 =new ProtecistaDto(ultimoID+1,"juan","perez","espeA");
        protecistaService.agregarProtecista(protecistaDto1);

        protecistaService.eliminarProtecista(protecistaDto1.getId());

        assertFalse(protecistaService.listarTodosProtecistas().contains(protecistaDto1));
    }

}
