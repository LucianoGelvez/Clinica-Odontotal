import Swal from "sweetalert2";

const showError = (error = 'Oops... Algo salió mal!') => {
  Swal.fire({
    title: "Error",
    text: error,
    icon: "error",
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    position: "top-end",
  });
};

export default showError;