import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextGlobal } from "../components/utils/global.context";
import baseUrl from "../components/utils/baseUrl.json";
import Swal from "sweetalert2";
import profilePic from "../images/profilePic.svg";
import "../styles/pagesStyles/Profile.css";

const Profile = () => {
  const { user, jwt } = useContext(ContextGlobal);
  const [dataPesonal, setData] = useState({});
  const local = JSON.parse(localStorage.getItem("user"));
  const [id, setId] = useState(local.id);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [password, setPassword] = useState("");
  const [genero, setGenero] = useState("");
  const [documento, setDocumento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [validado, setValidado] = useState(user.validado);
  const [urlImagen, setUrlImagen] = useState(user.urlImagen);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [changeImage, setChangeImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [showNombre, setShowNombre] = useState(false);
  const [showApellido, setShowApellido] = useState(false);
  const [showFechaDeNacimiento, setShowFechaDeNacimiento] = useState(false);
  const [showGenero, setShowGenero] = useState(false);
  const [showDocumento, setShowDocumento] = useState(false);
  const [showMatricula, setShowMatricula] = useState(false);
  const [showTelefono, setShowTelefono] = useState(false);
  const [showEspecialidad, setShowEspecialidad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCalle, setShowCalle] = useState(false);
  const [showNumero, setShowNumero] = useState(false);
  const [showLocalidad, setShowLocalidad] = useState(false);
  const [showProvincia, setShowProvincia] = useState(false);
  const [sureToDelete, setSureToDelete] = useState(false);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;

        switch (user.rol) {
          case "ODONTOLOGY":
            url = baseUrl.url + `/odontologos/${user.id}`;
            break;
          case "PATIENT":
            url = baseUrl.url + `/pacientes/${user.id}`;
            break;
          case "ADMIN":
            url = baseUrl.url + `/usuarios/${user.id}`;
          default:
            console.log("Invalid role");
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);
        setData(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  const handleDocumentClick = (event) => {
    if (
      imageRef.current &&
      !imageRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setChangeImage(false);
      let listEdit = document.querySelectorAll(".edit");
      listEdit.forEach((element) => {
        element.classList.remove("dispel");
      });
    }

    if (
      deleteRef.current &&
      !deleteRef.current.contains(event.target) &&
      !buttonRef2.current.contains(event.target)
    ) {
      setSureToDelete(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setFilePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    setNombre(dataPesonal.nombre || "");
    setApellido(dataPesonal.apellido || "");
    setEspecialidad(dataPesonal.especialidad || "");
    setPassword(dataPesonal.password || "");
    setGenero(dataPesonal.genero || "");
    setDocumento(dataPesonal.documento || "");

    setMatricula(dataPesonal.matricula || "");

    setTelefono(dataPesonal.telefono || "");

    setCalle(dataPesonal.calle || "");

    setEmail(dataPesonal.email || "");

    setNumero(dataPesonal.numero || "");

    setLocalidad(dataPesonal.localidad || "");

    setProvincia(dataPesonal.provincia || "");

    setUrlImagen(dataPesonal.urlImagen || user.url);

    setFechaNacimiento(dataPesonal.fechaNacimiento || "");
  }, [dataPesonal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: id,
      apellido: apellido,
      nombre: nombre,
      documento: documento,
      fechaNacimiento: fechaNacimiento,
      genero: genero,
      telefono: telefono,
      matricula: matricula,
      email: email,
      rol: user.rol,
      especialidad: especialidad,
      calle: calle,
      numero: numero,
      localidad: localidad,
      provincia: provincia,
      urlImagen: urlImagen,
      password: password,
      validado: validado
    };

    let url;

    switch (user.rol) {
      case "ODONTOLOGY":
        url = baseUrl.url + `/odontologos/`;
        break;
      case "PATIENT":
        url = baseUrl.url + `/pacientes/`;
        break;
      case "ADMIN":
        url = baseUrl.url + `/usuarios/`;
      default:
        console.log("Invalid role");
    }

    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(formData),
    };
    console.log(formData);

    fetch(url, settings).then((response) => {
      if (response.ok) {
        Swal.fire("La modificacion fue exitosa");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.log("Error al modificar datos");
      }
    });
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("id", local.id);

    let url;

    switch (user.rol) {
      case "ODONTOLOGY":
        url = baseUrl.url + `/odontologos/uploadImage`;
        break;
      case "PATIENT":
        url = baseUrl.url + `/pacientes/uploadImage`;
        break;
      case "ADMIN":
        url = baseUrl.url + `/usuarios/uploadImage`;
      default:
        console.log("role invalido");
    }

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire("La modificacion fue exitosa");
          console.log("Image uploaded successfully");
          localStorage.setItem("user", JSON.stringify(""));
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          localStorage.setItem("user", JSON.stringify(dataPesonal));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal!",
            footer:
              "<p>Probablemente la imagen excede el limite de tamaño permitido</p>",
          });
          console.error("Error uploading image");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  function deleteImage() {
    let url;

    switch (user.rol) {
      case "ODONTOLOGY":
        url = baseUrl.url + `/odontologos/deleteImage/${user.id}`;
        break;
      case "PATIENT":
        url = baseUrl.url + `/pacientes/deleteImage/${user.id}`;
        break;
      case "ADMIN":
        url = baseUrl.url + `/usuarios/deleteImage/${user.id}`;
      default:
        console.log("Invalid role");
    }

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(""));
          setChangeImage(false);

          Swal.fire("Se elimino correctamente.");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
          localStorage.setItem("user", JSON.stringify(dataPesonal));
        } else {
          throw new Error("Error en la solicitud DELETE");
        }
      })
      .then((data) => {
        console.log(data);
        const updatedData = {
          ...data,
        };
        setData(updatedData);
        console.log(profileData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleActivateButton = (setShowFunction) => {
    setShowFunction(true);
    let listEdit = document.querySelectorAll(".edit");
    listEdit.forEach((edit) => {
      edit.classList.add("dispel");
    });
  };

  const handleCancelar = (setShowFunction) => {
    setShowFunction(false);
    let listEdit = document.querySelectorAll(".edit");
    listEdit.forEach((element) => {
      element.classList.remove("dispel");
    });
  };

  const handleDeactivateButton = () => {
    setButtonActive(false);
  };

  return (
    <div className="general">
      <div className="general_info">
        <h1>Datos personales</h1>
        <h2>
          Manten tus datos para poder estar en contacto en caso de urgencia
        </h2>
      </div>
      <div className="general_imagen">
        {dataPesonal?.urlImagen ? (
          <div className="profile_image">
            <img src={dataPesonal?.urlImagen} />
            <button
              className="edit"
              ref={buttonRef}
              onClick={() => handleActivateButton(setChangeImage)}
            >
              Change image
            </button>
            <p>
              Tu imagen se expondra a nuestros usuarios para generar confiaza en
              los pacientes
            </p>
          </div>
        ) : (
          <div className="profile_image">
            <img src={profilePic} />
            <button
              className="edit"
              ref={buttonRef}
              onClick={() => setChangeImage(true)}
            >
              Change image
            </button>
            <p>
              Por favor coloca una imagen personal, lo mas profesional que
              puedas para general en los pacientes
            </p>
          </div>
        )}
        {changeImage && (
          <div className="profile_change_pic">
            {dataPesonal?.urlImagen || selectedImage != null ? (
              <div ref={imageRef}>
                {selectedImage == null ? (
                  <>
                    <img src={dataPesonal?.urlImagen} />
                    <h5>Elija una imagen para subir</h5>
                  </>
                ) : (
                  <>
                    <img src={filePreview} />
                    <h5>Elija una imagen para subir</h5>
                  </>
                )}
                <input
                  className="file_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <article>
                  <button
                    className="profile_change_pic_delete"
                    onClick={deleteImage}
                  >
                    Delete
                  </button>
                  <button onClick={handleSaveChanges}>Save changes</button>
                </article>
              </div>
            ) : (
              <div ref={imageRef}>
                <img src={profilePic} />
                <h5>Elija una imagen para subir</h5>
                <input
                  className="file_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <article>
                  <button onClick={handleSaveChanges}>Save changes</button>
                </article>
              </div>
            )}
          </div>
        )}{" "}
      </div>
      <form>
        <table>
          <thead>
            <th id="nombre" className="especial">
              Apellido
            </th>
            {!showApellido && (
              <>
                <th className="complet">Apellido</th>
                <td>{dataPesonal.apellido}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowApellido)}
                >
                  Editar
                </button>
              </>
            )}
            {showApellido && (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowApellido)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>
          <thead>
            <th id="nombre" className="especial">
              Nombre
            </th>
            {!showNombre ? (
              <>
                <th className="complet">Nombre</th>
                <td>{dataPesonal.nombre}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowNombre)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowNombre)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>
          <thead>
            <th id="nombre" className="especial">
              Fecha de nacimiento
            </th>
            {!showFechaDeNacimiento ? (
              <>
                <th className="complet">Fecha Nacimiento</th>
                <td> {dataPesonal.fechaNacimiento}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowFechaDeNacimiento)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="date"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowFechaDeNacimiento)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>
          <thead>
            <th id="nombre" className="especial">
              Género
            </th>
            {!showGenero ? (
              <>
                <th className="complet">Genero</th>

                <td> {dataPesonal.genero}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowGenero)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label className="control-label" htmlFor="genero">
                  <select
                    name="genero"
                    id="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    required
                  >
                    <option selected>Selecciona una especialidad</option>
                    <option>Femenino</option>
                    <option>Masculino</option>
                    <option>NoBinario</option>
                    <option>Transgenero</option>
                    <option>Otro</option>
                  </select>{" "}
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowGenero)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>
          <thead>
            <th className="especial">Documento</th>
            {!showDocumento ? (
              <>
                {" "}
                <th className="complet">Documento</th>
                <td> {dataPesonal.documento}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowDocumento)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowDocumento)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>
          {user.rol == "ODONTOLOGY" && (
            <thead>
              <th className="especial">Matrícula</th>
              {!showMatricula ? (
                <>
                  {" "}
                  <th className="complet">Matricula</th>
                  <td> {dataPesonal.matricula}</td>
                  <button
                    className="edit"
                    onClick={() => handleActivateButton(setShowMatricula)}
                  >
                    Editar
                  </button>
                </>
              ) : (
                <div className="nombre">
                  <label>
                    <input
                      type="text"
                      value={matricula}
                      onChange={(e) => setMatricula(e.target.value)}
                    />
                  </label>
                  <button
                    className="cancel"
                    onClick={() => handleCancelar(setShowMatricula)}
                  >
                    Cancelar
                  </button>
                  <button className="send" onClick={handleSubmit}>
                    Guardar
                  </button>
                </div>
              )}
            </thead>
          )}
          <thead>
            <th className="especial">Teléfono</th>
            {!showTelefono ? (
              <>
                {" "}
                <th className="complet">Telefono</th>
                <td> {dataPesonal.telefono}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowTelefono)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowTelefono)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>
          {user?.rol == "ODONTOLOGY" && (
            <thead>
              <th className="especial">Especialidad</th>
              {!showEspecialidad ? (
                <>
                  {" "}
                  <td> {dataPesonal.especialidad}</td>
                  <button
                    className="edit"
                    onClick={() => handleActivateButton(setShowEspecialidad)}
                  >
                    Editar
                  </button>
                </>
              ) : (
                <div className="nombre">
                  <label>
                    <select
                      name="especialidad"
                      id="especialidad"
                      value={especialidad}
                      onChange={(e) => setEspecialidad(e.target.value)}
                      required
                    >
                      <option>ESPECIALIDAD_ORTODONCISTA</option>
                      <option>ESPECIALIDAD_PERIODONCISTA</option>
                      <option>ESPECIALIDAD_ENDODONCISTA</option>
                      <option>ESPECIALIDAD_ODONTOPEDIATRIA</option>
                      <option>ESPECIALIDAD_CIRUGIA_ORAL</option>
                      <option>ESPECIALIDAD_CIRUGIA_MAXILOFACIAL</option>
                      <option>ESPECIALIDAD_PROTESISTA</option>
                    </select>
                  </label>
                  <button
                    className="cancel"
                    onClick={() => handleCancelar(setShowEspecialidad)}
                  >
                    Cancelar
                  </button>
                  <button className="send" onClick={handleSubmit}>
                    Guardar
                  </button>
                </div>
              )}
            </thead>
          )}

          <thead>
            <h4>Domicilio</h4>
          </thead>
          <thead>
            <th className="especial">Calle</th>
            {!showCalle ? (
              <>
                {" "}
                <th className="complet">Calle</th>
                <td> {dataPesonal.calle}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowCalle)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowCalle)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>

          <thead>
            <th className="especial">Número</th>
            {!showNumero ? (
              <>
                {" "}
                <th className="complet">Numero</th>
                <td> {dataPesonal.numero}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowNumero)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowNumero)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>

          <thead>
            <th className="especial">Localidad</th>
            {!showLocalidad ? (
              <>
                {" "}
                <th className="complet">Localidad</th>
                <td> {dataPesonal.localidad}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowLocalidad)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={localidad}
                    onChange={(e) => setLocalidad(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowLocalidad)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>
          <thead>
            <th className="especial">Provincia</th>
            {!showProvincia ? (
              <>
                <th className="complet">Provincia</th>
                <td> {dataPesonal.provincia}</td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowProvincia)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    value={provincia}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowProvincia)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
  
          </thead>

          <thead>
            <th className="especial">Contraseña</th>
            {!showPassword ? (
              <>
                {" "}
                <th className="complet">Contraseña</th>
                <td></td>
                <button
                  className="edit"
                  onClick={() => handleActivateButton(setShowPassword)}
                >
                  Editar
                </button>
              </>
            ) : (
              <div className="nombre">
                <label>
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button
                  className="cancel"
                  onClick={() => handleCancelar(setShowPassword)}
                >
                  Cancelar
                </button>
                <button className="send" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            )}
          </thead>



          <tbody></tbody>
        </table>
      </form>
    </div>
  );
};

export default Profile;
