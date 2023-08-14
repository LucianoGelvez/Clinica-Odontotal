import baseUrl from '../../components/utils/baseUrl.json';
import Swal from 'sweetalert2';

const infoValidacionCuenta = (responseData, setFormData) => {
  const errorToast = (error = null) => {
    Swal.fire({
      title: 'Error',
      text: error ? error : 'Ha ocurrido un error al reenviar el correo de validación.',
      icon: 'error',
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timer: 5000,
      timerProgressBar: true,
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
  }

  const html = `
    <div style="text-align: left;">
      <p><b>${responseData.nombre + " " + responseData.apellido}</b>, recuerda validar tu cuenta.</p>
      <p>Se ha enviado un correo electrónico a <b>${responseData.email}</b> con un enlace para validar tu cuenta.</p>
      <p>Si no encuentras el correo electrónico, revisa tu carpeta de spam.</p>
    </div>
    `;

  Swal.fire({
    title: 'Validación de cuenta',
    html: html,
    icon: 'info',
    showConfirmButton: true,
    confirmButtonText: 'Re-enviar correo',
    confirmButtonColor: '#3085d6',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cerrar',
    position: 'center',
    preConfirm: async () => {
      try {
        // Reenviamos el correo
        const response = await fetch(baseUrl.url + `/mail/validacion/${responseData.id}`);
        if (response.status !== 200) {
          throw await response.text();
        };
        return false
      } catch (error) {
        await errorToast(error);
        return infoValidacionCuenta(responseData, setFormData);
      }
    }
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        return;
      }

      if (result.isDismissed) {
        setFormData({
          apellido: '',
          nombre: '',
          email:'',
          password:'',
          documento: '',
          fechaNacimiento: '',
          genero: '',
          telefono: '',
          calle: '',
          numero: '',
          localidad: '',
          provincia: '',
          rol:'PATIENT'
        })
        window.location.href = '/IniciarSesion';
      }
    })
    .catch(async (err) => {
      await errorToast();
      return infoValidacionCuenta(response, setFormData, { retries, initialTime });
    })

  return;
}

export default infoValidacionCuenta;
