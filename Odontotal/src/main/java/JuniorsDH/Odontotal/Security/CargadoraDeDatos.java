package JuniorsDH.Odontotal.Security;
import JuniorsDH.Odontotal.Domain.*;
import JuniorsDH.Odontotal.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;


@Component
public class CargadoraDeDatos implements ApplicationRunner {
    private UsuarioRepository usuarioRepository;
    private UsuarioRolRepository usuarioRolRepository;
    private OdontologoRepository odontologoRepository;
    private PacienteRepository pacienteRepository;

    private ProtecistaRepository protecistaRepository;

    @Autowired
    public CargadoraDeDatos(UsuarioRepository usuarioRepository, UsuarioRolRepository usuarioRolRepository, OdontologoRepository odontologoRepository, PacienteRepository pacienteRepository, ProtecistaRepository protecistaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioRolRepository = usuarioRolRepository;
        this.odontologoRepository = odontologoRepository;
        this.pacienteRepository = pacienteRepository;
        this.protecistaRepository = protecistaRepository;
    }

    @Override
    public void run(ApplicationArguments args) {

        BCryptPasswordEncoder cifrador = new BCryptPasswordEncoder();
        String passCifradaUser = cifrador.encode("12345");
        UsuarioRol rol = new UsuarioRol("ADMIN");
        Optional<UsuarioRol> rolEncontrado = usuarioRolRepository.findByRol("ADMIN");
        if (rolEncontrado.isEmpty()){
            try {
                usuarioRolRepository.save(rol);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioAdmin = new Domicilio("Principal","32","Kennedy","Bogotá");

        Usuario usuarioAInsertar = new Usuario("admin@gmail.com",passCifradaUser,"Juan","Pérez","12121221", LocalDate.of(2000,1,1),Genero.Masculino,123123L,"",domicilioAdmin,rol );
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmail(usuarioAInsertar.getEmail());
        if (usuarioEncontrado.isEmpty()){
            try {
                usuarioRepository.save(usuarioAInsertar);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        UsuarioRol rolOdontologo = new UsuarioRol("ODONTOLOGY");
        Optional<UsuarioRol> rolOdontolgoEncontrado = usuarioRolRepository.findByRol("ODONTOLOGY");
        if (rolOdontolgoEncontrado.isEmpty()){
            try {
                usuarioRolRepository.save(rolOdontologo);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        Domicilio domicilioOdontologo1 = new Domicilio("Jimenez","16","Suba","Bogotá");

        Odontologo odontologoAInsertar = new Odontologo("odontologo@gmail.com",passCifradaUser,"Mario","Beltrán","47345586",LocalDate.of(2000,1,1),Genero.Masculino,21314443L,domicilioOdontologo1,rolOdontologo,"ABC123",Especialidad.ESPECIALIDAD_ORTODONCISTA,"https://raw.githubusercontent.com/CesarMauricioRojas/odontotal-imagenes/main/dentist-1.jpg?token=GHSAT0AAAAAAB7VIMTX5WEDLZPENXWODWXEZHWB6FA");
        Optional<Odontologo> odontologoEncontrado= odontologoRepository.findByEmail(odontologoAInsertar.getEmail());
        if (odontologoEncontrado.isEmpty()){
            System.out.println(domicilioOdontologo1);
            System.out.println(domicilioOdontologo1);
            System.out.println(domicilioOdontologo1);
            try {
                odontologoRepository.save(odontologoAInsertar);
            } catch (Exception e) {
                e.printStackTrace();         System.out.println(domicilioOdontologo1);
                System.out.println(domicilioOdontologo1);
                System.out.println(domicilioOdontologo1);

            }
        }

        Domicilio domicilioOdontologo2 = new Domicilio("Libertadores","51","Central","Bogotá");
        Odontologo odontologoAInsertar2 = new Odontologo("odontologo2@gmail.com",passCifradaUser,"Camilo","Gonzaléz","53379843",LocalDate.of(2000,1,1),Genero.Masculino,21314443L,domicilioOdontologo2,rolOdontologo,"ABC123",Especialidad.ESPECIALIDAD_CIRUGIA_MAXILOFACIAL,"https://raw.githubusercontent.com/CesarMauricioRojas/odontotal-imagenes/main/dentist-2.jpg?token=GHSAT0AAAAAAB7VIMTXUQMRZKAELPJHWWEKZHWBZMA");
        odontologoEncontrado= odontologoRepository.findByEmail(odontologoAInsertar2.getEmail());
        if (odontologoEncontrado.isEmpty()){
            try {
                odontologoRepository.save(odontologoAInsertar2);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioOdontologo3 = new Domicilio("Carrera 10","25","Chapinero","Bogotá");
        Odontologo odontologoAInsertar3 = new Odontologo("odontologo3@gmail.com", passCifradaUser, "Luis", "Hernández", "61234567", LocalDate.of(1990, 5, 12), Genero.Masculino, 31254365L, domicilioOdontologo3, rolOdontologo, "DEF789", Especialidad.ESPECIALIDAD_ODONTOPEDIATRIA, "https://raw.githubusercontent.com/CesarMauricioRojas/odontotal-imagenes/main/dentist-3.jpg?token=GHSAT0AAAAAAB7VIMTWIVJPKNVDI6AZWNDOZHWB2HA");
        odontologoEncontrado = odontologoRepository.findByEmail(odontologoAInsertar3.getEmail());
        if (odontologoEncontrado.isEmpty()) {
            try {
                odontologoRepository.save(odontologoAInsertar3);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioOdontologo4 = new Domicilio("Avenida Sur","18","Kennedy","Bogotá");
        Odontologo odontologoAInsertar4 = new Odontologo("odontologo4@gmail.com", passCifradaUser, "Andrea", "Soto", "51238945", LocalDate.of(1985, 9, 28), Genero.Femenino, 32058641L, domicilioOdontologo4, rolOdontologo, "GHI567", Especialidad.ESPECIALIDAD_ENDODONCISTA, "https://raw.githubusercontent.com/CesarMauricioRojas/odontotal-imagenes/main/dentist-4.jpg?token=GHSAT0AAAAAAB7VIMTWAURLO5TVVY6CFAJAZHWB2UA");
        odontologoEncontrado = odontologoRepository.findByEmail(odontologoAInsertar4.getEmail());
        if (odontologoEncontrado.isEmpty()) {
            try {
                odontologoRepository.save(odontologoAInsertar4);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioOdontologo5 = new Domicilio("Calle 8","14","Chía","Cundinamarca");
        Odontologo odontologoAInsertar5 = new Odontologo("odontologo5@gmail.com", passCifradaUser, "Alejandro", "Ramírez", "72458963", LocalDate.of(1983, 3, 8), Genero.Masculino, 31845990L, domicilioOdontologo5, rolOdontologo, "JKL456", Especialidad.ESPECIALIDAD_CIRUGIA_ORAL, "https://raw.githubusercontent.com/CesarMauricioRojas/odontotal-imagenes/main/dentist-5.jpg?token=GHSAT0AAAAAAB7VIMTXPILW4J4XNEGVHFWWZHWB3FA");
        odontologoEncontrado = odontologoRepository.findByEmail(odontologoAInsertar5.getEmail());
        if (odontologoEncontrado.isEmpty()) {
            try {
                odontologoRepository.save(odontologoAInsertar5);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioOdontologo6 = new Domicilio("Carrera 5","30","Bucaramanga","Santander");
        Odontologo odontologoAInsertar6 = new Odontologo("odontologo6@gmail.com", passCifradaUser, "Carlos", "Gutiérrez", "92837465", LocalDate.of(1975, 11, 16), Genero.Masculino, 35048612L, domicilioOdontologo6, rolOdontologo, "MNO123", Especialidad.ESPECIALIDAD_PERIODONCISTA, "https://raw.githubusercontent.com/CesarMauricioRojas/odontotal-imagenes/main/dentist-6.jpg?token=GHSAT0AAAAAAB7VIMTX7NCNPWODBPXZJOYAZHWB3ZQ");
        odontologoEncontrado = odontologoRepository.findByEmail(odontologoAInsertar6.getEmail());
        if (odontologoEncontrado.isEmpty()) {
            try {
                odontologoRepository.save(odontologoAInsertar6);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }



        UsuarioRol rolPaciente = new UsuarioRol("PATIENT");
        Optional<UsuarioRol> rolPacienteEncontrado = usuarioRolRepository.findByRol("PATIENT");
        if (rolPacienteEncontrado.isEmpty()){
            try {
                usuarioRolRepository.save(rolPaciente);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioOdontologo7 = new Domicilio("Avenida Principal","12","Envigado","Antioquia");
        Odontologo odontologoAInsertar7 = new Odontologo("odontologo7@gmail.com", passCifradaUser, "Laura", "Gómez", "65478932", LocalDate.of(1992, 7, 21), Genero.Femenino, 31078692L, domicilioOdontologo7, rolOdontologo, "PQR789", Especialidad.ESPECIALIDAD_ORTODONCISTA, "");
        odontologoEncontrado = odontologoRepository.findByEmail(odontologoAInsertar7.getEmail());
        if (odontologoEncontrado.isEmpty()) {
            try {
                odontologoRepository.save(odontologoAInsertar7);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Optional<Protecista> protecistaEncontrado= protecistaRepository.findByEmail(odontologoAInsertar.getEmail());
        Protecista protecista1 = new Protecista("Lucho", "Partin", "AA221", "Protecista de cromo", 2613578, "lucho@gmail.com");
        if (protecistaEncontrado.isEmpty()) {
            try {
                protecistaRepository.save(protecista1);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Optional<Protecista> protecistaEncontrado2= protecistaRepository.findByEmail(odontologoAInsertar.getEmail());
        Protecista protecista2 = new Protecista("Parco", "Suman", "23fdas", "Protecista de cromo", 64645, "Parco@gmail.com");
        if (protecistaEncontrado2.isEmpty()) {
            try {
                protecistaRepository.save(protecista2);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Protecista protecista3 = new Protecista("Hidalgo", "Curta", "323asd", "Protecista de acrilico", 465452, "Hidalgo@gmail.com");
        Optional<Protecista> protecistaEncontrado3= protecistaRepository.findByEmail(odontologoAInsertar.getEmail());
        if (protecistaEncontrado3.isEmpty()) {
            try {
                protecistaRepository.save(protecista3);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioPaciente = new Domicilio("Corredor","14","Engativa","Cundinamarca");
        Paciente pacienteAInsertar = new Paciente("paciente@gmail.com",passCifradaUser,"Fulano","Gates","4534553", LocalDate.of(1990,1,1),Genero.Masculino,123123L,"",domicilioPaciente,rolPaciente,true, new Date(121, 1, 1));
        Optional<Paciente> pacienteEncontrado= pacienteRepository.findByEmail(pacienteAInsertar.getEmail());
        if (pacienteEncontrado.isEmpty()){
            System.out.println("CREAR PACIENTE");
            try {
                pacienteRepository.save(pacienteAInsertar);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioPaciente2 = new Domicilio("Avenida Central","45","Suba","Bogotá");
        Paciente pacienteAInsertar2 = new Paciente("paciente2@gmail.com", passCifradaUser, "Ana", "López", "7345678", LocalDate.of(1985, 9, 12), Genero.Femenino, 32147890L, "",domicilioPaciente2, rolPaciente, true, new Date(121, 1, 1));
        Optional<Paciente> pacienteEncontrado2 = pacienteRepository.findByEmail(pacienteAInsertar2.getEmail());
        if (pacienteEncontrado2.isEmpty()) {
            System.out.println("CREAR PACIENTE");
            try {
                pacienteRepository.save(pacienteAInsertar2);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Domicilio domicilioPaciente3 = new Domicilio("Calle 15","28","Chapinero","Bogotá");
        Paciente pacienteAInsertar3 = new Paciente("paciente3@gmail.com", passCifradaUser, "Juan", "Martínez", "9876543", LocalDate.of(1998, 6, 25), Genero.Masculino, 31578562L, "",domicilioPaciente3, rolPaciente, true, new Date(121, 1, 1));
        Optional<Paciente> pacienteEncontrado3 = pacienteRepository.findByEmail(pacienteAInsertar3.getEmail());
        if (pacienteEncontrado3.isEmpty()) {
            System.out.println("CREAR PACIENTE");
            try {
                pacienteRepository.save(pacienteAInsertar3);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


    }
}
