import React, { useState } from 'react'
import Swal from 'sweetalert2';
import '../../../styles/pagesStyles/ListAdmin/FormUpdateDentist.css'
import baseUrl from '../../../components/utils/baseUrl.json'


const FormToUpdateDentist =({ data, onGuardar, onCancelar, informacionCompleta, jwt  }) => {
  const [id, setId] = useState(data.id);
  const [nombre, setNombre] = useState(data.nombre);
  const [apellido, setApellido] = useState(data.apellido);
  const [especialidad, setEspecialidad] = useState(data.especialidad);
  const [password, setPassword] = useState(data.password);
  const [genero, setGenero] = useState(data.genero);
  const [documento, setDocumento] = useState(data.documento);
  const [matricula, setMatricula] = useState(data.matricula);
  const [email, setEmail] = useState(data.email);
  const [telefono, setTelefono] = useState(data.telefono);
  const [calle, setCalle] = useState(data.calle);
  const [numero, setNumero] = useState(data.numero);
  const [localidad, setLocalidad] = useState(data.localidad);
  const [provincia, setProvincia] = useState(data.provincia);
  const [fechaNacimiento, setFechaNacimiento] = useState(data.fechaNacimiento);


  const handleSubmit =  async(e) => {
    e.preventDefault();
    onGuardar({ ...data, id});

    const formData = {
      id: id,
      apellido: apellido,
      nombre: nombre,
      password:password,
      documento: documento,
      fechaNacimiento:fechaNacimiento,
      genero: genero,
      telefono: telefono,
      matricula: matricula,
      email: email,
      rol: "ODONTOLOGY",
      especialidad: especialidad,
      calle: calle,
      numero: numero,
      localidad: localidad,
      provincia: provincia
    };

    const url = baseUrl.url + `/odontologos/`;
    
    const confirmResult = await Swal.fire({
      title: 'Confirmar datos',
      text: `¿Esta seguro que desea modificar los datos del odontologo ${data.nombre} ${data.apellido}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    });
    if (confirmResult.isConfirmed) {

         try{
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(formData),
          });
          
          if (response.ok) {  
            Swal.fire(
              {
                title: 'Datos de odontologo actualizado correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
              }
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.pathname="/ListaDeOdontologos"
              }
            })
          } else {
            console.error('Error al enviar los datos');
            Swal.fire({
              icon: "error",
              title: "Error en la modificacion",
              text: "Por favor, verifique los campos nuevamente.",
            });
            }
        }
        catch (error) {
          console.error('Error en la conexión', error);
          }
            }



  };


  const onCancelarClick = (e) => {
    e.preventDefault();
    onCancelar();
  };

  // Busca la informacion correspondiente a la tabla sin la fila que se está editando
  const informacionFila = informacionCompleta.filter(item => item.id !== id);

  return (
<div className='main_update'>
  <form onSubmit={handleSubmit} className='main_update__form'>
    <div className='form-group'>
      <label htmlFor='nombre'>Nombre:</label>
      <input
        type='text'
        id='nombre'
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='apellido'>Apellido:</label>
      <input
        type='text'
        id='apellido'
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='fechaNacimiento'>Fecha de Nacimiento:</label>
      <input
        type='text'
        id='fechaNacimiento'
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='telefono'>Telefono personal:</label>
      <input
        type='text'
        id='telefono'
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='genero'>Genero:</label>
      <input
        type='text'
        id='genero'
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='documento'>Documento:</label>
      <input
        type='text'
        id='documento'
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='matricula'>Matricula:</label>
      <input
        type='text'
        id='matricula'
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='calle'>Calle:</label>
      <input
        type='text'
        id='calle'
        value={calle}
        onChange={(e) => setCalle(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='numero'>Numero:</label>
      <input
        type='text'
        id='numero'
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='localidad'>Localidad:</label>
      <input
        type='text'
        id='localidad'
        value={localidad}
        onChange={(e) => setLocalidad(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='provincia'>Provincia:</label>
      <input
        type='text'
        id='provincia'
        value={provincia}
        onChange={(e) => setProvincia(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='especialidad'>Especialidad:</label>
      <select
        id='especialidad'
        name='especialidad'
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
        required
      >
        <option value='ESPECIALIDAD_ORTODONCISTA'> Ortodoncista</option>
        <option value='ESPECIALIDAD_PERIODONCISTA'> Periodoncista</option>
        <option value='ESPECIALIDAD_ENDODONCISTA'> Endodoncista</option>
        <option value='ESPECIALIDAD_ODONTOPEDIATRIA'> Odontopediatría</option>
        <option value='ESPECIALIDAD_CIRUGIA_ORAL'> Cirugía Oral</option>
        <option value='ESPECIALIDAD_CIRUGIA_MAXILOFACIAL'> Cirugía Maxilofacial</option>
        <option value='ESPECIALIDAD_PROTESISTA'> Protesista</option>
      </select>
    </div>
    <div className='form_group__btn'>
      <button type='submit'>Guardar</button>
      <button className='cancel-change' onClick={onCancelarClick}>Cancelar</button>
    </div>
  </form>
</div>


  

  );
}
export default FormToUpdateDentist