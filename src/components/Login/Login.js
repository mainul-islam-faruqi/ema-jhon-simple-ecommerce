import React from 'react';
import { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setnewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn:false,
        name: '',
        email: '',
        password: '',
        photo: '',
    })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn  = () => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var token = result.credential.accessToken;
      var {displayName,email,photoURL} = result.user;

      const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo:photoURL
      }

      setUser(signInUser);
    })

  }

  const handleSignOut = () => {
    firebase.auth().signOut()
     .then((result) => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
      }
      setUser(signedOutUser);
     })
     .catch((error) => {
       console.log(error)
     })
     
  }

    const handleSubmit = (e) => {
        if( newUser && user.name && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res =>{
              const newUserInfo = {...user};
              newUserInfo.error = "";
              newUserInfo.success = true;
              setUser(newUserInfo);
              updateUserInfo(user.name);
            })
            .catch(error=> {
                // Handle Errors here.
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
                
              });
        }
        if(!newUser && user.email && user.password){
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res=>{
            const newUserInfo = {...user};
              newUserInfo.error = "";
              newUserInfo.success = true;
              setUser(newUserInfo);
              console.log(res.user)
          })
          .catch(function(error) {
            // Handle Errors here.
            const newUserInfo = {...user}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
        }
        e.preventDefault();
    };

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

    const updateUserInfo = (name)=>{
      const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
      }).then(function() {
        // Updated successful.
      }).catch(function(error) {
        console.log(error);
      });
    }
    return (
        <div style={{textAlign: 'center'}}>
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