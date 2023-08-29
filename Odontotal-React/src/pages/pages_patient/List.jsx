import { useContext, useEffect, useState } from "react";
import '../../styles/pagesStyles/ListTurnsPatient.css'
import { ContextGlobal } from "../../components/utils/global.context";


const List = ({ data, onEditar, onEliminar }) => {
  const { user} = useContext(ContextGlobal);
  const [edad,setEdad] = useState(null)
  
  useEffect(() => {
    const fechaNacimientoObj = new Date(user.fechaNacimiento);
    const fechaActual = new Date();
  
    const años = fechaActual.getFullYear() - fechaNacimientoObj.getFullYear();
    const meses = fechaActual.getMonth() - fechaNacimientoObj.getMonth();
  
    let edad = años;
  
    if (meses < 0 || (meses === 0 && fechaActual.getDate() < fechaNacimientoObj.getDate())) {
      edad--;
    }
    setEdad(años)
  
  }, [edad]);
  

  return (
    <section className="turns-list">
      <div className="patient-information">
        <p><span>Paciente:</span> {user.nombre} {user.apellido}</p>
        <p><span>Documento:</span> {user.documento}</p>
        <p><span>Edad:</span> {edad} años</p>
      </div>
      
      <div className="turns-patient">
        <h4>Mis turnos</h4>
        <table>
          <thead className="row-titles">
            <tr >
              <th className="center-input">Especialidad</th>
              <th className="center-input">Odontólogo</th>
              <th className="center-input"><span className="fecha">__</span>Fecha<span className="fecha">__</span></th>
              <th className="center-input" >Hora</th>
              <th className="center-input">Acciones<span className="fecha">_</span></th>
            </tr>
          </thead>
          <tbody>{data != "" && <>{data.map((item) => (
              <tr key={item.id}>
                <td className="center-input">{item.especialidad.replace('ESPECIALIDAD_', '').replace('_', " ")}</td>        
                <td className="center-input">{item.nombreOdontologo} {item.apellidoOdontologo}</td>
                <td className="center-input">{item.fecha}</td>
                <td className="center-input">{item.hora.slice(0, -3)}</td>
                <td className="center-input">
          
                  <button onClick={() => onEliminar(item)} className="btn-delete">Cancelar</button>
                </td>
              </tr>
            ))} </>}
           
          </tbody>
        </table>
      </div>
    </section>
    
  );
}
export default List