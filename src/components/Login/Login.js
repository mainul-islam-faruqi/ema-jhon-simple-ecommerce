import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';


const Login = () => {
    const [newUser, setnewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn:false,
        name: '',
        email: '',
        password: '',
        photo: '',
    })

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res,true);
    })
  }

  const fbSignIn = ()=> {
    handleFbSignIn()
    .then(res => {
      handleResponse(res,true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res,false);

    })
  }

  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
  }

    const handleSubmit = (e) => {
        if( newUser && user.name && user.password){
          createUserWithEmailAndPassword(user.name, user.email, user.password)
          .then(res => {
            handleResponse(res,true);
          })
        }
        if(!newUser && user.email && user.password){
          signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            handleResponse(res,true);
          })
    }
    e.preventDefault();
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if(e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }
    };

    return (
        <div style={{textAlign: 'center'}}>
              {
                user.isSignedIn?<button onClick={ signOut}> signUp  </button> :
                <button onClick={ googleSignIn}> Login  </button>
              }
              <br/>
              <button onChange={fbSignIn} > Sign In using Facebook </button>
              {
                user.isSignedIn && <div>
                  <h3> Name: user.name</h3>
                  <h5> Email: user.email</h5>
                  <img src={user.photo} alt=" There is no img "/>
                </div>
              }
            
            <h1> Our own Authentication</h1>
            {/* <p> Name: {user.name}</p>
            <p> Email: {user.email}</p>
            <p> Password: {user.password}</p> */}
            <input type="checkbox" name="newUser" onChange={()=>setnewUser(!newUser)} id=""/><label htmlFor="newUser"> New User Sign Up</label>
           
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your name"/>}
                <br/>
                <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email Adress" required/>
                <br/>
                <input type="password" onBlur={handleBlur} name="password"  placeholder="Your password" required id=""/>
                <br/>
                <input type="submit" onChange={handleSubmit} value={newUser?'Sign Up':'Sign In'} />
            </form>
            <p style={{color: 'red'}}> {user.error} </p>
            {user.success && <p style={{color: 'green'}}> User {newUser?'created': "logged In"} successfully </p>}
        </div>
    );
};

export default Login;