import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = ()=>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}


 export const handleGoogleSignIn  = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
      var token = result.credential.accessToken;
      var {displayName,email,photoURL} = result.user;

      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo:photoURL
      };

      return signedInUser;
    })
    .catch(err =>{
        console.log(err);
        console.log(err.message);
    })
  }

  export const handleFbSignIn = ()=>{
      const fbProvider = new firebase.auth.FacebookAuthProvider();
      return firebase.auth().signInWithPopup(fbProvider)
      .then((result)=>{
          const token = result.credential.accessToken;
          const user = result.user;
          return user;
      })
      .catch((err)=>{
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(errorCode);
            console.log(errorMessage);
      });
  }


  export const handleSignOut = () => {
    return firebase.auth().signOut()
     .then((result) => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
      }
      return signedOutUser;
     })
     .catch((error) => {
       console.log(error)
     })
     
  }



// export const createUserWithEmailAndPassword = (){
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res =>{
//       const newUserInfo = {...user};
//       newUserInfo.error = "";
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       updateUserInfo(user.name);
//     })
//     .catch(error=> {
//         // Handle Errors here.
//         const newUserInfo = {...user}
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
        
//       });
// }


// export const signInWithEmailAndPassword = ()=>{
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//           .then(res=>{
//             const newUserInfo = {...user};
//               newUserInfo.error = "";
//               newUserInfo.success = true;
//               setUser(newUserInfo);
//               setLoggedInUser(newUserInfo);
//               history.replace(from);
//               console.log(res.user)
//           })
//           .catch(function(error) {
//             // Handle Errors here.
//             const newUserInfo = {...user}
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//           });
// }


// const updateUserInfo = (name)=>{
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name,
//     }).then(function() {
//       // Updated successful.
//     }).catch(function(error) {
//       console.log(error);
//     });
//   }




