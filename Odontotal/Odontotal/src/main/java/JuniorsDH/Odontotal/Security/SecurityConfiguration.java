//package JuniorsDH.Odontotal.Security;
//
//
//import JuniorsDH.Odontotal.Service.UsuarioService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//
//
//    @Autowired
//    private UsuarioService usuarioService;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//
//       auth.authenticationProvider(daoAuthenticationProvider());
//    }
//
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//       http
//
//               .csrf().disable()
//               .authorizeRequests()
//               .antMatchers( "http://127.0.0.1:5173/","http://127.0.0.1:5173/Servicio", "http://127.0.0.1:5173/NuestroEquipo", "http://127.0.0.1:5173/Conocenos","http://127.0.0.1:5173/ReservarTurno", "http://127.0.0.1:5173/MisTurnos","http://127.0.0.1:5173/AgregarTurno",
//                       "http://127.0.0.1:5173/ListaDeTurnos", "http://127.0.0.1:5173/AgregarOdontologo", "http://127.0.0.1:5173/ListaDeOdontologos","http://127.0.0.1:5173/AgregarPaciente","http://127.0.0.1:5173/ListaDePacientes","http://127.0.0.1:5173/AgregarProtecistas",
//                       "http://127.0.0.1:5173/ListaDeProtecistas").hasAnyRole("PATIENT","ADMIN","ONTOLOGY")
//
//               .anyRequest().authenticated()
//               .and()
//               .formLogin()
//               .and()
//
//               .logout();
//
//    }
//
//
//
//
//    @Bean
//    public DaoAuthenticationProvider daoAuthenticationProvider (){
//        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
//        provider.setUserDetailsService(usuarioService);
//        provider.setPasswordEncoder(passwordEncoder);
//        return provider;
//    }
//}
