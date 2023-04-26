// import React, { useEffect, useState } from 'react'
// import NavbarPatient from '../../components/component-patient/NavbarPatient'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

// const Turns = () => {

//   const [selectedDate, setSelectedDate] = useState(null)
//   const [selectedSpecialty, setSelectedSpecialty] = useState(null)
//   const [selectedDoctor, setSelectedDoctor] = useState(null)

//   const handleSpecialtySelect = (event) => {
//     setSelectedSpecialty(event.target.value);
//     setSelectedDoctor(null);
//   }

//   const handleDoctorSelect = (event) => {
//     setSelectedDoctor(event.target.value);
//   }

//   let url = "http://localhost:8080/odontologos"

//   useEffect(() => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   }, []);

//   return (
//     <div className='turn'>Turns
//       <NavbarPatient/>
//       <h2 className='turn_titulo'>--</h2>

//       <h3>Agenda hoy mismo tu cita de valoración</h3>
//       <p>En Odontotal trabajamos para siempre darte lo mejor, conoce los diferentes canales para que puedas agendar tu cita de valoración</p>

//       <div className="dropdown">
//         <select className="form-select" aria-label="Dropdown example" onChange={handleSpecialtySelect}>
//           <option selected>Selecciona una especialidad</option>
//           <option value="ORTODONCIA">ORTODONCIA</option>
//           <option value="PERIODONCIA">PERIODONCIA</option>
//           <option value="ENDODONCIA">ENDODONCIA</option>
//           <option value="ODONTOPEDIATRIA">ODONTOPEDIATRIA</option>
//           <option value="CIRUGIA-ORAL">CIRUGIA ORAL</option>
//           <option value="CIRUGIA-MAXILOFACIAL">CIRUGIA MAXILOFACIAL</option>
//           <option value="PROTESIS">PROTESIS</option>
//         </select>
//       </div>

//       {selectedSpecialty && 
//         <div className="dropdown">
//           <select className="form-select" aria-label="Dropdown example" onChange={handleDoctorSelect}>
//             <option selected>Selecciona un especialista</option>
//             {selectedSpecialty === "ORTODONCIA" && 
//               <>
//                 <option value="Dr. Ortiz">Dr. Ortiz</option>
//                 <option value="Dr. Gonzalez">Dr. Gonzalez</option>
//               </>
//             }
//             {selectedSpecialty === "PERIODONCIA" &&
//               <>
//                 <option value="Dra. Torres">Dra. Torres</option>
//                 <option value="Dra. Ramirez">Dra. Ramirez</option>
//               </>
//             }
//             {/* Renderizar lo demás */}
//           </select>
//         </div>
//       }

//       <div>
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat='dd/MM/yyyy'
//           placeholderText='Selecciona una fecha'
//         />
//       </div>

//       <div className="dropdown">
//         <select className="form-select" aria-label="Dropdown example">
//           <option selected>Selecciona una hora</option>
//           <option value="9:00-9:30">9:00-9:30</option>
//           <option value="9:30-10:00">9:30-10:00</option>
//           <option value="10:00-10:30">10:00-10:30</option>
//           <option value="10:30-11:00">10:30-11:00</option>
//           <option value="11:00-11:30">11:00-11:30</option>
//           <option value="11:30-12:00">11:30-12:00</option>
    
//         </select>
//       </div>

//     </div>

//   )
// }

// export default Turns