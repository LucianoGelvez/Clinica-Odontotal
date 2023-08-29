import { createContext, useContext, useEffect, useState } from "react";
import baseUrl from './baseUrl.json'
import DentalProsthesis from '../../images/DentalProsthesis.jpeg'
import Endodontics from '../../images/Endodontics.jpg'
import GeneralDentistry2 from '../../images/GeneralDentistry2.jpeg'
import Implantology from '../../images/Implantology.png'
import MaxillofacialSurgery from '../../images/MaxillofacialSurgery.jpeg'
import Orthodontics from '../../images/Orthodontics2.jpg'
import PediatricDentistry from '../../images/PediatricDentistry.jpeg'
import Periodontics from '../../images/Periodontics.png'
import CaleTeethWhiteningndar from '../../images/TeethWhitening.jpg'


export const ContextGlobal = createContext();
export const ContextProvider = ({ children }) => {

  const url_ListDentists = baseUrl.url + "/odontologos/listAll";
  const url_ListPatients = baseUrl.url + "/pacientes";
  const url_ListDentalHygienists = baseUrl.url + "/protecistas/listAll";
  const url_ListTurn = baseUrl.url + "/turnos";

  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formData, setFormData] = useState({})

  const arrayService = [
    {
      imgSrc: GeneralDentistry2,
      alt: "Imagen 1",
      title: "Odontología general",
      description: "Es el diagnóstico, tratamiento, prevención de enfermedades y afecciones de los dientes, las encías y la boca en general. Incluye servicios como la limpieza dental, las extracciones dentales, los rellenos dentales, entre otros."
    },
    {
      imgSrc: Implantology,
      alt: "Imagen 2",
      title: "Implantología",
      description: "Consiste en colocar implantes dentales para reemplazar dientes faltantes o perdidos. Los implantes dentales son estructuras de titanio que se ponen en el hueso maxilar o mandibular para usar prótesis dentales."
    },
    {
      imgSrc: Orthodontics,
      alt: "Imagen 3",
      title: "Ortodoncia",
      description: "Especialidad que se enfoca en corregir la posición de los dientes y la mandíbula para lograr una buena mordida y una sonrisa más estética."
    },
    {
      imgSrc: DentalProsthesis,
      alt: "Imagen 4",
      title: "Prótesis dental",
      description: "Tratamiento para reemplazar dientes faltantes o restaurar dientes dañados, mediante prótesis dentales, ya sea fija o removible."
    },
    {
      imgSrc: CaleTeethWhiteningndar,
      alt: "Imagen 5",
      title: "Blanqueamiento dental",
      description: "Es un tratamiento estético para aclarar el tono de los dientes, eliminando las manchas y decoloraciones que pueden deberse al consumo de café, té, vino tinto, entre otros factores. El tratamiento puede realizarse con el uso de productos especializados."
    },
    {
      imgSrc: Endodontics,
      alt: "Imagen 6",
      title: "Endodoncia",
      description: "Tratamiento de conductos radiculares, que se realiza para tratar infecciones o inflamaciones en el interior de los dientes y preservar la estructura dental."
    },
    {
      imgSrc: Periodontics,
      alt: "Imagen 7",
      title: "Periodoncia",
      description: "Especialidad que trata las enfermedades de las encías y los tejidos que soportan los dientes, como el hueso alveolar y el ligamento periodontal."
    },
    {
      imgSrc: MaxillofacialSurgery,
      alt: "Imagen 8",
      title: "Cirugía maxilofacial",
      description: "Especialidad que se enfoca en el tratamiento de problemas de la mandíbula, la cara y el cráneo, como fracturas, malformaciones congénitas, tumores, entre otros."
    },
    {
      imgSrc: PediatricDentistry,
      alt: "Imagen 10",
      title: "Odontopediatría",
      description: "Se enfoca en la salud oral de los niños. Los odontopediatras brindan atención que incluye cuidado preventivo, diagnóstico y tratamiento de problemas dentales, y educación sobre hábitos de higiene oral saludables."
    }
  ];
  

  const [showNavbarAdmin, setShowNavbarAdmin] = useState(((user?.rol === "ADMIN" || user?.rol === "ODONTOLOGY") ? true : false))
  useEffect(() => {
    if (user?.rol === "ADMIN") {
      setShowNavbarAdmin(true);
    }
  }, [user]);

  const [information, setInformation] = useState([]);
  const [showLogin,setShowLogin] = useState(true)
  const [showRegister,setShowRegister] = useState(false)
  const [showDentist,setShowDentist] = useState(true)

    const fetchData = (url) => {
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setInformation(data))
        .catch((error) => console.log(error));
    };

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/ListaDeOdontologos") {
      fetchData(url_ListDentists);
    } else if (path === "/ListaDePacientes" || path === "/AgregarTurno") {
      fetchData(url_ListPatients);
    } else if (path === "/ListaDeProtecistas" ) {
      fetchData(url_ListDentalHygienists);
    } else if (path === "/ListaDeTurnos" || path === "/MisTurnos") {
      fetchData(url_ListTurn);
    }
  }, []);
  
  useEffect(() => {
    if (information.length > 0) {
      console.log(information);
    }
  }, [information]);
  

  return (
    <ContextGlobal.Provider value={{ arrayService, formData, setFormData , information ,showLogin, showRegister, setShowLogin, setShowRegister, showDentist,setShowDentist, user, setUser, jwt, setJwt,showNavbarAdmin, setShowNavbarAdmin}}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider
export const useContextGlobal = () => useContext(ContextGlobal)
