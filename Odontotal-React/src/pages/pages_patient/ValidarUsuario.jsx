import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import baseUrl from '../../components/utils/baseUrl.json'

import './validarUsuario.css'

import Swal from "sweetalert2";

const ValidarUsuario = () => {

  const { id } = useParams();

  const validarUsuario = async () => {
    try {
      Swal.fire({
        icon: 'info',
        title: 'Validando usuario...',
        text: 'Por favor espere',
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(
          `${baseUrl.url}/pacientes/validar/${id}`,
          {
              method: 'PUT',
          }
      );

      if(response.ok){
          Swal.fire({
            icon: 'success',
            title: 'Usuario validado!',
            text: 'Ya puedes iniciar sesión',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0077ff'
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href="/"
            }
          });

          return;
      }

      throw new Error(await response.text());
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...Algo salio mal!',
        text: error ? error : 'No se pudo validar el usuario. Refresque la pagina para volver a intentarlo',
        showConfirmButton: error === 'Error: La cuenta ya está validada',
        confirmButtonText: 'Volver a intentar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
        window.location.pathname="/"
      });
    }

  }

  useEffect(() => {
    validarUsuario();
  })

  return <main className="validarUsuario">
  </main>
}

export default ValidarUsuario;
