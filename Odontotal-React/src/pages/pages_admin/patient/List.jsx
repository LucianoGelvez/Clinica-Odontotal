import { useState } from "react";


const List = ({ data, onEditar, onEliminar }) => {
  
  return (
    <section>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>documento</th>
          <th>Provincia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.idPaciente}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.documento}</td>
            <td>{item.domicilio.provincia}</td>
           
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