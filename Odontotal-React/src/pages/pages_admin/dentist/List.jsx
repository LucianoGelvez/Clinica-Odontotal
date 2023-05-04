import { useState } from "react";


const List = ({ data, onEditar, onEliminar }) => {
  
  return (
    <section>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Especialidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.especialidad}</td>
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