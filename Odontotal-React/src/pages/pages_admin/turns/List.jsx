import "../../../styles/pagesStyles/ListTurnsAdmin.css";

const List = ({ data, onEditar, onEliminar }) => {
  console.log(data);

  return (
    <section>
      <h1>Listado Turnos</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Documento</th>
              <th>Especialidad</th>
              <th>Odontólogo</th>
              <th>
                <span></span>Fecha<span></span>
              </th>
              <th>Hora</th>
              <th>
                <span></span>Acciones<span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.nombrePaciente} {item.apellidoPaciente}
                </td>
                <td>{item.documentoPaciente}</td>
                <td>
                  {item.especialidad
                    .replace("ESPECIALIDAD_", "")
                    .replace("_", " ")}
                </td>
                <td>
                  {item.nombreOdontologo} {item.apellidoOdontologo}
                </td>
                <td>{item.fecha}</td>
                <td>{item.hora.slice(0, 5)}</td>
                <td>
                  <button onClick={() => onEditar(item)}>Editar</button>
                  <button
                    onClick={() => onEliminar(item)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default List;
