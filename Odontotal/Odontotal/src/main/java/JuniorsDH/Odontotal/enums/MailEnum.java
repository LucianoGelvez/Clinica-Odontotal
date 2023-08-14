package JuniorsDH.Odontotal.enums;

/**
 * Enum relacionado con el envío de correos electrónicos
 */
public enum MailEnum {
    VALIDACION_CUENTA("Validación de cuenta"),
    BIENVENIDA("Bienvenido a la aplicación"),
    TURNO("Turno reservado");

    private final String asunto;

    MailEnum(String asunto) {
        this.asunto = asunto;
    }

    @Override
    public String toString() {
        return this.asunto;
    }
}
