import React, { useContext } from 'react'
import '../../styles/pagesStyles/ServiceStyle.css'
import { ContextGlobal } from '../../components/utils/global.context'
import { Link } from 'react-router-dom';

const Service = () => {
  const { arrayService }  = useContext(ContextGlobal);
  console.log(arrayService)


  return ( 
      <div className='service'>
        {console.log(arrayService)}
        <h1>Servicios</h1>
        <div class="grid-container">
          {arrayService.map((item, id) =>(
            <div id={id} key={id}> 
            <img src={item.imgSrc} alt={item.alt}/>
            <h3>{item.title}</h3>
            <p >{item.description}</p>
           </div>
          ))}

          </div>
    </div>
  )
}

export default Service