import React from 'react'

const ListTurns = ({ data, onEditar, onEliminar }) => {
  
    return (
        <section>
        <table>
          <thead>
            <tr>
              <th>Nombre del Paciente</th>
              <th>Apellido del Paciente</th>
              <th>Documento del Paciente</th>
              <th>Fecha y hora</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>{data != "" && <>{data.map((item) => (
              <tr key={item.id}>
                <td>{item.nombrePaciente}</td>           
                <td>{item.apellidoPaciente}</td>
                <td>{item.documentoPaciente}</td>
                <td>{item.fecha} {item.hora}</td>
           
                <td>
         
                  <button onClick={() => onEliminar(item)} className="btn-delete">Historial Paciente</button>
                </td>
              </tr>
            ))} </>}
           
          </tbody>
        </table>
        </section>
      );
    }
    export default ListTurns