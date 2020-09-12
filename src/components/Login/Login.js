import React from 'react';
import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState({
        isSignedIn:false,
        name: '',
        email: '',
        password: '',
        photo: '',
    })

    const handleSubmit = (e) => {

    };

    const handleBlur = (e) => {
        let isFormValid = true;
        if(e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if(e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if(isFormValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }
    };
    return (
        <div style={{display:"flex", flexDirection:"column",alignItems: "center"}}>
            <h1> Our own Authentication</h1>
            {/* <p> Name: {user.name}</p>
            <p> Email: {user.email}</p>
            <p> Password: {user.password}</p> */}
            <form onSubmit={handleSubmit}>
                <input type="text" onBlur={handleBlur} name="name" placeholder="Your name"/>
                <br/>
                <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email Adress" required/>
                <br/>
                <input type="password" onBlur={handleBlur} name="password"  placeholder="Your password" required id=""/>
                <br/>
                <input type="submit" onChange={handleSubmit} value="Submit"/>
            </form>
        </div>
    );
};

export default Login;