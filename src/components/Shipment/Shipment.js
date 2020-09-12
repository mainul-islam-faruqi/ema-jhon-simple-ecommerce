import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it   defaultValue="test"
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name "/>
        {errors.name && <span className="error">name is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}placeholder=" Your Email " />
        {errors.email && <span className="error">email is required</span>}

        <input name="adsress" ref={register({ required: true })} placeholder=" Your Address"/>
        {errors.name && <span className="error">address is required</span>}

        <input name="form" ref={register({ required: true })} placeholder=" Your Phone Number " />
        {errors.name && <span className="error">Phone is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;