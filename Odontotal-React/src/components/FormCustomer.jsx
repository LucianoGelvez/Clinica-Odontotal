import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/componentStyles/FormCustomer.css'

const FormCustomer = () => {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fqzw13a', 'template_cko387n', form.current, 'aAWa-w-L3NxY3IdOp')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div className='form-customer-container'>
         <form ref={form} onSubmit={sendEmail}>
            
            <label>Nombre</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Mensaje</label>
            <textarea name="message" />
            <input type="submit" value="Enviar" className='button-submit'/>
        </form>
    </div>
  )
}

export default FormCustomer