import React, { useContext, useEffect, useRef, useState } from 'react'
import { ContextGlobal } from '../components/utils/global.context'
import NavbarDentist from '../components/componentDentist/NavbarDentist';
import baseUrl from '../components/utils/baseUrl.json'
import Swal from 'sweetalert2';
import profilePic from '../images/profilePic.svg'

const Profile = () => {
    const { user, jwt } = useContext(ContextGlobal);
    const [dataPesonal, setData] = useState({})

    const local = JSON.parse(localStorage.getItem('user'))
    const jwtLocal = localStorage.getItem('jwt')


    // const [edition, setedition] = useState(null);

    const [id, setId] = useState(local.id);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [password, setPassword] = useState('');
    const [genero, setGenero] = useState('');
    const [documento, setDocumento] = useState('');
    const [matricula, setMatricula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [calle, setCalle] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [urlImagen, setUrlImagen] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [changeImage, setChangeImage] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    
    const [showNombre, setShowNombre] = useState(false)
    const [showApellido, setShowApellido] = useState(false)
    const [showFechaDeNacimiento, setShowFechaDeNacimiento] = useState(false)
    const [showGenero, setShowGenero] = useState(false)
    const [showDocumento, setShowDocumento] = useState(false)
    const [showMatricula, setShowMatricula] = useState(false)
    const [showTelefono, setShowTelefono] = useState(false)
    const [showEspecialidad, setShowEspecialidad] = useState(false)
    const [showCalle, setShowCalle] = useState(false)
    const [showNumero, setShowNumero] = useState(false)
    const [showLocalidad, setShowLocalidad] = useState(false)
    const [showProvincia, setShowProvincia] = useState(false)
    const [sureToDelete, setSureToDelete] = useState(false)
    const imageRef = useRef(null);
    const buttonRef = useRef(null);
    const buttonRef2 = useRef(null);
    const deleteRef = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = `http://localhost:8080/odontologos/${local?.id}`;
    
          const response = await fetch(url, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${jwtLocal}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
    
          const data = await response.json();
          console.log(data);
          console.log(data);
          console.log(data);

          setData(data);
          // console.log(possibleCities)
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, []);


    const handleDocumentClick = (event) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setChangeImage(false);
      }
  
      if (
        deleteRef.current &&
        !deleteRef.current.contains(event.target) &&
        !buttonRef2.current.contains(event.target)
      ) {
        setSureToDelete(false);
      }
  
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
      setFilePreview(URL.createObjectURL(file));
    };
  
    useEffect(() => {
      document.addEventListener('click', handleDocumentClick);
  
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }, []);






    useEffect(() => {
      setNombre(dataPesonal.nombre || '');
        setApellido(dataPesonal.apellido || '');
        setEspecialidad(dataPesonal.especialidad || '');
        setPassword(dataPesonal.password || '');
        setGenero(dataPesonal.genero || '');
        setDocumento(dataPesonal.documento || '');
        
      setMatricula(dataPesonal.matricula || '');
        
      setTelefono(dataPesonal.telefono || '');
        
      setCalle(dataPesonal.calle || '');
        
      setEmail(dataPesonal.email || '');

      setNumero(dataPesonal.numero || '');

      setLocalidad(dataPesonal.localidad || '');
        
      setProvincia(dataPesonal.provincia || '');

      setUrlImagen(dataPesonal.urlImagen || '');
        
      setFechaNacimiento(dataPesonal.fechaNacimiento || '');
      }, [dataPesonal]);
      


  // const handleEditar = (item) => {
  //   setedition(item);
  //   setShowNombre(true)
  // };

  // const handleGuardar = (item) => {
  //   if (edition) {
  //     setData((prevState) =>
  //       prevState.map((x) => (x.id === item.id ? item : x))
  //     );
  //     setedition(null);
  //   } else {
  //     setData((prevState) => [...prevState, { ...item, id: Date.now() }]);
  //   }
  // };

  
  const handleSubmit = (e) => {
 
    e.preventDefault();
    // handleGuardar({ ...datePersonal, e});

    const formData = {
      id: id,
      apellido: apellido,
      nombre: nombre,
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
      provincia: provincia,
      urlImagen: urlImagen
    };
    const url = baseUrl.url + `/odontologos/`;
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwtLocal}`
      },
      body: JSON.stringify(formData),
    };
    console.log(formData)

    fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        Swal.fire(
          'La modificacion fue exitosa',
        )
        setTimeout(() => {
          window.location.reload()
        }, 1500);
   
      } else {
        // console.log(formData)
       
          console.log("Error al actualizar el odontologo");
       
        console.log("Error al actualizar el odontologo");
      }
    })

  };
  

 const  handleCancelar = () => {
  console.log(dataPesonal.nombre)
  setShowNombre(false)
  setShowApellido(false)
  setShowFechaDeNacimiento(false)
  setShowGenero(false)
  setShowDocumento(false)
  setShowTelefono(false)
  setShowMatricula(false)
  setShowEspecialidad(false)
  setShowCalle(false)
  setShowNumero(false)
  setShowLocalidad(false)
  setShowProvincia(false)
  }

  const handleSaveChanges = () => {
    const formData = new FormData();
    // const token = JSON.parse(localStorage.getItem("jwt"))
    // const userId = user.id;
    formData.append('file', selectedImage);
    formData.append('id', local.id);


    fetch(`http://localhost:8080/odontologos/uploadImage`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwtLocal}`
      },
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          window.location.reload()
          localStorage.setItem('user', JSON.stringify(dataPesonal));
          console.log('Image uploaded successfully');
        } else {
          console.error('Error uploading image');
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  function deleteImage() {
    const url = `http://localhost:8080/odontologos/deleteImage/${user.id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLocal}`
      }
    })
      .then(response => {
        if (response.ok) {
          setChangeImage(false)
          return response.json()
        } else {
          throw new Error('Error en la solicitud DELETE');
        }
      })
      .then(data => {
        console.log(data);
        const updatedData = {
          ...data,
        };
        setData(updatedData);
        console.log(profileData);
      })
      .catch(error => {
        console.error(error);
      });

  }

  return (
    <div>
    <NavbarDentist></NavbarDentist>
        <div>
            <h1>Datos personales</h1>
            <h2>Actualizá tus datos para poder estar en contacto en caso de urgencia</h2>
            <div>
            {dataPesonal?.urlImagen ?
          <div className='profile_image'>
            <img style={{width: "100px", height: "100px"}} src={dataPesonal.urlImagen} />
            <button ref={buttonRef} onClick={() => setChangeImage(true)}>Change image</button>
          </div> :
          <div className='profile_image'>
            <img src={profilePic} style={{width: "100px", height: "100px"}}/>
            <button ref={buttonRef} onClick={() => setChangeImage(true)}>Change image</button>
          </div>
        }
            {changeImage && (
          <div className='profile_change_pic'>
            {dataPesonal?.urlImagen || selectedImage != null ? (
              <div ref={imageRef}>
                {
                  selectedImage == null ?
                    <img style={{width: "100px", height: "100px"}} src={dataPesonal.urlImagen} />
                    :
                    <img style={{width: "100px", height: "100px"}} src={filePreview} />
                }
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <article>
                  <button className='profile_change_pic_delete' onClick={deleteImage}>Delete Image</button>
                  <button onClick={handleSaveChanges}>Save changes</button>
                </article>
              </div>
            ) : (
              <div ref={imageRef}>
                <img src={profilePic} />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <article>
                  <button onClick={handleSaveChanges}>Save changes</button>
                </article>
              </div>
            )}
          </div>
        )}
            <form style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <table>
            {/* <thead>
        <th>Foto</th>
        <img src={urlImagen} style={{width: "50px", height: "50px"}} alt="" />
        {showApellido ? <label>Foto:<input type="text" value={urlImagen} onChange={(e) => setUrlImagen(e.target.value)}/></label>  : <button onClick={() => setShowApellido(true)}>Editar</button>} 
        {showApellido && <button onClick={handleCancelar}>Cancelar</button>}
        {showApellido && <button onClick={handleSubmit}>Guardar</button>}
        </thead> */}

        <thead>
        <th>Apellido</th>
        <td> {dataPesonal.apellido}</td>
        {showApellido ? <label>Apellido:<input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}/></label>  : <button onClick={() => setShowApellido(true)}>Editar</button>} 
        {showApellido && <button onClick={handleCancelar}>Cancelar</button>}
        {showApellido && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Nombre</th>
        <td> {dataPesonal.nombre}</td>
        {showNombre ? <label>Nombre:<input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/></label>  : <button onClick={() => setShowNombre(true)}>Editar</button>} 
        {showNombre && <button onClick={handleCancelar}>Cancelar</button>}
        {showNombre && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Fecha de Nacimiento</th>
        <td> {dataPesonal.fechaNacimiento}</td>
        {showFechaDeNacimiento ? <label>Fecha Nacimiento:<input type="text" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/></label>  : <button onClick={() => setShowFechaDeNacimiento(true)}>Editar</button>} 
        {showFechaDeNacimiento && <button onClick={handleCancelar}>Cancelar</button>}
        {showFechaDeNacimiento && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Genero</th>
        <td> {dataPesonal.genero}</td>
        {showGenero ?  <label className="control-label" htmlFor="genero"> Genero:   
              <select name="genero" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required>
              <option selected>Selecciona una especialidad</option>
               <option >Femenino</option>
               <option >Masculino</option>
               <option >NoBinario</option>
               <option >Transgenero</option>
               <option >Otro</option>
              </select> </label>   : <button onClick={() => setShowGenero(true)}>Editar</button>} 
        {showGenero && <button onClick={handleCancelar}>Cancelar</button>}
        {showGenero && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Documento</th>
        <td> {dataPesonal.documento}</td>
        {showDocumento ? <label>Documento:<input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)}/></label>  : <button onClick={() => setShowDocumento(true)}>Editar</button>} 
        {showDocumento && <button onClick={handleCancelar}>Cancelar</button>}
        {showDocumento && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Matricula</th>
        <td> {dataPesonal.matricula}</td>
        {showMatricula ? <label>Matricula:<input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)}/></label>  : <button onClick={() => setShowMatricula(true)}>Editar</button>} 
        {showMatricula && <button onClick={handleCancelar}>Cancelar</button>}
        {showMatricula && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Telefono</th>
        <td> {dataPesonal.telefono}</td>
        {showTelefono ? <label>Telefono:<input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)}/></label>  : <button onClick={() => setShowTelefono(true)}>Editar</button>} 
        {showTelefono && <button onClick={handleCancelar}>Cancelar</button>}
        {showTelefono && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Especialidad</th>
        <td> {dataPesonal.especialidad}</td>
        {showEspecialidad ?        <label>Especialidad:
      <select name="especialidad" id="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required>
        <option>ESPECIALIDAD_ORTODONCISTA</option>
        <option>ESPECIALIDAD_PERIODONCISTA</option>
        <option>ESPECIALIDAD_ENDODONCISTA</option>
        <option>ESPECIALIDAD_ODONTOPEDIATRIA</option>
        <option>ESPECIALIDAD_CIRUGIA_ORAL</option>
        <option>ESPECIALIDAD_CIRUGIA_MAXILOFACIAL</option>
        <option>ESPECIALIDAD_PROTESISTA</option>
      </select>
    </label>  : <button onClick={() => setShowEspecialidad(true)}>Editar</button>} 
        {showEspecialidad && <button onClick={handleCancelar}>Cancelar</button>}
        {showEspecialidad && <button onClick={handleSubmit}>Guardar</button>}
        </thead>

        <thead>
          <h3>Domicilio</h3>
          </thead>
        <thead>
        <th>Calle</th>
        <td> {dataPesonal.calle}</td>
        {showCalle ? <label>Calle:<input type="text" value={calle} onChange={(e) => setCalle(e.target.value)}/></label>  : <button onClick={() => setShowCalle(true)}>Editar</button>} 
        {showCalle && <button onClick={handleCancelar}>Cancelar</button>}
        {showCalle && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        
        <thead>
        <th>Numero</th>
        <td> {dataPesonal.numero}</td>
        {showNumero ? <label>Numero:<input type="text" value={numero} onChange={(e) => setNumero(e.target.value)}/></label>  : <button onClick={() => setShowNumero(true)}>Editar</button>} 
        {showNumero && <button onClick={handleCancelar}>Cancelar</button>}
        {showNumero && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Localidad</th>
        <td> {dataPesonal.localidad}</td>
        {showLocalidad ? <label>Localidad:<input type="text" value={localidad} onChange={(e) => setLocalidad(e.target.value)}/></label>  : <button onClick={() => setShowLocalidad(true)}>Editar</button>} 
        {showLocalidad && <button onClick={handleCancelar}>Cancelar</button>}
        {showLocalidad && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <thead>
        <th>Provincia</th>
        <td> {dataPesonal.provincia}</td>
        {showProvincia ? <label>Provincia:<input type="text" value={provincia} onChange={(e) => setNombre(e.target.value)}/></label>  : <button onClick={() => setShowProvincia(true)}>Editar</button>} 
        {showProvincia && <button onClick={handleCancelar}>Cancelar</button>}
        {showProvincia && <button onClick={handleSubmit}>Guardar</button>}
        </thead>
        <tbody>
     
        </tbody>
      </table>
</form>
            </div>
        </div>

      </div>
  )
}

export default Profile