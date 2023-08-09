import React from 'react'
import '../../styles/pagesStyles/ServiceStyle.css'
import DentalProsthesis from '../../images/DentalProsthesis.jpeg'
import Endodontics from '../../images/Endodontics.jpg'
import GeneralDentistry2 from '../../images/GeneralDentistry2.jpeg'
import Implantology from '../../images/Implantology.png'
import MaxillofacialSurgery from '../../images/MaxillofacialSurgery.jpeg'
import Orthodontics from '../../images/Orthodontics2.jpg'
import PediatricDentistry from '../../images/PediatricDentistry.jpeg'
import Periodontics from '../../images/Periodontics.png'
import CaleTeethWhiteningndar from '../../images/TeethWhitening.jpg'

const Service = () => {
  return (
    <div>

      <div className='service'>
        <h1>SERVICIOS</h1>

        <div class="grid-container">
          <div>
            <img src={GeneralDentistry2} alt="Imagen 1"/>
            <h3>Odontología general</h3>
            <p>Es el diagnóstico, tratamiento, prevención de enfermedades y afecciones de los dientes, las encías y la boca en general. Incluye servicios como la limpieza dental, las extracciones dentales, los rellenos dentales, entre otros.</p>
          </div>
          <div>   
            <img src={Implantology} alt="Imagen 2"/>
            <h3>Implantología</h3>
            <p>Consiste en colocar implantes dentales para reemplazar dientes faltantes o perdidos. Los implantes dentales son estructuras de titanio que se ponen en el hueso maxilar o mandibular para usar prótesis dentales.</p>
          </div>
          <div>
            <img src={Orthodontics} alt="Imagen 3"/>
            <h3>Ortodoncia</h3>
            <p> Especialidad que se enfoca en corregir la posición de los dientes y la mandíbula para lograr una buena mordida y una sonrisa más estética.</p>
          </div>
          <div>
            <img src={DentalProsthesis} alt="Imagen 4"/>
            <h3>Prótesis dental</h3>
            <p>Tratamiento para reemplazar dientes faltantes o restaurar dientes dañados, mediante prótesis dentales, ya sea fija o removible.</p>
          </div>
          <div>
            <img src={CaleTeethWhiteningndar} alt="Imagen 5"/>
            <h3>Blanqueamiento dental</h3>
            <p>Es un tratamiento estético para aclarar el tono de los dientes, eliminando las manchas y decoloraciones que pueden deberse al consumo de café, té, vino tinto, entre otros factores. El tratamiento puede realizarse con el uso de productos blanqueadores específicos.</p>
          </div>
          <div>
            <img src={Endodontics} alt="Imagen 6"/>
            <h3>Endodoncia</h3>
            <p>Tratamiento de conductos radiculares, que se realiza para tratar infecciones o inflamaciones en el interior de los dientes y preservar la estructura dental.</p>
          </div>
          <div>
            <img src={Periodontics} alt="Imagen 7"/>
            <h3>Periodoncia</h3>
            <p>Especialidad que trata las enfermedades de las encías y los tejidos que soportan los dientes, como el hueso alveolar y el ligamento periodontal.</p>
          </div>
          <div>
            <img src={MaxillofacialSurgery} alt="Imagen 8"/>
            <h3>Cirugía maxilofacial</h3>
            <p>Especialidad que se enfoca en el tratamiento de problemas de la mandíbula, la cara y el cráneo, como fracturas, malformaciones congénitas, tumores, entre otros.</p>
          </div>
          <div>
            <img src={PediatricDentistry} alt="Imagen 10"/>
            <h3>Odontopediatría</h3>
            <p>Se enfoca en la salud oral de los niños. Los odontopediatras brindan atención que incluye cuidado preventivo, diagnóstico y tratamiento de problemas dentales, y educación sobre hábitos de higiene oral saludables.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service