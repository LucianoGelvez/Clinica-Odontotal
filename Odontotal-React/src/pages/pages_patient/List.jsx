import { useState } from "react";


const List = ({ data, onEditar, onEliminar }) => {

  return (
    <section>
    <table>
      <thead>
        <tr>
          <th>Nombre del Paciente</th>
          <th>Nombre del Odontologo</th>
          <th>Documento del Paciente</th>
          <th>Fecha y hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>{data != "" && <>{data.map((item) => (
          <tr key={item.id}>
            <td>{item.nombrePaciente}</td>           
            <td>{item.nombreOdontologo}</td>
            <td>{item.documentoPaciente}</td>
            <td>{item.fecha} {item.hora}</td>
       
            <td>
     
              <button onClick={() => onEliminar(item)} className="btn-delete">Cancelar Turno</button>
            </td>
          </tr>
        ))} </>}
       
      </tbody>
    </table>
    </section>
  );
}
export default List