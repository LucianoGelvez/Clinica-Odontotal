import React, { useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../../components/utils/baseUrl.json";

const FormToUpdateProsthetist = ({
  data,
  onGuardar,
  onCancelar,
  informacionCompleta,
  jwt,
}) => {
  const [id, setId] = useState(data.id);
  const [nombre, setNombre] = useState(data.nombre);
  const [apellido, setApellido] = useState(data.apellido);
  const [email, setEmail] = useState(data.email);
  const [documento, setDocumento] = useState(data.documento);
  const [telefono, setTelefono] = useState(data.telefono);
  const [matricula, setMatricula] = useState(data.matricula);
  const [especialidadProtecista, setEspecialidad] = useState(
    data.especialidadProtecista
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      especialidadProtecista: especialidadProtecista,
      documento: documento,
      telefono: telefono,
      matricula: matricula,
    };

    const url = baseUrl.url + `/protecistas`;
    const confirmResult = await Swal.fire({
      title: "Confirmar datos",
      text: `¿Esta seguro que desea modificar los datos del protecista ${data.nombre} ${data.apellido}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });
    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          Swal.fire({
            title: "Protecista actualizado correctamente",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.pathname = "/ListaDeProtecistas";
            }else{
                window.location.pathname = "/ListaDeProtecistas";
            }
          });
        } else {
          console.error("Error al enviar los datos");
          Swal.fire({
            icon: "error",
            title: "Error en la modificacion",
            text: "Por favor, verifique los campos nuevamente.",
          });
        }
      } catch (error) {
        console.error("Error en la conexión", error);
      }
    }
  };

  const onCancelarClick = (e) => {
    e.preventDefault();
    onCancelar();
  };

  // Busca la informacion correspondiente a la tabla sin la fila que se está editando
  const informacionFila = informacionCompleta.filter((item) => item.id !== id);

  return (
    <div className="main_update">
      <form onSubmit={handleSubmit} className="main_update__form">
        <div className="form-group">
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Apellido:
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Matrícula:
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Teléfono:
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Especialidad:
            <input type="text" value="PROTECISTA" />
          </label>
        </div>
        <div className="form_group__btn">
          <button type="submit">Guardar</button>
          <button className="cancel-change" onClick={onCancelarClick}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormToUpdateProsthetist;
