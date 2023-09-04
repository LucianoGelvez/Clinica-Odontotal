const List = ({ data, onEditar, onEliminar }) => {
  return (
    <section>
      <h1>Lista de Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Provincia</th>
            <th className="actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idPaciente}>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
              <td>{item.documento}</td>
              <td>{item.provincia}</td>
              <td className="actions">
                <button onClick={() => onEditar(item)}>Editar</button>
                <button onClick={() => onEliminar(item)} className="btn-delete">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default List;
