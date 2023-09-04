import React, { useContext, useEffect, useState } from "react";
import "../../styles/pagesStyles/TurnsStyle.css";
import { ContextGlobal } from "../../components/utils/global.context";
import baseUrl from "../../components/utils/baseUrl.json";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faCalendarDays,
  faEnvelope,
  faUserDoctor,
  faTooth,
  faClipboardCheck,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Turns = () => {
  const { information, user, jwt } = useContext(ContextGlobal);
  const usuarioEncontrado = localStorage.getItem("user");

  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [odontologos, setOdontologos] = useState({});
  const [especilistaFiltrado, setEspecilistaFiltrado] = useState({});
  const [turnsOdontology, setTurnsOdontology] = useState([]);
  const [turnsPatient, setTurnsPatient] = useState([]);
  const [horasTurnosFiltrados, setHorasTurnosFiltrados] = useState([]);

  const handleSpecialtySelect = (event) => {
    setSelectedSpecialty(event.target.value);
    setFormData({ ...formData, odontologoId: "", fecha: "", hora: "" });
    setEspecilistaFiltrado(
      odontologos.filter((item) => event.target.value === item.especialidad)
    );
  };

  useEffect(() => {
    const urlTurnsPatients = baseUrl.url + "/turnos/turnosPaciente/" + user.id;
    fetch(urlTurnsPatients, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTurnsPatient(data))
      .catch((error) => {
        setTurnsPatient([]);
        console.log(error);
      });
  }, []);

  const url = baseUrl.url + "/odontologos/listAll";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOdontologos(data));
  }, []);

  const intervals = [
    "Selecciona un horario disponible",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const [formData, setFormData] = useState({
    odontologoId: "",
    fecha: "",
    hora: "",
    pacienteId: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "selectedDoctor") {
      setSelectedDoctor(value);
    }

    setFormData({
      ...formData,
      [name]: value,
      pacienteId: user.id,
      odontologoId: name === "selectedDoctor" ? value : formData.odontologoId,
    });
  };

  const handleInputOdontologyChange = (event) => {
    const odontologoIdSelected = event.target.value;
    setFormData({
      formData,
      odontologoId: odontologoIdSelected,
      fecha: "",
      hora: "",
    });
    setHorasTurnosFiltrados([]);
    const urlTurnsOdontology =
      baseUrl.url + "/turnos/turnoOdontologo/" + odontologoIdSelected;
    fetch(urlTurnsOdontology, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTurnsOdontology(data))
      .catch((error) => setTurnsOdontology([]));
  };

  const handleInputDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate.getDay() === 6) {
      setFormData({ ...formData, fecha: "" });
      Swal.fire({
        icon: "warning",
        title: "Día no disponible",
        text: "Por favor selecciona un día distinto a Domingo.",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
      });
    }

    let fechaSeleccionada = event.target.value;
    const turnosFiltradosOdontologo = turnsOdontology.filter(
      (turno) => turno.fecha === fechaSeleccionada
    );
    const turnosFiltradosPaciente = turnsPatient.filter(
      (turno) => turno.fecha === fechaSeleccionada
    );
    const turnosFiltrados = turnosFiltradosOdontologo.concat(
      turnosFiltradosPaciente
    );
    let horasFiltradas = turnosFiltrados.map((turno) => turno.hora);
    for (let i = 0; i < horasFiltradas.length; i++) {
      horasFiltradas[i] = horasFiltradas[i].slice(0, -3);
    }
    setHorasTurnosFiltrados(horasFiltradas);
  };

  const obtenerHorasDisponibles = () => {
    const horasDisponibles = intervals.filter(
      (interval) => !horasTurnosFiltrados.includes(interval)
    );
    return horasDisponibles;
  };

  function getTomorrowDateString() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.hora !== "" &&
      formData.odontologoId !== "" &&
      formData.hora !== "Selecciona un horario disponible"
    ) {
      const confirmResult = await Swal.fire({
        title: "Confirmar datos",
        text: `¿Desea agendar el turno de ${especilistaFiltrado[0].especialidad.replace(
          /_/g,
          " "
        )} con ${especilistaFiltrado[0].nombre} ${
          especilistaFiltrado[0].apellido
        } el día ${formData.fecha} a las ${formData.hora}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      });

      if (confirmResult.isConfirmed) {
        try {
          const url = baseUrl.url + "/turnos";
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
              title: "Turno agendado correctamente",
              text: `Hemos enviado un correo con los detalles del turno.`,
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) {
                console.log(responseData);
                resetUploadForm();
              }
            });
          } else {
            console.error("Error al enviar los datos");
            Swal.fire({
              icon: "error",
              title: "Error al agendar turno",
              text: "Por favor, verifique los campos nuevamente.",
            });
          }
        } catch (error) {
          console.error("Error en la conexión", error);
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No se puede agendar el turno",
        text: "Por favor complete todos los campos.",
      });
    }
  };

  const resetUploadForm = () => {
    window.location.reload();
    setFormData({
      odontologoId: "",
      fecha: "",
      hora: "",
      pacienteId: "",
    });
    selectedDoctor(null);
    setEspecilistaFiltrado({});
    selectedSpecialty(null);
    setOdontologos({});
  };

  return (
    <div>
      {usuarioEncontrado && (
        <div className="turns">
          <div className="information">
            <h3 className="title-turns">Agenda hoy mismo tus citas</h3>
            <p className="initial-information">
              En Odontotal trabajamos para siempre darte lo mejor, conoce los
              diferentes canales para que puedas agendar tus citas, también
              puedes consultar los horarios disponibles con los especialistas de
              tu preferencia.
            </p>

            <div className="contact">
              <div className="contact_frame">
                <a href="tel:+573143602830" target="_blank">
                  <div className="detail-image">
                    <FontAwesomeIcon icon={faPhoneVolume} />
                  </div>
                </a>
                <a href="tel:+573143602830" target="_blank">
                  <p className="detail-title">Llámanos</p>{" "}
                </a>
              </div>
              <div className="contact_frame">
                <a href="#section-add-turn">
                  <div className="detail-image">
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </div>
                </a>
                <a href="#section-add-turn">
                  <p className="detail-title">Agéndate tu mismo</p>
                </a>
              </div>
              <div className="contact_frame">
                <a href="mailto:odontotalcontacto@gmail.com">
                  <div className="detail-image">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </a>
                <a href="mailto:odontotalcontacto@gmail.com">
                  <p className="detail-title">Escríbenos por email</p>
                </a>
              </div>
              <div className="contact_frame">
                <a
                  href="https://web.whatsapp.com/send?phone=573143602830"
                  target="_blank"
                >
                  <div className="detail-image">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </div>
                </a>
                <a
                  href="https://web.whatsapp.com/send?phone=573143602830"
                  target="_blank"
                >
                  <p className="detail-title">Escríbenos a WhatsApp</p>
                </a>
              </div>
            </div>
          </div>

          <div id="section-add-turn" className="add-turn-container">
            <form onSubmit={handleSubmit}>
              <h3>Agendar Turno</h3>
              <div className="dropdown">
                <label className="control-label" htmlFor="selectedSpecialty">
                  Especialidad:
                </label>
                <select
                  className="form-select"
                  name="selectedSpecialty"
                  id="selectedSpecialty"
                  onChange={handleSpecialtySelect}
                  required
                >
                  <option value="">Selecciona una especialidad</option>
                  <option value="ESPECIALIDAD_ORTODONCISTA">Ortodoncia</option>
                  <option value="ESPECIALIDAD_PERIODONCISTA">
                    Periodoncia
                  </option>
                  <option value="ESPECIALIDAD_ENDODONCISTA">Endodoncia</option>
                  <option value="ESPECIALIDAD_ODONTOPEDIATRIA">
                    Odontopediatría
                  </option>
                  <option value="ESPECIALIDAD_CIRUGIA_ORAL">
                    Cirugía oral
                  </option>
                  <option value="ESPECIALIDAD_CIRUGIA_MAXILOFACIAL">
                    Cirugía maxilofacial
                  </option>
                  <option value="ESPECIALIDAD_PROTESISTA">Prótesis</option>
                </select>
              </div>

              {selectedSpecialty && (
                <div className="dropdown">
                  <label className="control-label" htmlFor="selectedDoctor">
                    Especialista:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Dropdown example"
                    name="selectedDoctor"
                    value={formData.odontologoId}
                    onChange={(event) => {
                      handleInputChange(event);
                      handleInputOdontologyChange(event);
                    }}
                    required
                  >
                    <option value="" selected>
                      Selecciona un especialista
                    </option>
                    {selectedSpecialty === "ESPECIALIDAD_ORTODONCISTA" && (
                      <>
                        {especilistaFiltrado.map((odontologo) => (
                          <option value={odontologo.id} key={odontologo.id}>
                            {odontologo.nombre} {odontologo.apellido}
                          </option>
                        ))}
                      </>
                    )}
                    {selectedSpecialty === "ESPECIALIDAD_PERIODONCISTA" && (
                      <>
                        {especilistaFiltrado.map((odontologo) => (
                          <option value={odontologo.id} key={odontologo.id}>
                            {odontologo.nombre} {odontologo.apellido}
                          </option>
                        ))}
                      </>
                    )}
                    {selectedSpecialty === "ESPECIALIDAD_ENDODONCISTA" && (
                      <>
                        {especilistaFiltrado.map((odontologo) => (
                          <option value={odontologo.id} key={odontologo.id}>
                            {odontologo.nombre} {odontologo.apellido}
                          </option>
                        ))}
                      </>
                    )}
                    {selectedSpecialty === "ESPECIALIDAD_ODONTOPEDIATRIA" && (
                      <>
                        {especilistaFiltrado.map((odontologo) => (
                          <option value={odontologo.id} key={odontologo.id}>
                            {odontologo.nombre} {odontologo.apellido}
                          </option>
                        ))}
                      </>
                    )}
                    {selectedSpecialty === "ESPECIALIDAD_CIRUGIA_ORAL" && (
                      <>
                        {especilistaFiltrado.map((odontologo) => (
                          <option value={odontologo.id} key={odontologo.id}>
                            {odontologo.nombre} {odontologo.apellido}
                          </option>
                        ))}
                      </>
                    )}
                    {selectedSpecialty ===
                      "ESPECIALIDAD_CIRUGIA_MAXILOFACIAL" && (
                      <>
                        {especilistaFiltrado.map((odontologo) => (
                          <option value={odontologo.id} key={odontologo.id}>
                            {odontologo.nombre} {odontologo.apellido}
                          </option>
                        ))}
                      </>
                    )}
                    {selectedSpecialty === "ESPECIALIDAD_PROTESISTA" && (
                      <>
                        {especilistaFiltrado.map((odontologo) => (
                          <option value={odontologo.id} key={odontologo.id}>
                            {odontologo.nombre} {odontologo.apellido}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="control-label" htmlFor="fecha">
                  {" "}
                  Fecha:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  placeholder="Ingrese la fecha"
                  name="fecha"
                  value={formData.fecha}
                  min={getTomorrowDateString()}
                  onChange={(event) => {
                    handleInputChange(event);
                    handleInputDateChange(event);
                  }}
                  required
                />
              </div>

              <div className="dropdown">
                <label className="control-label" htmlFor="hora">
                  {" "}
                  Hora:
                </label>
                <select
                  className="form-select"
                  name="hora"
                  id="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  required
                >
                  {obtenerHorasDisponibles().map((hora, index) => (
                    <option key={index}>{hora}</option>
                  ))}
                </select>
              </div>
              <button>Enviar</button>
            </form>
          </div>

          <div className="information">
            <h3 className="title-turns">Cómo será tu experiencia</h3>
            <p className="initial-information">
              Durante tu tratamiento en Odontotal nos aseguraremos de brindarte
              una experiencia agradable y cómoda, la posibilidad de tener
              exámenes y garantizamos diseñar el mejor plan acorde a tus
              necesidades.
            </p>

            <div className="contact">
              <div className="contact_frame">
                <div className="detail-image">
                  <FontAwesomeIcon icon={faUserDoctor} />
                </div>
                <p className="detail-title">
                  Evaluación médica con especialistas
                </p>
              </div>
              <div className="contact_frame">
                <div className="detail-image">
                  <FontAwesomeIcon icon={faTooth} />
                </div>
                <p className="detail-title">
                  Exámenes diagnósticos (Rayos X, Radiografías)
                </p>
              </div>
              <div className="contact_frame">
                <div className="detail-image">
                  <FontAwesomeIcon icon={faClipboardCheck} />
                </div>
                <p className="detail-title">
                  Plan de tratamiento y presupuesto
                </p>
              </div>
              <div className="contact_frame">
                <div className="detail-image">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <p className="detail-title">
                  Presentación de alternativas de pago
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Turns;
