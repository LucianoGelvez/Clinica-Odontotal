import React, { useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../components/utils/baseUrl.json";
import "../../styles/pagesStyles/ListTurnsDentist.css";
const FormTurn = ({ data, onCancelar, informacionCompleta, jwt }) => {
  const [id, setId] = useState(data.id);
  const [nombreOdontologo, setNombreOdontologo] = useState(
    data.nombreOdontologo
  );
  const [apellidoOdontologo, setApellidoOdontologo] = useState(
    data.apellidoOdontologo
  );
  const [idOdontologo, setIdOdontologo] = useState(data.odontologoId);
  const [nombrePaciente, setNombrePaciente] = useState(data.nombrePaciente);
  const [idPaciente, setIdPaciente] = useState(data.pacienteId);
  const [apellidoPaciente, setApellidoPaciente] = useState(
    data.apellidoPaciente
  );
  const [documentoPaciente, setDocumentoPaciente] = useState(
    data.documentoPaciente
  );
  const [fecha, setFecha] = useState(data.fecha);
  const [hora, setHora] = useState(data.hora);
  const [motivo, setMotivo] = useState(data.motivo);
  const [trabajoRealizado, setTrabajoRealizado] = useState(
    data.trabajoRealizado
  );
  const [especialidad, setEspecialidad] = useState(data.especialidad);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: id,
      apellidoOdontologo: apellidoOdontologo,
      apellidoPaciente: apellidoPaciente,
      documentoPaciente: documentoPaciente,
      especialidad: especialidad,
      fecha: fecha,
      hora: hora,
      motivo: motivo,
      nombreOdontologo: nombreOdontologo,
      nombrePaciente: nombrePaciente,
      odontologoId: idOdontologo,
      pacienteId: idPaciente,
      trabajoRealizado: trabajoRealizado,
    };

    const url = baseUrl.url + `/turnos/`;
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings).then((response) => {
      if (response.ok) {
        Swal.fire("La modificacion fue exitosa");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        console.log(formData);
        console.log("Error al actualizar el protecista");
      }
    });
  };

  const onCancelarClick = (e) => {
    e.preventDefault();
    onCancelar();
  };

  // Busca la informacion correspondiente a la tabla sin la fila que se está editando
  const informacionFila = informacionCompleta.filter((item) => item.id !== id);

  return (
    <section className="table-container">
      <h2> Por favor, complete el registro del turno</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Fecha y Hora</th>
            <th>Doctor</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {informacionFila.map((item) => (
            <tr key={item.id}>
              <td>{item.nombrePaciente}</td>
              <td>{item.apellidoPaciente}</td>
              <td>{item.documentoPaciente}</td>
              <td>
                {item.fecha} {item.hora}
              </td>
              <td>
                {item.nombreOdontologo} {item.apellidoOdontologo}
              </td>
              <td>{especialidad}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <div className="editable">
          <label>Motivo de la visita del paciente:</label>
          <textarea
            className="editable_motive"
            style={{ height: "40%" }}
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
          <label>Trabajo Realizado:</label>
          <textarea
            className="editable_worktodone"
            type="text"
            value={trabajoRealizado}
            onChange={(e) => setTrabajoRealizado(e.target.value)}
          />
          <div>
            <button type="submit">Guardar</button>
            <button className="cancel-change" onClick={onCancelarClick}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
export default FormTurn;
