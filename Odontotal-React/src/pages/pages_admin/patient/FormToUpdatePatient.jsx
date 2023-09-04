import React, { useState } from "react";
import baseUrl from "../../../components/utils/baseUrl.json";
import Swal from "sweetalert2";

const FormToUpdatePatient = ({
  data,
  onCancelar,
  informacionCompleta,
  jwt,
}) => {
  const [idPaciente, setid] = useState(data.id);
  const [nombre, setNombre] = useState(data.nombre);
  const [apellido, setApellido] = useState(data.apellido);
  const [documento, setDocumento] = useState(data.documento);
  const [genero, setGenero] = useState(data.genero);
  const [calle, setCalle] = useState(data.calle);
  const [localidad, setLocalidad] = useState(data.localidad);
  const [numero, setNumero] = useState(data.numero);
  const [provincia, setProvincia] = useState(data.provincia);
  const [email, setEmail] = useState(data.email);
  const [fechaNacimiento, setFechaNacimiento] = useState(data.fechaNacimiento);
  const [telefono, setTelefono] = useState(data.telefono);
  const [password, setPassword] = useState(data.password);
  const [rol, setRol] = useState(data.rol);
  const [urlImagen, setUrl] = useState(data.urlImagen);
  const [validado, setValidado] = useState(data.validado);
  const [fechaCreacion, setFechaCreacion] = useState(data.fechaCreacion);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: idPaciente,
      apellido: apellido,
      nombre: nombre,
      documento: documento,
      fechaNacimiento: fechaNacimiento,
      genero: genero,
      telefono: telefono,
      email: email,
      rol: rol,
      calle: calle,
      numero: numero,
      localidad: localidad,
      provincia: provincia,
      validado: validado,
      urlImagen: urlImagen,
      fechaCreacion: fechaCreacion,
      password: password,
    };
    console.log(formData);

    const url = baseUrl.url + `/pacientes`;

    const confirmResult = await Swal.fire({
      title: "Confirmar datos",
      text: `¿Esta seguro que desea modificar los datos del paciente ${data.nombre} ${data.apellido}?`,
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
            title: "Paciente actualizado correctamente",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.pathname = "/ListaDePacientes";
            }
          });
        } else {
          console.error("Error al enviar los datos");
          Swal.fire({
            icon: "error",
            title: "Error en la modificación",
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
  const informacionFila = informacionCompleta.filter(
    (item) => item.idPaciente !== idPaciente
  );

  return (
    <div className="main_update">
      <form onSubmit={handleSubmit} className="main_update__form">
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="apellido">
            Apellido:
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="documento">
         
            Documento:
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">
            Fecha de Nacimiento:
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="telefono">
            Telefono personal:
            <input
              type="number"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Contraseña:
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="genero">
            Género:
          </label>
          <select
            className="form-control"
            id="genero"
            name="genero"
            value={genero}
            onChange={(e) => setTelefono(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="NoBinario">No binario</option>
            <option value="Transgenero">Transgénero</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="calle">
            Calle:
            <input
              type="text"
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="localidad">
            Localidad:
            <input
              type="text"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="numero">
            Numero:
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="provincia">
            Provincia:
            <input
              type="text"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            />
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
export default FormToUpdatePatient;
