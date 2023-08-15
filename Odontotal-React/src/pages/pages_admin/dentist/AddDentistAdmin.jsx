import React, { useContext, useState } from 'react';
import Login from '../../../components/Login';
import Register from '../../../components/Register';
import { ContextGlobal } from '../../../components/utils/global.context';
import baseUrl from '../../../components/utils/baseUrl.json'
import '../../../styles/pagesStyles/AddDentistAdmin.css'

const AddDentistAdmin = () => {
  const { user, jwt } = useContext(ContextGlobal);
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    apellido: "",
    nombre: "",
    email:"",
    password:"12345",
    documento: "",
    fechaNacimiento:"",
    genero: "",
    telefono: "",
    matricula: "",
    urlImagen: "",
    rol:"ODONTOLOGY",
    especialidad: "",
    calle: "",
    numero: "",
    localidad: "",
    provincia: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [response, setResponse] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const url = baseUrl.url + '/odontologos';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
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
      apellido: "",
      nombre: "",
      email:"",
      password:"12345",
      documento: "",
      fechaNacimiento:"",
      genero: "",
      telefono: "",
      matricula: "",
      urlImagen: "",
      rol:"ODONTOLOGY",
      especialidad: "",
      calle: "",
      numero: "",
      localidad: "",
      provincia: ""
    });

    console.log(formData)
  };
    console.log(response)
  return (
    <div className="AddDentistAdmin">

      {user?.rol === "ADMIN" &&
     
      <div className="row">
        
          
          <form onSubmit={handleSubmit}>
          <h3>Agregar Odontologo</h3>
            <div className="form-group">
            {/* <label className="control-label" htmlFor="Image">Foto:</label>
            <input className="categories-container_input-field"
            type="file" accept="image/*" onChange={handleImageChange}/> */}
              <label className="control-label" htmlFor="apellido">Apellido:</label>
              <input type="text"className="form-control" id="apellido" placeholder="Ingrese el apellido"
               name="apellido" value={formData.apellido} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="apellido"> Nombre:</label>
              <input type="text"className="form-control" id="nombre" placeholder="Ingrese el nombre"
               name="nombre" value={formData.nombre} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="apellido"> Email:</label>
              <input type="text"className="form-control" id="email" placeholder="Ingrese el email"
               name="email" value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="documento"> Documento:</label>
              <input type="text"className="form-control" id="documento" placeholder="Ingrese el Documento"
               name="documento" value={formData.documento} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
            <label className="control-label" htmlFor="fechaNacimiento">FechaNacimiento:</label>
            <input type="date" className="form-control" id="fechaNacimiento"
              placeholder="Ingrese el fechaNacimiento" name="fechaNacimiento" 
              value={formData.fechaNacimiento} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="genero"> Genero:</label>
              
               <select name="genero" id="genero" value={formData.genero} onChange={handleInputChange} required>
               <option selected>Selecciona una especialidad</option>
                <option >Femenino</option>
                <option >Masculino</option>
                <option >NoBinario</option>
                <option >Transgenero</option>
                <option >Otro</option>
               </select>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="telefono"> Telefono:</label>
              <input type="number"className="form-control" id="telefono" placeholder="Ingrese el telefono"
               name="telefono" value={formData.telefono} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="matricula"> Matricula:</label>
              <input type="text"className="form-control" id="matricula" placeholder="Ingrese el matricula"
               name="matricula" value={formData.matricula} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="especialidad"> Especialidad:</label>
              
               <select name="especialidad" id="especialidad" value={formData.especialidad} onChange={handleInputChange} required>
               <option selected>Selecciona una especialidad</option>
                <option >ESPECIALIDAD_ORTODONCISTA</option>
                <option >ESPECIALIDAD_PERIODONCISTA</option>
                <option >ESPECIALIDAD_ENDODONCISTA</option>
                <option >ESPECIALIDAD_ODONTOPEDIATRIA</option>
                <option >ESPECIALIDAD_CIRUGIA_ORAL</option>
                <option >ESPECIALIDAD_CIRUGIA_MAXILOFACIAL</option>
                <option >ESPECIALIDAD_PROTESISTA</option>
               </select>
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

                <button>Cargar</button>
                </form>
                </div>
                
          }
                </div>
                )}
export default AddDentistAdmin