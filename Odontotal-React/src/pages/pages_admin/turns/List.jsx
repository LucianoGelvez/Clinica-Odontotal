import { useState } from "react";
import '../../../styles/pagesStyles/ListTurnsAdmin.css'

const List = ({ data, onEditar, onEliminar }) => {
  console.log(data);
  
  return (
    <section className="turns-list-admin">
      <div className="turns-admin">
        <h4>Listado Turnos</h4>
        <table>
          <thead className="row-titles">
            <tr>
              <th className="center-input">Paciente</th>
              <th className="center-input">Documento</th>
              <th className="center-input">Especialidad</th>
              <th className="center-input">Odontólogo</th>
              <th className="center-input"><span>__</span>Fecha<span>__</span></th>
              <th className="center-input">Hora</th>
              <th className="center-input"><span>_______</span>Acciones<span>_______</span></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="center-input">{item.nombrePaciente} {item.apellidoPaciente}</td>    
                <td className="center-input">{item.documentoPaciente}</td>    
                <td className="center-input">{item.especialidad.replace('ESPECIALIDAD_','').replace('_',' ')}</td>    
                <td className="center-input">{item.nombreOdontologo} {item.apellidoOdontologo}</td>
                <td className="center-input">{item.fecha}</td>
                <td className="center-input">{item.hora.slice(0,5)}</td>
                <td className="center-input">
                  <button onClick={() => onEditar(item)} >Editar</button>
                  <button onClick={() => onEliminar(item)} className="btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default List