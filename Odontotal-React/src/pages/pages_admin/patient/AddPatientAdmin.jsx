import React, { useContext, useState } from 'react'
import { ContextGlobal } from '../../../components/utils/global.context';
import '../../../styles/pagesStyles/AddPatientAdmin.css'
import baseUrl from '../../../components/utils/baseUrl.json'
import Swal from 'sweetalert2';

const AddPatientAdmin = () => {

  const { user, jwt } = useContext(ContextGlobal);

  const [formData, setFormData] = useState({
    apellido: "",
    nombre: "",
    email:"",
    password:"",
    documento: "",
    fechaNacimiento:"",
    genero: "",
    telefono: "",
    matricula: "",
    urlImagen: "",
    rol:"PATIENT",
    especialidad: "",
    calle: "",
    numero: "",
    localidad: "",
    provincia: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const url = baseUrl.url + '/pacientes/registrar'
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
          const responseData = await response.json();
          console.log('Datos enviados correctamente');
          Swal.fire(
            {
              title: 'Paciente registrado correctamente',
              text: `Paciente: ${formData.apellido} ${formData.nombre} , ha sido registrado con éxito.`,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
            }
          ).then((result) => {
            if (result.isConfirmed) {
              console.log(responseData);
              const retriesData = {
                initialTime: Date.now(),
                retries: 0
              }
              window.location.reload();
            }
          })
        } else {
          console.error('Error al enviar los datos');
          Swal.fire({
            icon: "error",
            title: "Error al resgistrar paciente",
            text: "Por favor, verifique los campos nuevamente.",
          });
      }
    } catch (error) {
    console.error('Error en la conexión', error);
    }
   
  };   

  return (
    <div>    
      {user?.rol === "ADMIN" &&
      <div className='add-patient-container'>
      
        
        <form onSubmit={handleSubmit}>
        <h3>Agregar Paciente</h3>
        <div className="row">
          <div className="form-group">
            <label className="control-label" htmlFor="apellido">Apellido:</label>
            <input type="text" className="form-control" id="apellido"
            placeholder="Ingrese el apellido" name="apellido" 
            value={formData.apellido} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="nombre">Nombre:</label>
            <input type="text" className="form-control" id="nombre"
                placeholder="Ingrese el nombre" name="nombre" 
                value={formData.nombre} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="documento">documento:</label>
            <input type="text" className="form-control" id="documento"
                placeholder="Ingrese el documento" name="documento" 
                value={formData.documento} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="password">Contraseña:</label>
            <input type="text" className="form-control" id="password"
              placeholder="Ingrese el contraseña" name="password" 
              value={formData.password} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="fechaNacimiento">FechaNacimiento:</label>
            <input type="date" className="form-control" id="fechaNacimiento"
              placeholder="Ingrese el fechaNacimiento" name="fechaNacimiento" 
              value={formData.fechaNacimiento} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="genero">Género:</label>
            <select
              className="form-control"
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="NoBinario">No binario</option>
              <option value="Transgenero">Transgénero</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="telefono">Telefono:</label>
            <input type="number" className="form-control" id="telefono"
              placeholder="Ingrese el fechaNacimiento" name="telefono" 
              value={formData.telefono} onChange={handleInputChange} required/>
          </div>
          
          <div className="form-group">
            <label className="control-label" htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email"
              placeholder="Ingrese el telefono" name="email" 
              value={formData.email} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="calle">calle:</label>
            <input type="text" className="form-control" id="calle"
              placeholder="Ingrese el calle" name="calle" 
              value={formData.calle} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="numero">numero:</label>
            <input type="number" className="form-control" id="numero"
              placeholder="Ingrese el numero" name="numero" 
              value={formData.numero} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="localidad">localidad:</label>
            <input type="text" className="form-control" id="localidad"
              placeholder="Ingrese el localidad" name="localidad" 
              value={formData.localidad} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="provincia">provincia:</label>
            <input type="text" className="form-control" id="provincia"
              placeholder="Ingrese el provincia" name="provincia" 
              value={formData.provincia} onChange={handleInputChange} required/>
          </div>
          </div>
          <button>Agregar</button>
        </form>
       
      

      </div>
      }
    </div>
      
  )
}

export default AddPatientAdmin