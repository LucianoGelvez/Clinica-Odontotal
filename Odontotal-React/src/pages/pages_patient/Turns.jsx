import React, { useContext, useEffect, useState } from 'react'
import NavbarPatient from '../../components/componentPatient/NavbarPatient'
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
import Login from '../../components/Login';
import Register from '../../components/Register';
import baseUrl from '../../components/utils/baseUrl.json'

const Turns = () => {
  const { information, showLogin, showRegister, setShowLogin, setShowRegister } = useContext(ContextGlobal);
  const usuarioEncontrado = localStorage.getItem('user')
  // console.log(information)

  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [odontologos, setOdontologos] = useState({})
  const [especilistaFiltrado, setEspecilistaFiltrado] = useState({})

  const handleSpecialtySelect = (event) => {
    setSelectedSpecialty(event.target.value);
    setEspecilistaFiltrado(odontologos.filter(item => event.target.value === item.especialidad))
  }

  useEffect(() => {
    console.log(especilistaFiltrado) 
    console.log(newFormData);
  }, [ especilistaFiltrado]);
  useEffect(() => {
    console.log(selectedDoctor)
  }, [ selectedDoctor]);


  const handleDoctorSelect = (event) => { 
    setSelectedDoctor(event.target.value);
    console.log(selectedDoctor)
  }

  const url = baseUrl.url + "/odontologos"
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOdontologos(data));
  }, []);

  const intervals = [
    "Selecciones un horario disponible", '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];
const [dataResponse, setResponse] = useState({})

  const [formData, setFormData] = useState({
    odontologoId: '',
    fecha: '',
    
  });

  const [newFormData, setNewFormData] = useState({
    ...formData,
    hora: '',
    pacienteId: '',
    odontologoId: '',
    
  })
  const match = information.find((item => item.documento === formData.documento))
  // console.log(match.idPaciente)
  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setNewFormData({ ...formData, [name]: value ,pacienteId: match.idPaciente, odontologoId: selectedDoctor });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formulario")
    console.log(newFormData)
    const url = baseUrl.url + '/turnos';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFormData),
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

      console.log(dataResponse)
  };

  const resetUploadForm = () => {
    window.location.reload();
    setFormData({
      odontologoId: '',
      documento: documentPatient, //Traer valor del LocalStorage
      fecha: '',   
    });
    setNewFormData({
      ...formData,
      hora: '',
      pacienteId: '',
      odontologoId: '',
    });
    selectedDoctor("")
    setEspecilistaFiltrado({})
    selectedSpecialty(null)
    setOdontologos({})
    
  };

  return (
    <div>
      <NavbarPatient/>
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
              <option>Selecciona una especialidad</option>
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
              <select className="form-select" aria-label="Dropdown example" onChange={handleDoctorSelect}>
                <option selected>Selecciona un especialista</option>
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
                    {especilistaFiltrado.map(odontologo => <option key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_CIRUGIA_ORAL" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                {selectedSpecialty === "ESPECIALIDAD_CIRUGIA_MAXILOFACIAL" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
                    {selectedSpecialty === "ESPECIALIDAD_PROTESISTA" &&
                  <>
                    {especilistaFiltrado.map(odontologo => <option key={odontologo.id}>{odontologo.nombre}</option>)} 
                  </>
                }
              </select>
            </div>
          }

          <div className="form-group">
            <label className="control-label" htmlFor="fecha"> Fecha:</label>
            <input type="date"className="form-control" id="fecha" placeholder="Ingrese el fecha"
            name="fecha" value={formData.fecha} onChange={handleInputChange} required/>
            <select className="hora" name="hora" id="hora" value={formData.hora} onChange={handleInputChange} required>
            {intervals.map((interval, index) => (
              <option key={index} >{interval}</option>  
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