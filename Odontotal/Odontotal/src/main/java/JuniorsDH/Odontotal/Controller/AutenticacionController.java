package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Domain.AuthenticationRequest;
import JuniorsDH.Odontotal.Domain.AuthenticationResponse;
import JuniorsDH.Odontotal.Dto.UsuarioDto;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Security.jwt.JwtUtil;
import JuniorsDH.Odontotal.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
public class AutenticacionController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private JwtUtil jwtUtil;

    private Logger logger = Logger.getLogger(AutenticacionController.class.getName());
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (AuthenticationException e) {
            logger.warning("Credenciales de inicio de sesión incorrectas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales de inicio de sesión incorrectas");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        logger.info("Iniciando sesión");
        UsuarioDto usuarioDto = null;
        try {
            usuarioDto = usuarioService.getUserByEmail(authenticationRequest.getEmail()).get();
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }
        AuthenticationResponse response = new AuthenticationResponse(jwt, usuarioDto);

        return ResponseEntity.ok(response);

    }


}
