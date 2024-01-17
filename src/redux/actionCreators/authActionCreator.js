import * as types from "../actionsTypes/authActionTypes"
import fire from "../../api/firebase"
import { userLogsOut } from "./fileFolderActionCreator"

const loginUser = (payload) => {
    return {
        type : types.SIGN_IN,
        payload,
    }
}

const logoutUser = (payload) => {
    return {
        type : types.SIGN_OUT,
        
    }
}

const registerUser = (payload) => {
    return{
        type : types.REGISTER_USER,
    payload,    }
}

export const signInUser = (email,password, setSuccess) => (dispatch) => {
    fire.auth().signInWithEmailAndPassword(
        email,
        password
    ).then((user) => {
        dispatch(loginUser({uid: user.user.uid, email : user.user.email , displayName : user.user.displayName}))
        setSuccess(true);
    }).catch((error) => {
        alert("Invalid Credentials")
       }   )
}
export const signUpUser = (name,email,password, setSuccess) => (dispatch) => {
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
        fire
            .auth()
            .currentUser.updateProfile({
            displayName : name,
        })
            .then( () => {
            const currentUser =  fire.auth().currentUser;
            dispatch(loginUser({uid: currentUser.uid, email : currentUser.email, displayName : currentUser.displayName }));
            setSuccess(true);
        })
        .catch((error) =>{
            alert(error)
        })
    })
    .catch((error) => {
        alert(error)
    })
    
    ;
}

export const signOutUser = () => (dispatch) => {
    fire.auth().signOut().then(()=> {
        dispatch(logoutUser())
        userLogsOut("lol");

    });
}

export const checkIsLoggedIn = () => (dispatch) => {
    fire.auth().onAuthStateChanged((user) => {
        if(user){
            dispatch(loginUser({uid: user.uid, email : user.email , displayName : user.displayName}))
        }
       
    })
}