import React, { useState } from 'react'
import Swal from 'sweetalert2';
import baseUrl from '../../../components/utils/baseUrl.json'

const FormToUpdateDentist =({ data, onGuardar, onCancelar, informacionCompleta, jwt  }) => {
  const [id, setId] = useState(data.id);
  const [nombre, setNombre] = useState(data.nombre);
  const [apellido, setApellido] = useState(data.apellido);
  const [especialidad, setEspecialidad] = useState(data.especialidad);
  const [password, setPassword] = useState(data.password);
  const [genero, setGenero] = useState(data.genero);
  const [documento, setDocumento] = useState(data.documento);
  const [matricula, setMatricula] = useState(data.matricula);
  const [email, setEmail] = useState(data.email);
  const [telefono, setTelefono] = useState(data.telefono);
  const [calle, setCalle] = useState(data.calle);
  const [numero, setNumero] = useState(data.numero);
  const [localidad, setLocalidad] = useState(data.localidad);
  const [provincia, setProvincia] = useState(data.provincia);
  const [fechaNacimiento, setFechaNacimiento] = useState(data.fechaNacimiento);


  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...data, id});

    const formData = {
      id: id,
      apellido: apellido,
      nombre: nombre,
      password:password,
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
      provincia: provincia
    };

    const url = baseUrl.url + `/odontologos/`;
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + jwt
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        Swal.fire(
          'La modificacion fue exitosa',
        )
      } else {
        console.log(formData)
        console.log("Error al actualizar el protecista");
      }
    })

  };


  const onCancelarClick = (e) => {
    e.preventDefault();
    onCancelar();
  };

  // Busca la informacion correspondiente a la tabla sin la fila que se está editando
  const informacionFila = informacionCompleta.filter(item => item.id !== id);

  return (
    <section>
 <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
  <div style={{ display: "flex" }}>
    <label>Nombre:<input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /></label>
    <label>Apellido:<input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} /></label>
    <label>Fecha de Nacimiento:<input type="text" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} /></label>
    <label>Telefono:<input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} /></label>
  </div>
  <div style={{ display: "flex" }}>
    <label>Genero:<input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} /></label>
    <label>Documento:<input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} /></label>
    <label>Matricula:<input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} /></label>
    <label>Calle:<input type="text" value={calle} onChange={(e) => setCalle(e.target.value)} /></label>
    <label>Numero:<input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} /></label>
    <label>Localidad:<input type="text" value={localidad} onChange={(e) => setLocalidad(e.target.value)} /></label>
    <label>Provincia:<input type="text" value={provincia} onChange={(e) => setProvincia(e.target.value)} /></label>
    <label>Especialidad:
      <select name="especialidad" id="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required>
        <option>ESPECIALIDAD_ORTODONCISTA</option>
        <option>ESPECIALIDAD_PERIODONCISTA</option>
        <option>ESPECIALIDAD_ENDODONCISTA</option>
        <option>ESPECIALIDAD_ODONTOPEDIATRIA</option>
        <option>ESPECIALIDAD_CIRUGIA_ORAL</option>
        <option>ESPECIALIDAD_CIRUGIA_MAXILOFACIAL</option>
        <option>ESPECIALIDAD_PROTESISTA</option>
      </select>
    </label>
  </div>
  <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
    <button type="submit">Guardar</button>
    <button className='cancel-change' onClick={onCancelarClick}>Cancelar</button>
  </div>
</form>
      <table>
        <thead>
          <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha Nacimiento</th>
          <th> Genero</th>
          <th>Telefono</th>
          <th>Documento</th>
          <th>Matricula</th>
          <th>Domicilio</th>
          </tr>
        </thead>
        <tbody>
        {informacionFila.map((item) => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.fechaNacimiento}</td>
            <td>{item.genero}</td>
            <td>{item.telefono}</td>
            <td>{item.documento}</td>
            <td>{item.matricula}</td>
            <td>{item.calle} {item.numero}, {item.localidad}, {item.provincia}</td>
            <td>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
  
    </section>
  );
}
export default FormToUpdateDentist