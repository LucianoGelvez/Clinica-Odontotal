
const List = ({ data, onEditar, onEliminar }) => {
  
  return (
    <section>
  <h1>Lista de Odontologos</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre y Apellido</th>
          <th>Email</th>
          <th className="none">Fecha Nacimiento</th>
          <th className="none"> Genero</th>
          <th>Telefono</th>
          <th>Documento</th>
          <th className="none">Matricula</th>
          <th>Domicilio</th>
          <th >Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.nombre} {item.apellido}</td>
            <td>{item.email}</td>
            <td className="none">{item.fechaNacimiento}</td>
            <td className="none">{item.genero}</td>
            <td>{item.telefono}</td>
            <td>{item.documento}</td>
            <td className="none">{item.matricula}</td>
            <td>{item.calle}{item.numero}, {item.localidad}, {item.provincia}</td>
            <td >
              <button onClick={() => onEditar(item)}>Editar</button>
              <button onClick={() => onEliminar(item)} className="btn-delete">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </section>
  );
}
export default List