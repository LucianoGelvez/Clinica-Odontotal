import React, { useState } from 'react'

const FormToUpdatePatient =({ data, onGuardar, onCancelar, informacionCompleta  }) => {
  const [idPaciente, setid] = useState(data.idPaciente);
  const [nombre, setNombre] = useState(data.nombre);
  const [apellido, setApellido] = useState(data.apellido);
  const [documento, setDocumento] = useState(data.documento);
  const [calle, setCalle] = useState(data.domicilio.calle);
  const [localidad, setLocalidad] = useState(data.domicilio.localidad);
  const [numero, setNumero] = useState(data.domicilio.numero);
  const [provincia, setProvincia] = useState(data.domicilio.provincia);
  const [email, setEmail] = useState(data.email);
  const [fechaIngreso, setFechaIngreso] = useState(data.fechaNacimiento);
  const [fechaNacimiento, setFechaNacimiento] = useState(data.fechaNacimiento);
  const [telefono, setTelefono] = useState(data.telefono);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...data, idPaciente, nombre, apellido, provincia });

    const formData = {
      idPaciente: idPaciente,
      apellido: apellido,
      nombre: nombre,
      documento: documento,
      fechaIngreso: fechaIngreso,
      fechaNacimiento: fechaNacimiento,
      telefono: telefono,
      domicilio: {
        calle: calle,
        localidad: localidad,
        numero: numero,
        provincia: provincia,
      },
      email: email
    };
    console.log(formData)

    const url = `http://localhost:8080/pacientes`;
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        alert("La modificacion fue exitosa")
      } else {
        console.log("Error al actualizar el protecista");
      }
    })
    .then(error => {console.log(error)})
  };

  const onCancelarClick = (e) => {
    e.preventDefault();
    onCancelar();
  };

  // Busca la informacion correspondiente a la tabla sin la fila que se está editando
  const informacionFila = informacionCompleta.filter(item => item.idPaciente !== idPaciente);

  return (
    <section>
    <form onSubmit={handleSubmit} style={{display: "flex",justifyContent: "center"}}>
      <div>
      <label>Nombre:
        <input type="text" value={nombre} onChange={(e) => 
          setNombre(e.target.value)}/>
      </label>
      <label>
        Apellido: <input type="text"
          value={apellido} onChange={(e) => setApellido(e.target.value)}/>
      </label>
      <label>
            Documento: <input type="text"
          value={documento} onChange={(e) => setDocumento(e.target.value)}/>
      </label>
      
      <label>
        Email: <input type="text"
          value={email} onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <label>
        Fecha de Ingreso: <input type="date"
          value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)}/>
      </label>  
      <label>
        Fecha de Nacimiento: <input type="date"
          value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
      </label>    
      <label>
        Number: <input type="number"
          value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
      </label>     
      </div>
      
      
      <div> <h2>Domicilio</h2>
      <label>
      calle: <input type="text"
          value={calle} onChange={(e) => setCalle(e.target.value)}/>
      </label>      
      <label>
      localidad: <input type="text"
          value={localidad} onChange={(e) => setLocalidad(e.target.value)}/>
      </label>
      <label>
      numero: <input type="text"
          value={numero} onChange={(e) => setNumero(e.target.value)}/>
      </label>
      <label>
        Provincia: <input type="text"
          value={provincia} onChange={(e) => setProvincia(e.target.value)}/>
      </label>
      </div>
     
     

      <button type="submit">Guardar</button>
      <button className='cancel-change' onClick={onCancelarClick}>Cancelar</button>

      <br />
      {/* Muestra la informacion de la fila en la tabla mientras se edita */}
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>documento</th>
            <th>Provincia</th>
          </tr>
        </thead>
        <tbody>
        {informacionFila.map((item) => (
          <tr key={item.idPaciente}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.documento}</td>
            <td>{item.domicilio.provincia}</td>
            <td>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
  
    </section>
  );
}
export default FormToUpdatePatient