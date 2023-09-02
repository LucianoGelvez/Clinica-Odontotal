import React from "react";
import SmileDentist from "../../images/SmileDentist.png";
import DoctorPortrait from "../../images/doctor-portrait.png";
import "../../styles/pagesStyles/AboutUsStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faHandshake,
  faPeopleCarryBox,
  faPeopleGroup,
  faHandFist,
} from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  return (
    <div>
      <div className="about-us">
        <div className="about-primary-container">
          <img className="about-image" src={SmileDentist} alt="" />
          <h1 className="about-tittle">Quiénes Somos</h1>
        </div>

        <div className="about-second-container">
          <div className="about-us_text">
            <h3 className="our-history">Nuestra historia</h3>
            <p className="text-history">
              Odontotal fue fundada en 2007 por el reconocido especialista en
              implantología, Enrique Pérez, quien cuenta con más de 30 años de
              experiencia en este campo y es miembro de la Sociedad Colombiana
              de Implantes (SOCI).
            </p>
            <p className="text-history">
              El Dr. Pérez ha seleccionado cuidadosamente un equipo de
              profesionales altamente capacitados y con valores en común, que
              garantizan un éxito cercano al 99% en tratamientos dentales.
              Nuestro equipo de servicio al cliente está siempre disponible para
              responder cualquier pregunta que puedas tener.
            </p>
            <p className="text-history">
              En Odontotal, nos diferenciamos de demás clínicas dentales gracias
              a la relación cercana y respetuosa que establecemos con nuestros
              pacientes. Nos enfocamos en el cuidado de cada uno de ellos y no
              en el aspecto comercial.
            </p>
          </div>
          <div className="doctor-info">
            <img className="doctor-portrait" src={DoctorPortrait} alt="" />
            <p className="doctor-name">Dr. Enrique Pérez</p>
          </div>
        </div>

        <div className="about-us_mission">
          <div>
            <h3 className="mission-value">Misión</h3>
            <p className="mission-text">
              Proporcionar a nuestros pacientes tratamientos odontológicos
              integrales de la más alta calidad, con atención especializada y
              personalizada en una infraestructura moderna y funcional, para
              lograr la satisfacción total del paciente y su bienestar oral a
              largo plazo.
            </p>
          </div>
          <div>
            <h3 className="mission-value">Visión</h3>
            <p className="mission-text">
              Convertirnos en líderes del mercado de la salud oral, reconocidos
              por nuestros pacientes en tratamientos con tecnología de última
              generación y un equipo de profesionales calificados, garantizar
              una odontología humana y socialmente responsable.
            </p>
          </div>
        </div>

        <div className="about-third-container">
          <h3 className="value-tittle">Nuestros valores</h3>
          <p className="value-description">
            En Odontotal, nos enorgullece operar bajo un sólido conjunto de
            valores que reflejan nuestro compromiso con la excelencia y el
            cuidado excepcional para nuestros pacientes. Estos valores actúan
            como la base de todo lo que hacemos, son la brújula que nos guía en
            nuestra búsqueda de brindar una atención excepcional y contribuir a
            sonrisas radiantes que perduren toda la vida.
          </p>
          <div className="our-values">
            <div className="value-container">
              <div className="value-image">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <p>Respeto</p>
            </div>
            <div className="value-container">
              <div className="value-image">
                <FontAwesomeIcon icon={faHandHoldingHeart} />
              </div>
              <p>Confianza</p>
            </div>
            <div className="value-container">
              <div className="value-image">
                <FontAwesomeIcon icon={faHandFist} />
              </div>
              <p>Liderazgo</p>
            </div>
            <div className="value-container">
              <div className="value-image">
                <FontAwesomeIcon icon={faPeopleGroup} />
              </div>
              <p>Vocación</p>
            </div>
            <div className="value-container">
              <div className="value-image">
                <FontAwesomeIcon icon={faPeopleCarryBox} />
              </div>
              <p>Colaboración</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
