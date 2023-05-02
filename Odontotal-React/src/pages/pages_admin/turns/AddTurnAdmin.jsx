import React, { useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import '../../../styles/pagesStyles/AddTurnAdminStyle.css'

const AddTurnAdmin = () => {
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const intervals = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const [formData, setFormData] = useState({
    odontologoId: '',
    pacienteId: '',
    fecha: '',
    hora: '',
  });
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://34.228.53.131:8080/turnos';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        resetUploadForm();
      })
      .catch((error) => {
        setResponse(error);
        resetUploadForm();
      });
  };

  const resetUploadForm = () => {
    setFormData({
      odontologoId: '',
      pacienteId: '',
      fecha: '',
      hora: '',
    });

    console.log(formData)
  };
    console.log(response)
  return (
    
    <div>
      <NavbarAdmin/> 
      <h3>Agregar Turno</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group perro" >
              <label className="control-label" htmlFor="pacienteId">Paciente:</label>
              <input type="number"className="form-control" id="pacienteId" placeholder="Ingrese el paciente"
               name="pacienteId" value={formData.pacienteId} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="odontologoId"> Odontologo:</label>
              <input type="number"className="form-control" id="odontologo" placeholder="Ingrese el odontologo"
               name="odontologoId" value={formData.odontologoId} onChange={handleInputChange} required/>
            </div>
          
            <div className="form-group">
              <label className="control-label" htmlFor="fecha"> Fecha:</label>
              <input type="date"className="form-control" id="fecha" placeholder="Ingrese el fecha"
               name="fecha" value={formData.fecha} onChange={handleInputChange} required/>
    <select className="horario" name="hora" id="hora" value={formData.hora} onChange={handleInputChange} required>
  {intervals.map((interval, index) => (
    <option key={index} >{interval}</option>  
  ))}
  </select>

</div>
        
                <button>Cargar</button>
                </form>
    </div>
  )
}

export default AddTurnAdmin