package JuniorsDH.Odontotal.utils;

import JuniorsDH.Odontotal.Dto.TurnoDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MailUtil {
    @Value("${frontend.url}")
    private String frontendUrl;

    private final ClassLoader classLoader = getClass().getClassLoader();

    public MailUtil() {
    }

    /**
     * Método que genera el correo de validación de cuenta
     * 
     * @param url  URL de validación de cuenta
     * @param user Usuario al que se le envía el correo
     * @return Cuerpo del correo de validación de cuenta
     */
    public String correoValidacion(String url, String user) throws IOException {
        String template = new String(classLoader.getResourceAsStream("templates/validacion.html").readAllBytes(),
                StandardCharsets.UTF_8);

        Document doc = Jsoup.parse(template, "UTF-8");

        Elements homeLinks = doc.getElementsByClass("home-link");
        homeLinks.attr("href", frontendUrl);

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + user + "!</h2>");

        Element validateLink = doc.getElementById("validate-link");
        if (validateLink == null) {
            throw new IOException("No se ha encontrado el elemento con id validate-link");
        }
        validateLink.attr("href", url);

        return doc.toString();
    }

    /**
     * Método que genera el correo de bienvenida
     * 
     * @param user Usuario al que se le envía el correo
     * @return Cuerpo del correo de bienvenida
     */
    public String correoBienvenida(String user) throws IOException {
        String template = new String(classLoader.getResourceAsStream("templates/bienvenida.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + user + "!</h2>");

        return doc.toString();
    }

    /**
     * @param turnoDto Turno que se registra
     * @return Cuerpo del correo de registro de turno
     */
    public String correoTurno(TurnoDto turnoDto) throws Exception {
        String template = new String(classLoader.getResourceAsStream("templates/turno.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element especialidad = doc.getElementById("especialidad");
        especialidad.after("<span>" + turnoDto.getEspecialidad().replace("ESPECIALIDAD_", "").replace("_"," ") + "</span> <br>");

        Element nombreOdontologo = doc.getElementById("nombreOdontologo");
        nombreOdontologo.after("<span>" + turnoDto.getNombreOdontologo() + " " + turnoDto.getApellidoOdontologo() + "</span> <br>");

        Element nombrePaciente = doc.getElementById("nombrePaciente");
        nombrePaciente.after("<span>" + turnoDto.getNombrePaciente()+ " " +turnoDto.getApellidoPaciente() + "</span> <br>");


        Element fecha = doc.getElementById("fecha");
        fecha.after("<span>" + turnoDto.getFecha() + "</span> <br>");

        Element hora = doc.getElementById("hora");
        hora.after("<span>" + turnoDto.getHora() + "</span> <br>");

        return doc.toString();
    }

}
