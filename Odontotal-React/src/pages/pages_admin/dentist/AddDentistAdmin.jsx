import React, { useContext, useState } from "react";
import { ContextGlobal } from "../../../components/utils/global.context";
import baseUrl from "../../../components/utils/baseUrl.json";
import "../../../styles/pagesStyles/AddDentistAdmin.css";
import Swal from "sweetalert2";

const AddDentistAdmin = () => {
  const { user, jwt } = useContext(ContextGlobal);

  const [formData, setFormData] = useState({
    apellido: "",
    nombre: "",
    email: "",
    password: "",
    documento: "",
    fechaNacimiento: "",
    genero: "",
    telefono: "",
    matricula: "",
    urlImagen: "",
    rol: "ODONTOLOGY",
    especialidad: "",
    calle: "",
    numero: "",
    localidad: "",
    provincia: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = baseUrl.url + "/odontologos";
    const confirmResult = await Swal.fire({
      title: "Confirmar datos",
      text: `¿Desea agregar el odontologo ${formData.nombre} ${formData.apellido}?`,
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Datos enviados correctamente");

          Swal.fire({
            title: "Odontólogo agregado correctamente",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              resetUploadForm();
            }
          });
        } else {
          console.error("Error al enviar los datos");
          Swal.fire({
            icon: "error",
            title: "Error al agregar odontólogo",
            text: "Por favor, verifique los campos nuevamente.",
          });
        }
      } catch (error) {
        console.error("Error en la conexión", error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No se puede agregar odontologo",
        text: "Por favor complete todos los campos.",
      });
    }
  };

  const resetUploadForm = () => {
    setFormData({
      apellido: "",
      nombre: "",
      email: "",
      password: "",
      documento: "",
      fechaNacimiento: "",
      genero: "",
      telefono: "",
      matricula: "",
      urlImagen: "",
      rol: "ODONTOLOGY",
      especialidad: "",
      calle: "",
      numero: "",
      localidad: "",
      provincia: "",
    });

    console.log(formData);
  };
  console.log(response);
  return (
    <div className="AddDentistAdmin">
      {user?.rol === "ADMIN" && (
        <div className="row">
          <form onSubmit={handleSubmit}>
            <h3>Agregar Odontólogo</h3>
            <div className="form-dentist-main">
              <div className="form-group">
                <label className="control-label" htmlFor="apellido">
                  Apellido:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  placeholder="Ingrese el apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="apellido">
                  {" "}
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Ingrese el nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="apellido">
                  {" "}
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Ingrese el email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="documento">
                  {" "}
                  Documento:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="documento"
                  placeholder="Ingrese el documento"
                  name="documento"
                  value={formData.documento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="password">
                  Contraseña:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  placeholder="Ingrese la contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="fechaNacimiento">
                  Fecha de nacimiento:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaNacimiento"
                  placeholder="Ingrese el fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="genero">
                  {" "}
                  Género:
                </label>

                <select
                  name="genero"
                  id="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  required
                >
                  <option selected>Selecciona una especialidad</option>
                  <option>Femenino</option>
                  <option>Masculino</option>
                  <option>NoBinario</option>
                  <option>Transgenero</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="telefono">
                  {" "}
                  Teléfono:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="telefono"
                  placeholder="Ingrese el teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="matricula">
                  {" "}
                  Matrícula:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="matricula"
                  placeholder="Ingrese la matrícula"
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="especialidad">
                  {" "}
                  Especialidad:
                </label>

                <select
                  name="especialidad"
                  id="especialidad"
                  value={formData.especialidad}
                  onChange={handleInputChange}
                  required
                >
                  <option selected>Selecciona una especialidad</option>
                  <option>ESPECIALIDAD_ORTODONCISTA</option>
                  <option>ESPECIALIDAD_PERIODONCISTA</option>
                  <option>ESPECIALIDAD_ENDODONCISTA</option>
                  <option>ESPECIALIDAD_ODONTOPEDIATRIA</option>
                  <option>ESPECIALIDAD_CIRUGIA_ORAL</option>
                  <option>ESPECIALIDAD_CIRUGIA_MAXILOFACIAL</option>
                  <option>ESPECIALIDAD_PROTESISTA</option>
                </select>
              </div>

              <div className="form-group">
                <label className="control-label" htmlFor="calle">
                  Calle:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="calle"
                  placeholder="Ingrese la calle"
                  name="calle"
                  value={formData.calle}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="numero">
                  Número:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numero"
                  placeholder="Ingrese el número"
                  name="numero"
                  value={formData.numero}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="localidad">
                  Localidad:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="localidad"
                  placeholder="Ingrese la localidad"
                  name="localidad"
                  value={formData.localidad}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="provincia">
                  Provincia:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="provincia"
                  placeholder="Ingrese la provincia"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <button>Cargar</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default AddDentistAdmin;
