package JuniorsDH.Odontotal.Security;

import JuniorsDH.Odontotal.Security.jwt.JwtRequestFilter;
import JuniorsDH.Odontotal.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usuarioService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
       http
               .csrf().disable()
               .authorizeRequests()
               .antMatchers( "/login", "/pacientes/registrar","/usuarios", "/odontologos/listAll").permitAll()
               .antMatchers("/odontologos/**").hasAnyAuthority( "ADMIN","ODONTOLOGY")
               .antMatchers("/pacientes/**").hasAnyAuthority("ADMIN","PATIENT","ODONTOLOGY")
               .antMatchers("/protecistas/**").hasAnyAuthority("ADMIN")
               .antMatchers("/turnos/**").hasAnyAuthority("ADMIN","ODONTOLOGY","PATIENT")
               .antMatchers(HttpMethod.GET, "/protecistas/{id}","/protecistas").hasAnyAuthority("ODONTOLOGY")
               .antMatchers(HttpMethod.PUT, "/protecistas/{id}").hasAnyAuthority("ODONTOLOGY")

               .anyRequest().authenticated()
               .and()
               .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
       http.cors();
       http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
