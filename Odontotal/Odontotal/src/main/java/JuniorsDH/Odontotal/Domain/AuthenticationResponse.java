package JuniorsDH.Odontotal.Domain;

import JuniorsDH.Odontotal.Dto.UsuarioDto;
public class AuthenticationResponse {
    private final String jwt;
    private final UsuarioDto usuarioDto;
    public AuthenticationResponse(String jwt, UsuarioDto usuarioDto) {
        this.jwt = jwt;
        this.usuarioDto = usuarioDto;
    }

    public String getJwt() {
        return jwt;
    }

    public UsuarioDto getUsuarioDto() {
        return usuarioDto;
    }
}
