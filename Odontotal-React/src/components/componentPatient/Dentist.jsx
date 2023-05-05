import React from 'react'

const Dentist = (props) => {
  return (
        <div className="col-lg-4 container_dentist">
      <div className="text-center card-box">
        <div className="member-card pt-2 pb-2">
          <div className="thumb-lg member-thumb mx-auto">
            <img
              src={props.img}
              className="rounded-circle img-thumbnail"
              alt="profile-image"
            />
          </div>
          <div className="">
            <h4>{props.nombre} {props.apellido}</h4>
            <p className="text-muted">{props.especialidad}</p>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Dentist