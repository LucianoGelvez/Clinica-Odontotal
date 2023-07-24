import React, { useState } from 'react'
import baseUrl from '../../../components/utils/baseUrl.json'

const FormToUpdateProsthetist =({ data, onGuardar, onCancelar, informacionCompleta  }) => {
  const [id, setId] = useState(data.id);
  const [nombre, setNombre] = useState(data.nombre);
  const [apellido, setApellido] = useState(data.apellido);
  const [especialidadProtecista, setEspecialidad] = useState(data.especialidadProtecista);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...data, id, nombre, apellido, especialidadProtecista });

    const formData = {
      id: id,
      nombre: nombre,
      apellido: apellido,
      especialidadProtecista: especialidadProtecista,
    };

    const url = baseUrl.url + `/protecistas`;
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
  };

  const onCancelarClick = (e) => {
    e.preventDefault();
    onCancelar();
  };

  // Busca la informacion correspondiente a la tabla sin la fila que se está editando
  const informacionFila = informacionCompleta.filter(item => item.id !== id);

  return (
    <section>
    <form onSubmit={handleSubmit} style={{display: "flex",justifyContent: "center"}}>
      <label>Nombre:<input type="text"value={nombre}onChange={(e) => setNombre(e.target.value)}/></label>

      <label>
        Apellido:
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </label>

      <label>
        Especialidad:
        <input
          type="text"
          value={especialidadProtecista}
          onChange={(e) => setEspecialidad(e.target.value)}
        />
      </label>

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
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
        {informacionFila.map((item) => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.especialidadProtecista}</td>
            <td>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
  
    </section>
  );
}
export default FormToUpdateProsthetist