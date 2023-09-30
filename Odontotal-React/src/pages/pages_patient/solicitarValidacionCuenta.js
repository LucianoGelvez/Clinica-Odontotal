import Swal from "sweetalert2";

import baseUrl from "../../components/utils/baseUrl.json";
import showError from "./showError";

const solicitarValidacionCuenta = async (user, jwt) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const response = await fetch(`${baseUrl.url}/pacientes/${user.id}`, config);
    user = await response.json();
  } catch (_) {
    showError("Error al cargar los datos del usuario");
  }

  if (!user?.validado) {
    const now = new Date();
    const fechaCreacion = new Date(user.fechaCreacion);
    let html = "";
    if (Math.abs(fechaCreacion - now) / 36e5 > 48) {
      try {
        const response = await fetch(`${baseUrl.url}/pacientes/${user.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (response.status === 200) {
          localStorage.removeItem("user");
          localStorage.removeItem("jwt");
        }
      } catch (_) {
        showError();
      }

      html = `
        <p>Lo sentimos, pero tu cuenta ha sido eliminada por no haberla validado a tiempo.</p>
        <p>Si deseas seguir usando la aplicación, puedes crear una nueva cuenta.</p>
      `;
      Swal.fire({
        title: "Validación de cuenta",
        html: html,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Crear nueva cuenta",
      }).then((result) => {
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");

        if (result.isConfirmed) {
          window.location.href = "/Registro";
          return;
        }

        window.location.href = "/";
      });
    } else {
      html = `
        <p>Para poder seguir usando la aplicación, es necesario que valides tu cuenta.</p>
        <p>Recuerda que cuentas con 48 horas para validar tu cuenta, de lo contrario, tu cuenta será eliminada.</p>
        <p>Tiempo restante: ${Math.round(
          48 - Math.abs(fechaCreacion - now) / 36e5
        )} horas</p>
        <p>Si no recibiste el correo de validación, puedes solicitar uno nuevo dando click en el botón de <b>Enviar correo de validación</b></p>
      `;
      Swal.fire({
        title: "Validación de cuenta",
        html: html,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Enviar correo de validación",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            Swal.fire({
              title: "Enviando correo de validación",
              text: "Por favor, espere un momento",
              icon: "info",
              showConfirmButton: false,
            });
            const response = await fetch(
              `${baseUrl.url}/mail/validacion/${user.id}`,
              config
            );
            if (response.status == 200) {
              Swal.fire({
                title: "Correo enviado",
                text: "Se ha enviado un correo electrónico a tu cuenta con un enlace para validar tu cuenta.",
                icon: "info",
                timer: 5000,
                timerProgressBar: true,
              });
            }
          } catch (_) {
            showError("Oops... Algo salió mal!");
          }
        }
      });
    }
  }
};

export default solicitarValidacionCuenta;
