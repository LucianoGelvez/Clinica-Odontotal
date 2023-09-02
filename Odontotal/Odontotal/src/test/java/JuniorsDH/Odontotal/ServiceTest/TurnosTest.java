//package JuniorsDH.Odontotal.ServiceTest;
//import JuniorsDH.Odontotal.Domain.Domicilio;
//import JuniorsDH.Odontotal.Domain.Especialidad;
//import JuniorsDH.Odontotal.Dto.OdontologoDto;
//import JuniorsDH.Odontotal.Dto.PacienteDto;
//import JuniorsDH.Odontotal.Dto.TurnoDto;
//import JuniorsDH.Odontotal.Exception.DataInvalidException;
//import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
//import JuniorsDH.Odontotal.Service.OdontologoService;
//import JuniorsDH.Odontotal.Service.PacienteService;
//import JuniorsDH.Odontotal.Service.TurnoService;
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//@SpringBootTest
//public class TurnosTest {
//
//    @Autowired
//    TurnoService turnoService;
//
//    @Autowired
//    PacienteService pacienteService;
//
//    @Autowired
//    OdontologoService odontologoService;
//
//    @Test
//    @Order(1)
//    public void guardarTurno() throws DataInvalidException, ResourceNotFoundException {
//
//        Long ultimoIDTurno= turnoService.obtenerUltimoIdAsc();
//        Long ultimoIDPaciente=pacienteService.obtenerUltimoIdAsc();
//        Long ultimoIDOdontologo=odontologoService.obtenerUltimoIdAsc();
//
//        OdontologoDto odontologo = new OdontologoDto(ultimoIDOdontologo+1,"Franco", "Ribera", Especialidad.ESPECIALIDAD_ORTODONCISTA.name());
//        odontologoService.agregarOdontologo(odontologo);
//
//        Domicilio domicilio = new Domicilio(ultimoIDPaciente+1,"Costanera", "123", "Villa Maria", "Cordoba");
//        PacienteDto paciente = new PacienteDto(ultimoIDPaciente+1,"perez","juan",domicilio,"123456");
//        pacienteService.agregarPaciente(paciente);
//
//
//
//        TurnoDto turno = new TurnoDto(ultimoIDTurno+1,LocalDate.of(2023, 4, 15), LocalTime.of(10,30),paciente.getIdPaciente(),paciente.getNombre(), paciente.getDocumento(), odontologo.getId(),odontologo.getNombre());
//
//
//        TurnoDto turnoGuardado = turnoService.agregarTurno(turno);
//
//        assertTrue(turnoGuardado.getId().describeConstable().isPresent());
//
//
//
//
//
//}
//
//
//    @Test
//    @Order(2)
//    public  void listarTurno() throws ResourceNotFoundException {
//     Long id=16L;
//
//        Optional<TurnoDto> turnoBuscado = turnoService.listarTurnoOptional(id);
//        assertNotNull(turnoBuscado.get());
//
//    }
//
//
//
//    @Test
//    @Order(3)
//    public void listarTodosTurnos() throws DataInvalidException, ResourceNotFoundException {
//
//        Long ultimoIDTurno= turnoService.obtenerUltimoIdAsc();
//        Long ultimoIDPaciente=pacienteService.obtenerUltimoIdAsc();
//        Long ultimoIDOdontologo=odontologoService.obtenerUltimoIdAsc();
//
//
//
//        OdontologoDto odontologo = new OdontologoDto(ultimoIDOdontologo+1,"Franco", "Ribera", Especialidad.ESPECIALIDAD_ORTODONCISTA.name());
//
//        odontologoService.agregarOdontologo(odontologo);
//
//        Domicilio domicilio = new Domicilio(ultimoIDPaciente+1,"Cosac", "123", "v Maria", "Cordoba");
//
//
//        PacienteDto paciente = new PacienteDto(ultimoIDPaciente+1,"perez","juan",domicilio,"123456");
//
//
//        pacienteService.agregarPaciente(paciente);
//
//
//
//        TurnoDto turno = new TurnoDto(ultimoIDTurno+1,LocalDate.of(2023, 4, 15),LocalTime.of(10,30),paciente.getIdPaciente(),paciente.getNombre(), paciente.getDocumento(), odontologo.getId(),odontologo.getNombre());
//
//        TurnoDto turnoGuardado = turnoService.agregarTurno(turno);
//
//
//        List<TurnoDto> listaTurnos = turnoService.listarTodosTurno();
//
//        assertTrue(listaTurnos.size()>2);
//    }
//
//
//    @Test
//    @Order(4)
//    public void actualizarTurno() throws DataInvalidException, ResourceNotFoundException {
//        Long ultimoIDTurno= turnoService.obtenerUltimoIdAsc();
//        Long ultimoIDPaciente=pacienteService.obtenerUltimoIdAsc();
//        Long ultimoIDOdontologo=odontologoService.obtenerUltimoIdAsc();
//
//
//
//
//        OdontologoDto odontologo = new OdontologoDto(ultimoIDOdontologo+1,"Franco", "Ribera", Especialidad.ESPECIALIDAD_ORTODONCISTA.name());
//        odontologoService.agregarOdontologo(odontologo);
//
//        Domicilio domicilio = new Domicilio(ultimoIDPaciente+1,"Cosac", "123", "v Maria", "Cordoba");
//
//        PacienteDto paciente = new PacienteDto(ultimoIDPaciente+1,"perez","juan",domicilio,"123456");
//        pacienteService.agregarPaciente(paciente);
//
//        TurnoDto turno = new TurnoDto(ultimoIDTurno+1,LocalDate.of(2023, 4, 15),LocalTime.of(10,30),paciente.getIdPaciente(),paciente.getNombre(), paciente.getDocumento(), odontologo.getId(),odontologo.getNombre());
//
//        TurnoDto turnoGuardado = turnoService.agregarTurno(turno);
//
//        TurnoDto turnoModificado = new TurnoDto(ultimoIDTurno+1,LocalDate.of(2023, 4, 16),LocalTime.of(10,30),paciente.getIdPaciente(),paciente.getNombre(), paciente.getDocumento(), odontologo.getId(),odontologo.getNombre());
//        TurnoDto turnoModificadoDevuelto= turnoService.modificarTurno(turnoModificado);
//
//        Optional<TurnoDto> turnoBuscado = turnoService.listarTurnoOptional(turnoGuardado.getId());
//
//          Assertions.assertEquals(turnoModificado.getId(),turnoModificadoDevuelto.getId());
//
//    }
//
//
//    @Test
//    @Order(5)
//    public void eliminarTurno() throws DataInvalidException, ResourceNotFoundException {
//
//        Long ultimoIDTurno= turnoService.obtenerUltimoIdAsc();
//        Long ultimoIDPaciente=pacienteService.obtenerUltimoIdAsc();
//        Long ultimoIDOdontologo=odontologoService.obtenerUltimoIdAsc();
//
//        OdontologoDto odontologo = new OdontologoDto(ultimoIDOdontologo+1,"Franco", "Ribera", Especialidad.ESPECIALIDAD_ORTODONCISTA.name());
//        odontologoService.agregarOdontologo(odontologo);
//
//        Domicilio domicilio = new Domicilio(ultimoIDPaciente+1,"Cosac", "123", "v Maria", "Cordoba");
//
//        PacienteDto paciente = new PacienteDto(ultimoIDPaciente+1,"perez","juan",domicilio,"123456");
//        pacienteService.agregarPaciente(paciente);
//
//        TurnoDto turno = new TurnoDto(ultimoIDTurno+1,LocalDate.of(2023, 4, 16),LocalTime.of(10,30),paciente.getIdPaciente(),paciente.getNombre(), paciente.getDocumento(), odontologo.getId(),odontologo.getNombre());
//
//        turnoService.agregarTurno(turno);
//
//       turnoService.eliminarTurno(turno.getId());
//
//        assertFalse(turnoService.listarTodosTurno().contains(turno));
//
//    }
//
//}
