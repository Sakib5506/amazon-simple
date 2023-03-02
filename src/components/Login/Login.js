import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPasswords, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPasswords } from './loginManager';


function Login() {
    const [newUsers, setNewUsers] = useState(false);
    const [users, setUsers] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();

    // let { from } = location.state || { from: { to: '/' } };
    const from = location.state?.from || "/";

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleChange = (e) => {
        let isFormValid = true;

        if (e.target.name === 'email') {
            isFormValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUser = { ...users };
            newUser[e.target.name] = e.target.value;
            setUsers(newUser);
        }
    }

    const handleSubmit = (e) => {
        console.log(users.email, users.password);

        if (newUsers && users.email && users.password) {
            createUserWithEmailAndPasswords(users.name, users.email, users.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUsers && users.email && users.password) {
            signInWithEmailAndPasswords(users.email, users.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    const handleResponse = (res, redirect) => {
        setUsers(res);
        setLoggedInUser(res);
        if (redirect) {
            navigate(from, { replace: true });
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {users.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
                <button onClick={googleSignIn}>Sign In</button>
            }
            <br />
            <button onClick={fbSignIn}>Sign in using Facebook</button>

            {
                users.isSignedIn && <div>
                    <p>Welcome, {users.name}!</p>
                    <p>Your email: {users.email}</p>
                    <img src={users.photo} alt="" />
                </div>
            }


            <h1>Our own Authentication</h1>

            <input type="checkbox" onChange={() => setNewUsers(!newUsers)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>


            <form onSubmit={handleSubmit}>

                {newUsers && <input onBlur={handleChange} type="text" name="name" id="" placeholder='Name' />
                }
                <br />

                <input onChange={handleChange} type="text" name="email" placeholder='Email' required /> <br />
                <input onChange={handleChange} type="password" name="password" placeholder='Password' /><br />
                <input type="submit" value={newUsers ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{users.error}</p>

            {users.success && <p style={{ color: 'green' }}>
                User {newUsers ? 'created' : 'Logged In'} successfully </p>}

        </div>
    );
}

export default Login;
