import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { register, error, isAuthenticated, clearErrors } = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = e =>
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    const onSubmit = e => {
        e.preventDefault();
        if (checkForm()) {
            register(user);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            setAlert(
                'Registered successfully, redirecting you...',
                'success',
                3000
            );
            setTimeout(() => props.history.push('/'), 3000);
        }

        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, props.history, isAuthenticated]);

    const checkForm = () => {
        let isAllowed = true;
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields.', 'danger');
            isAllowed = false;
        } else if (password !== confirmPassword) {
            setAlert('Passwords do no match.', 'danger');
            isAllowed = false;
        } else if (password.length < 5 || password.length > 8) {
            setAlert('Password must contain 5-8 characters.', 'danger');
            isAllowed = false;
        }
        return isAllowed;
    };
    return (
        <div className='form-container'>
            <h1>
                Account<span className='text-primary'> Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        name='email'
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='text'
                        name='password'
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='text'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={onChange}
                    />
                </div>
                <button className='btn btn-primary btn-block' type='submit'>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
