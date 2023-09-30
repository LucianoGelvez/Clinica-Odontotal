import React, { useContext, useEffect, useState } from "react";
import "../styles/componentStyles/Register.css";
import Logo from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import baseUrl from "./utils/baseUrl.json";
import infoValidacionCuenta from "../pages/pages_patient/infoValidacionCuenta";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    apellido: "",
    nombre: "",
    email: "",
    password: "",
    documento: "",
    fechaNacimiento: "",
    genero: "",
    telefono: "",
    calle: "",
    numero: "",
    localidad: "",
    provincia: "",
    rol: "PATIENT",
  });

  const [showPassword, setShowPassword] = useState(false);

  const url_patients = baseUrl.url + "/pacientes/registrar";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(url_patients, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Datos enviados correctamente");
        Swal.fire({
          title: "Paciente registrado correctamente",
          text: `Paciente: ${formData.apellido} ${formData.nombre} , ha sido registrado con éxito.`,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
  
            const retriesData = {
              initialTime: Date.now(),
              retries: 0,
            };
            infoValidacionCuenta(responseData, setFormData, retriesData);
            navigate("/IniciarSesion");
          }
        });
      } else {
        console.error("Error al enviar los datos");
        Swal.fire({
          icon: "error",
          title: "Error al resgistrar paciente",
          text: "Por favor, verifique los campos nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error en la conexión", error);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <img src={Logo} alt="" />
            <h2>Registrarse</h2>
            <p>
              Al ser una clínica precisamos de los siguientes datos para su
              mejor atención
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label className="control-label" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
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
                <label className="control-label" htmlFor="password">
                  Contraseña:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Ingrese la contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={handleShowPassword}
                ></button>
              </div>
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
                <label className="control-label" htmlFor="nombre">
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
                <label className="control-label" htmlFor="documento">
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
                <label className="control-label" htmlFor="genero">
                  Género:
                </label>
                <select
                  className="form-control"
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  required
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
                <label className="control-label" htmlFor="telefono">
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

            <button>Agregar</button>
            {
              <Link to="/IniciarSesion">
                Si tienes cuenta, ¡Inicia sesión aquí!
              </Link>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
