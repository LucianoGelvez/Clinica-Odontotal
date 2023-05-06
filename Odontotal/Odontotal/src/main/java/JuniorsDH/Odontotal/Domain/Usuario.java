//package JuniorsDH.Odontotal.Domain;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import javax.persistence.*;
//import java.util.Collection;
//import java.util.Collections;
//
//
//@Entity
//@Table(name = "Usuarios")
//public class Usuario implements UserDetails {
//
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//
//    @Column
//    private String nombre;
//    @Column
//    private String apellido;
//
//    @Column(unique = true)
//    private String email;
//    @Column
//    private String password;
//
//
//
//@Enumerated(EnumType.STRING)
//    private UsuarioRol rol;
//
//
//    public Usuario(String nombre, String apellido, String email, String password, UsuarioRol rol) {
//        this.nombre = nombre;
//        this.apellido = apellido;
//        this.email = email;
//        this.password = password;
//        this.rol =  rol;
//    }
//
//
//
//    public Usuario() {
//    }
//
//
//
//    public Usuario(Long id, String nombre, String apellido, String email, String password, UsuarioRol rol) {
//        this.id = id;
//        this.nombre = nombre;
//        this.apellido = apellido;
//        this.email = email;
//        this.password = password;
//        this.rol = rol;
//    }
//
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//
//            SimpleGrantedAuthority grantedAuthority= new SimpleGrantedAuthority(rol.name());
//            return Collections.singletonList(grantedAuthority);
//    }
//
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return email;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}


package JuniorsDH.Odontotal.Domain;
import javax.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String email;

    @Column
    private String password;

    @Enumerated(EnumType.STRING)
    private UsuarioRol rol;

    public Usuario(String user, String password, UsuarioRol rol) {
        this.email = user;
        this.password = password;
        this.rol = rol;
    }

    public Usuario() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UsuarioRol getRol() {
        return rol;
    }

    public void setRol(UsuarioRol rol) {
        this.rol = rol;
    }
}
