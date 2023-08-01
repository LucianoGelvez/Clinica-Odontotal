import { useState } from "react";


const List = ({ data, onEditar, onEliminar }) => {
  
  return (
    <section>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Fecha Nacimiento</th>
          <th> Genero</th>
          <th>Telefono</th>
          <th>Documento</th>
          <th>Matricula</th>
          <th>Domicilio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.email}</td>
            <td>{item.fechaNacimiento}</td>
            <td>{item.genero}</td>
            <td>{item.telefono}</td>
            <td>{item.documento}</td>
            <td>{item.matricula}</td>
            <td>{item.calle}{item.numero}, {item.localidad}, {item.provincia}</td>
            <td>
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