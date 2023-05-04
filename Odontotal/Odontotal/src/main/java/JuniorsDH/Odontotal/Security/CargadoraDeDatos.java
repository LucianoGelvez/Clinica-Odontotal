package JuniorsDH.Odontotal.Security;
import JuniorsDH.Odontotal.Domain.Usuario;
import JuniorsDH.Odontotal.Domain.UsuarioRol;
import JuniorsDH.Odontotal.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;



@Component
public class CargadoraDeDatos implements ApplicationRunner {


    private UsuarioRepository usuarioRepository;

    @Autowired
    public CargadoraDeDatos(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }



    @Override
    public void run(ApplicationArguments args) {


        BCryptPasswordEncoder cifrador=new BCryptPasswordEncoder();

//        String passCifradaUser=cifrador.encode("usuario123");
//        Usuario usuarioAInsertar = new Usuario( "usuarioRandom","randomApe","emailUsuarios@gmail.com",passCifradaUser, UsuarioRol.ROLE_USER);


//        try{
//            usuarioRepository.save(usuarioAInsertar);
//        }catch (Exception e){
//            e.printStackTrace();
//        }


        String passCifradaAdmin= cifrador.encode("admin123");
        Usuario usuarioAInsertar = new Usuario("adminRandom","adminApe","emailAdministradores@gmail.com",passCifradaAdmin, UsuarioRol.ROLE_ADMIN);



        try{
            usuarioRepository.save(usuarioAInsertar);
        }catch (Exception e){
            e.printStackTrace();
        }



        String passCifradaOdontologo= cifrador.encode("odontologo123");
        usuarioAInsertar = new Usuario("odontologoRandom","odontologoApe","emailOdontologos@gmail.com",passCifradaOdontologo, UsuarioRol.ROLE_ONTOLOGY);



        try{
            usuarioRepository.save(usuarioAInsertar);
        }catch (Exception e){
            e.printStackTrace();
        }




        String passCifradaPaciente= cifrador.encode("paciente123");
        usuarioAInsertar = new Usuario("pacienteRandom","pacienteApe","emailpacientes@gmail.com",passCifradaPaciente, UsuarioRol.ROLE_PATIENT);



        try{
            usuarioRepository.save(usuarioAInsertar);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
