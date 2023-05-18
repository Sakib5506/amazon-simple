import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    console.log('Google Sign in clicked');
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
        .then((result) => {

            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
        })

}

export const handleFbSignIn = () => {
    console.log('Fb Sign in clicked');
    const fbProvider = new FacebookAuthProvider()
    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            user.success = true;
            return user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });

}


export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
        const signedInUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
            error: '',
            success: false
        }
        return signedInUser;

    }).catch((err) => {
        console.log(err);
    })
}


export const createUserWithEmailAndPasswords = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const newUserInfo = userCredential.user;
            console.log(newUserInfo, 'login managerrrrr');
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const newUserInfo = {};
            console.log(newUserInfo);
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}
export const signInWithEmailAndPasswords = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            const newUserInfo = userCredential.user;

            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const newUserInfo = {};
            console.log(newUserInfo);
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        // Profile updated!
        console.log('Updated');
        // ...
    }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
    });

}