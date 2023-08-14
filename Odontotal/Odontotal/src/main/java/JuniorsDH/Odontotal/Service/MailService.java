package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Dto.PacienteDto;
import JuniorsDH.Odontotal.Dto.TurnoDto;
import JuniorsDH.Odontotal.Exception.MailSenderException;
import JuniorsDH.Odontotal.enums.MailEnum;
import JuniorsDH.Odontotal.utils.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.logging.Logger;

@Component
@EnableAsync
public class MailService {

    @Autowired
    private JavaMailSender emailSender;

    private final static Logger logger = Logger.getLogger(MailService.class.getName());

    @Value("${spring.mail.username}")
    private String username;

    @Value("${frontend.url}")
    private String frontendUrl;

    private final MailUtil mailUtil = new MailUtil();

    /**
     * Envía un correo electrónico
     * @param to Correo electrónico del destinatario
     * @param subject Asunto del correo
     * @param body Cuerpo del correo en html
     * @throws MailSenderException Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void sendMail(String to, String subject, String body) throws MailSenderException {
        logger.info("Begin sendMail");
        try {
            MimeMessage message = emailSender.createMimeMessage();
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setFrom(new InternetAddress(username));
            message.setSubject(subject);
            message.setContent(body, "text/html");
            emailSender.send(message);
        } catch (Exception e) {
            logger.warning(e.getMessage());
            throw new MailSenderException(e.getMessage());
        } finally {
            logger.info("End sendMail");
        }
    }

    /**
     * Envía un correo de validación de cuenta
     * @param pacienteDto Usuario al que se le enviará el correo
     * @throws Exception Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void enviarCorreoValidacion(PacienteDto pacienteDto) throws Exception {
        String url = frontendUrl + "usuario/validar/" + pacienteDto.getId();
        String body = mailUtil.correoValidacion(url, pacienteDto.getNombre() + " " + pacienteDto.getApellido());
        sendMail(pacienteDto.getEmail(), MailEnum.VALIDACION_CUENTA.toString(), body);
    }

    /**
     * Envía correo de bienvenida al usuario
     * @param pacienteDto Usuario al que se le enviará el correo
     * @throws Exception Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void enviarCorreoBienvenida(PacienteDto pacienteDto) throws Exception {
        String body = mailUtil.correoBienvenida(pacienteDto.getNombre() + " " + pacienteDto.getApellido());
        sendMail(pacienteDto.getEmail(), MailEnum.BIENVENIDA.toString(), body);
    }

    /**
     * Envia correo de registro de reserva
     *
     * @param turnoDto Informacion del turno
     * @param email Email del usuario al que se envía
     * @throws Exception Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void enviarCorreoTurno(String email, TurnoDto turnoDto) throws Exception {
        String body = mailUtil.correoTurno(turnoDto);
        sendMail(email, MailEnum.TURNO.toString(), body);
    }
}
