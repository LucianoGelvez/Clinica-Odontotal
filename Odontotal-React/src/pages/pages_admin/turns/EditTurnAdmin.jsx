import React, { useContext, useEffect, useState } from 'react'
import '../../../styles/pagesStyles/EditTurnAdminStyle.css'
import { ContextGlobal } from '../../../components/utils/global.context';
import baseUrl from '../../../components/utils/baseUrl.json'
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

const AddTurnAdmin = () => {
  const { information, user, jwt } = useContext(ContextGlobal);
  const { id } = useParams();

  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [odontologos, setOdontologos] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [especilistaFiltrado, setEspecilistaFiltrado] = useState([])
  const [turnsOdontology, setTurnsOdontology] = useState([]);
  const [turnsPatient, setTurnsPatient] = useState([]);
  const [turnoEncontrado, setTurnoEncontrado] = useState([]);
  const [horasTurnosFiltrados, setHorasTurnosFiltrados] = useState([]);
  const [formData, setFormData] = useState({
    id:'',
    odontologoId: '',
    documento: '',
    fecha: '',
    hora: '',
    pacienteId: ''
  })


  const urlDentist= baseUrl.url + "/odontologos/listAll"
  useEffect(() => {
    fetch(urlDentist)
      .then((res) => res.json())
      .then((data) => setOdontologos(data));
  }, []);

  const urlPatients = baseUrl.url + "/pacientes/"
  useEffect(() => {
    fetch(urlPatients, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }})
      .then((res) => res.json())
      .then((data) => setPacientes(data));
  }, []);

  const intervals = [
    "Selecciona un horario disponible", '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const urlTurnId = baseUrl.url + "/turnos/"+id;
  useEffect(() => {
    fetch(urlTurnId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setTurnoEncontrado(data);

      setFormData({
        id: data.id,
        odontologoId: data.odontologoId,
        documento: data.documentoPaciente,
        fecha: data.fecha,   
        hora: data.hora.slice(0,5),
        pacienteId: data.pacienteId,
      });

      setSelectedSpecialty(data.especialidad)
      setEspecilistaFiltrado(odontologos.filter(item => data.especialidad === item.especialidad))
      setSelectedDoctor(data.odontologoId)
      

      const urlTurnsOdontology = baseUrl.url + '/turnos/turnoOdontologo/'+data.odontologoId;
      const urlTurnsPatients = baseUrl.url + '/turnos/turnosPaciente/'+ data.pacienteId;
      
      fetch(urlTurnsOdontology, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }})
      .then((response) => response.json())
      .then((data) => setTurnsOdontology(data))
      .catch((error) => setTurnsOdontology([]));

      
      fetch(urlTurnsPatients, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }})
        .then((response) => response.json())
        .then((data) => setTurnsPatient(data))
        .catch((error) => {
          setTurnsPatient([]);
          console.log(error);
        });

    });
  }, [odontologos]);

  useEffect( () =>{
    const turnosFiltradosOdontologo = turnsOdontology.filter(turno => turno.fecha === turnoEncontrado.fecha);
      const turnosFiltradosPaciente = turnsPatient.filter(turno => turno.fecha === turnoEncontrado.fecha);
      const turnosFiltrados = turnosFiltradosOdontologo.concat(turnosFiltradosPaciente)
      const horasFiltradas = turnosFiltrados
        .filter(turno => turno.hora !== turnoEncontrado.hora)
        .map(turno => turno.hora);

      for (let i = 0; i < horasFiltradas.length; i++) {
        horasFiltradas[i] = horasFiltradas[i].slice(0, -3);
      } 

      setHorasTurnosFiltrados(horasFiltradas);
  },[turnoEncontrado.fecha, turnsOdontology, turnsPatient])

  useEffect(() => {
    console.log(formData);
    console.log(selectedDoctor);
    console.log(turnsOdontology);
    console.log(turnsPatient);
    console.log(horasTurnosFiltrados);
  }, [formData,selectedSpecialty,turnoEncontrado,selectedDoctor,especilistaFiltrado,turnsOdontology,turnsPatient,horasTurnosFiltrados]);

  const handleInputChangeDocument = (selectedOption) => {
    setFormData({
      odontologoId: '',
      documento: selectedOption.label,
      fecha: '',   
      hora: '',
      pacienteId: selectedOption.value,
    });
    setSelectedDoctor("")
    setEspecilistaFiltrado({})
    setSelectedSpecialty("")

    const urlTurnsPatients = baseUrl.url + '/turnos/turnosPaciente/'+ selectedOption.value;
    fetch(urlTurnsPatients, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }})
      .then((response) => response.json())
      .then((data) => setTurnsPatient(data))
      .catch((error) => {
        setTurnsPatient([]);
        console.log(error);
      });
  };

  const handleSpecialtySelect = (event) => {
    setSelectedSpecialty(event.target.value);
    setFormData({...formData, odontologoId:'',fecha:'',hora:''})
    setEspecilistaFiltrado(odontologos.filter(item => event.target.value === item.especialidad))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Si el campo es el select de especialistas (selectedDoctor), actualiza selectedDoctor en el estado
    if (name === 'selectedDoctor') {
      setSelectedDoctor(value);
    }

    // Actualiza el estado del formulario con los nuevos valores
    setFormData({
      ...formData, 
      [name]: value ,
      //pacienteId: user.id, 
      odontologoId: selectedDoctor });
  };


  const handleInputOdontologyChange = (event) => {
    const odontologoIdSelected = event.target.value
    setFormData({...formData, odontologoId:odontologoIdSelected, fecha: '', hora:''});
    setHorasTurnosFiltrados([])
    const urlTurnsOdontology = baseUrl.url + '/turnos/turnoOdontologo/'+odontologoIdSelected;
    fetch(urlTurnsOdontology, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }})
      .then((response) => response.json())
      .then((data) => setTurnsOdontology(data))
      .catch((error) => setTurnsOdontology([]));
  };

  const handleInputDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate.getDay() === 6) { // el día 6 corresponde al domingo, no dejar agendar turnos ese día
      setFormData({...formData, fecha: ''});
      Swal.fire({
        icon: "warning",
        title: "Día no disponible",
        text: "Por favor selecciona un día distinto a Domingo.",
      });
    };

    let fechaSeleccionada = event.target.value
    const turnosFiltradosOdontologo = turnsOdontology.filter(turno => turno.fecha === fechaSeleccionada);
    const turnosFiltradosPaciente = turnsPatient.filter(turno => turno.fecha === fechaSeleccionada);
    const turnosFiltrados = turnosFiltradosOdontologo.concat(turnosFiltradosPaciente)
    let horasFiltradas = turnosFiltrados.map(turno => turno.hora);
    for (let i = 0; i < horasFiltradas.length; i++) {
      horasFiltradas[i] = horasFiltradas[i].slice(0, -3);
    }
    setHorasTurnosFiltrados(horasFiltradas);
  };

  const obtenerHorasDisponibles = () => {
    const horasDisponibles = intervals.filter(interval => !horasTurnosFiltrados.includes(interval));
    return horasDisponibles;
  };
  
  function getTomorrowDateString() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }  


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formSend = {
      id: formData.id,
      odontologoId: formData.odontologoId,
      fecha: formData.fecha,
      hora: formData.hora,
      pacienteId: formData.pacienteId
    }
    console.log(formSend);
    if(formData.hora !=='' && formData.odontologoId !==''&& formData.hora !=='Selecciona un horario disponible'){
      const confirmResult = await Swal.fire({
        title: 'Confirmar datos',
        text: `¿Desea agendar el turno de ${especilistaFiltrado[0].especialidad.replace(/_/g, ' ')} con ${especilistaFiltrado[0].nombre} ${especilistaFiltrado[0].apellido} el día ${formData.fecha} a las ${formData.hora}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
    
      // Si el usuario acepta la confirmación
      if (confirmResult.isConfirmed) {
        try{
          const response = await fetch(urlTurnId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(formSend),
          });
  
          if (response.ok) {
            const responseData = await response.json();
            console.log('Datos enviados correctamente');
  
            Swal.fire(
              {
                title: 'Turno actualizado correctamente',
                text: `Hemos enviado un correo con los detalles del turno.`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
              }
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.pathname="/ListaDeTurnos"
              }
            })
          } else {
            console.error('Error al enviar los datos');
            Swal.fire({
              icon: "error",
              title: "Error al agendar turno",
              text: "Por favor, verifique los campos nuevamente.",
            });
            }
        }
        catch (error) {
          console.error('Error en la conexión', error);
          }
        }
    }else{
      Swal.fire({
        icon: "warning",
        title: "No se puede agendar el turno",
        text: "Por favor complete todos los campos.",
      });
    }
    
  };

  const handleCancel = () => {
    window.location.pathname = "/ListaDeTurnos"
  }
  

  const resetUploadForm = () => {
    window.location.reload();
    setFormData({
      odontologoId: '',
      documento: '',
      fecha: '',   
      hora: '',
      pacienteId: '',
    });
    selectedDoctor("")
    setEspecilistaFiltrado({})
    selectedSpecialty(null)
    
  };
  return (
  
    <div className='main-edit-turn'>
      { user?.rol === "ADMIN" ? (
      <div className='edit-container'>
        <form onSubmit={handleSubmit}>
          <h3>Editar Turno</h3>
          <div className="dropdown">
            <label className="control-label" htmlFor="documento">Documento paciente:</label>
            <Select
              value={{ value: formData?.documento, label: formData?.documento }}
              onChange={(selectedOption) => handleInputChangeDocument(selectedOption)}
              isSearchable={false} // Desactivar la búsqueda
              placeholder="Selecciona un documento"
              required
            />
          </div>


          <div className="dropdown">
            <label className="control-label" htmlFor="selectedSpecialty">Especialidad:</label>
            <select className="form-select" name="selectedSpecialty" id="selectedSpecialty" value={selectedSpecialty} onChange={handleSpecialtySelect} required>
              <option value="">Selecciona una especialidad</option>
              <option value="ESPECIALIDAD_ORTODONCISTA">Ortodoncia</option>
              <option value="ESPECIALIDAD_PERIODONCISTA">Periodoncia</option>
              <option value="ESPECIALIDAD_ENDODONCISTA">Endodoncia</option>
              <option value="ESPECIALIDAD_ODONTOPEDIATRIA">Odontopediatría</option>
              <option value="ESPECIALIDAD_CIRUGIA_ORAL">Cirugía oral</option>
              <option value="ESPECIALIDAD_CIRUGIA_MAXILOFACIAL">Cirugía maxilofacial</option>
              <option value="ESPECIALIDAD_PROTESISTA">Prótesis</option>
            </select>
          </div>

          {selectedSpecialty && 
            <div className="dropdown">
              <label className="control-label" htmlFor="selectedDoctor">Especialista:</label>
              <select className="form-select" aria-label="Dropdown example" name="selectedDoctor" value={formData?.odontologoId} onChange={(event) => {
                handleInputChange(event)
                handleInputOdontologyChange(event)
              }} required>
                <option value="" selected>Selecciona un especialista</option>
                {selectedSpecialty === "ESPECIALIDAD_ORTODONCISTA" && 
                  <>
                  {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre} {odontologo.apellido}</option>)}    
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_PERIODONCISTA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre} {odontologo.apellido}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_ENDODONCISTA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre} {odontologo.apellido}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_ODONTOPEDIATRIA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre} {odontologo.apellido}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_CIRUGIA_ORAL" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre} {odontologo.apellido}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_CIRUGIA_MAXILOFACIAL" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre} {odontologo.apellido}</option>)} 
                  </>
                }
                    {selectedSpecialty === "ESPECIALIDAD_PROTESISTA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre} {odontologo.apellido}</option>)} 
                  </>
                }
              </select>
            </div>
          }

          <div className="form-group">
            <label className="control-label" htmlFor="fecha"> Fecha:</label>
            <input type="date"className="form-control" id="fecha" placeholder="Ingrese el fecha"
            name="fecha" value={formData.fecha} 
            min={getTomorrowDateString()}
            onChange={(event) => {
              handleInputChange(event)
              handleInputDateChange(event)
            }} 
            required/>
          </div>

          <div className="dropdown">     
          <label className="control-label" htmlFor="hora"> Hora:</label>
            <select className="form-select" name="hora" id="hora" value={formData?.hora} onChange={handleInputChange} required>
              {obtenerHorasDisponibles().map((hora, index) => (
              <option key={index} >{hora}</option>  
              ))}
            </select>
          </div>

          <div>
            <button type="submit" className='btn-send'>Enviar</button>
            <button type="button" className="btn-cancel"onClick={handleCancel}>Cancelar</button>
          </div>
  
        </form>
      </div>
      ) : null} 
    </div>
  )
}

export default AddTurnAdmin