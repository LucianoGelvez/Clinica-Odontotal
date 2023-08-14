import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pagesStyles/TurnsStyle.css'
import { ContextGlobal } from '../../components/utils/global.context';
import Phone from '../../images/Phone.png'
import Calendar from '../../images/Calendar.png'
import Contact from '../../images/Contact.png'
import Whatsapp from '../../images/Whatsapp.png'
import Dent from '../../images/Dent.png'
import Dentist from '../../images/Dentist.png'
import Plan from '../../images/Plan.png'
import Presentation from '../../images/Presentation.png'
import baseUrl from '../../components/utils/baseUrl.json'
import Swal from 'sweetalert2';

const Turns = () => {
  const { information, user, jwt} = useContext(ContextGlobal);
  const usuarioEncontrado = localStorage.getItem('user')

  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [odontologos, setOdontologos] = useState({})
  const [especilistaFiltrado, setEspecilistaFiltrado] = useState({})
  const [turnsOdontology, setTurnsOdontology] = useState([]);
  const [horasTurnosFiltrados, setHorasTurnosFiltrados] = useState([]);


  const handleSpecialtySelect = (event) => {
    setSelectedSpecialty(event.target.value);
    setFormData({...formData, odontologoId:'',fecha:'',hora:''})
    setEspecilistaFiltrado(odontologos.filter(item => event.target.value === item.especialidad))
  }

  useEffect(() => {
    console.log(especilistaFiltrado) 
    console.log(formData);
    console.log(selectedDoctor)
    console.log(turnsOdontology);
    console.log(horasTurnosFiltrados);
  }, [ selectedDoctor,especilistaFiltrado,turnsOdontology,horasTurnosFiltrados]);


  const url = baseUrl.url + "/odontologos/listAll"
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOdontologos(data));
  }, []);

  const intervals = [
    "Selecciona un horario disponible", '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const [formData, setFormData] = useState({
    odontologoId: '',
    fecha: '',
    hora: '',
    pacienteId: '',    
  })
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Si el campo es el select de especialistas (selectedDoctor), actualiza selectedDoctor en el estado
    if (name === 'selectedDoctor') {
      setSelectedDoctor(value);
    }
  
    // Actualiza el estado del formulario con los nuevos valores
    setFormData({
      ...formData,
      [name]: value,
      pacienteId: user.id,
      odontologoId: name === 'selectedDoctor' ? value : formData.odontologoId,
    });
  };
  

  const handleInputOdontologyChange = (event) => {
    
    const odontologoIdSelected = event.target.value
    setFormData({formData, odontologoId:odontologoIdSelected, fecha: '', hora:''});
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
    const turnosFiltrados = turnsOdontology.filter(turno => turno.fecha === fechaSeleccionada);
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
          const url = baseUrl.url + '/turnos';
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
                title: 'Turno agendado correctamente',
                text: `Hemos enviado un correo con los detalles del turno.`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
              }
            ).then((result) => {
              if (result.isConfirmed) {
                console.log(responseData);
                resetUploadForm();
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

  const resetUploadForm = () => {
    window.location.reload();
    setFormData({
      odontologoId: '',
      fecha: '',   
      hora: '',
      pacienteId: '',
    });
    selectedDoctor(null)
    setEspecilistaFiltrado({})
    selectedSpecialty(null)
    setOdontologos({})
    
  };

  return (
    <div>
  
      {usuarioEncontrado &&
      <div className='turns'>
      <div className='turns_information'>
        <h3>Agenda hoy mismo tu cita de valoración</h3>
        <p>En Odontotal trabajamos para siempre darte lo mejor, conoce los diferentes canales para que puedas agendar tu cita de valoración</p>
      

        <div className='turns_information_contact'>
          <div className='turns_information_contact_frame'>
            <img className='turns_information_contact_img' src={Phone} alt="" />
            <p>Llámanos</p>
          </div>
          <div className='turns_information_contact_frame'>
          <img className='turns_information_contact_img' src={Calendar} alt="" />
            <p>Agéndate tu mismo</p>
          </div>
          <div className='turns_information_contact_frame'>
          <img className='turns_information_contact_img' src={Contact} alt="" />
            <p>Nosotros te llamanos</p>
          </div>
          <div className='turns_information_contact_frame'>
          <img className='turns_information_contact_img' src={Whatsapp} alt="" />
            <p>Escríbenos a WhatsApp</p>
          </div>
        </div>
      </div>

      <div className='add-turn'>
      <h3>Agendar Turno</h3>
        <form onSubmit={handleSubmit}>
          <div className="dropdown">
            <select name="selectedSpecialty" id="selectedSpecialty" onChange={handleSpecialtySelect} required>
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
              <select className="form-select" aria-label="Dropdown example" name="selectedDoctor" value={formData.odontologoId}onChange={(event) => {
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
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_ENDODONCISTA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_ODONTOPEDIATRIA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_CIRUGIA_ORAL" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_CIRUGIA_MAXILOFACIAL" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                    {selectedSpecialty === "ESPECIALIDAD_PROTESISTA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option value={odontologo.id} key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
              </select>
            </div>
          }

          <div className="form-group">
            <label className="control-label" htmlFor="fecha"> Fecha:</label>
            <input type="date"className="form-control" id="fecha" placeholder="Ingrese la fecha"
            name="fecha" value={formData.fecha}
            min={getTomorrowDateString()}
            onChange={(event) => {
              handleInputChange(event)
              handleInputDateChange(event)
            }} 
            required/>
            <select className="hora" name="hora" id="hora" value={formData.hora} onChange={handleInputChange} required>
            {obtenerHorasDisponibles().map((hora, index) => (
              <option key={index}>{hora}</option>
            ))}
            </select>
          </div>
          <button>Cargar</button>
        </form>
      </div>

      <div className='turns_information'>
        <h3>Cómo será tu primera cita</h3>
        <p>En Odontotal trabajamos para siempre darte lo mejor, conoce los diferentes canales para que puedas agendar tu cita de valoración</p>
            
        <div className='turns_information_contact'>
          <div className='turns_information_contact_frame'>
            <img className='turns_information_contact_img' src={Dent} alt="" />
            <p>Exámenes diagnósticos (Rayos X, Radiografía panorámica)</p>
          </div>
          <div className='turns_information_contact_frame'>
          <img className='turns_information_contact_img' src={Dentist} alt="" />
            <p>Evaluación médica y diagnóstico de especialista</p>
          </div>
          <div className='turns_information_contact_frame'>
          <img className='turns_information_contact_img' src={Plan} alt="" />
            <p>Plan de tratamiento y presupuesto</p>
          </div>
          <div className='turns_information_contact_frame'>
          <img className='turns_information_contact_img' src={Presentation} alt="" />
            <p>Presentación de alternativas de pago y financiación</p>
          </div>
        </div>
      </div>
      
      </div>
      }
      
    </div>
  
  )
}

export default Turns