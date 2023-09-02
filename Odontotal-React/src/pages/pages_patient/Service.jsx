import React, { useContext } from "react";
import "../../styles/pagesStyles/ServiceStyle.css";
import { ContextGlobal } from "../../components/utils/global.context";

const Service = () => {
  const { arrayService } = useContext(ContextGlobal);
  console.log(arrayService);
  console.log(arrayService);
  console.log(arrayService);

  return (
    <div className="service">
      {console.log(arrayService)}
      <h1>SERVICIOS</h1>
      <div class="grid-container">
        {arrayService.map((item, index) => (
          <div key={index}>
            <img src={item.imgSrc} alt={item.alt} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
