package JuniorsDH.Odontotal.Dto;

public class ProtecistaDto {

    private Long id;
    private String nombre;
    private String apellido;
    private String especialidadProtecista;

    public ProtecistaDto(Long id, String nombre, String apellido, String especialidadProtecista) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidadProtecista = especialidadProtecista;
    }

    public ProtecistaDto(String nombre, String apellido, String especialidadProtecista) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidadProtecista = especialidadProtecista;
    }

    public ProtecistaDto() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEspecialidadProtecista() {
        return especialidadProtecista;
    }

    public void setEspecialidadProtecista(String especialidadProtecista) {
        this.especialidadProtecista = especialidadProtecista;
    }

    @Override
    public String toString() {
        return "ProtecistaDto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", especialidad='" + especialidadProtecista + '\'' +
                '}';
    }
}
