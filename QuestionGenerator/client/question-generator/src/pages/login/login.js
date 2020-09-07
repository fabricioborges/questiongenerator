import React, { useState } from 'react';
import './login.css';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MsgError = ({ closeToast }) => (
    <div>
        Login e senha incorretos!
    </div>
)

export default function Login({ history }) {
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    async function handleToLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('/login', { name, password });

            localStorage.setItem('IsAdmin', JSON.parse(response.data[0].isAdmin));

            history.push('/testsview/')

        } catch (error) {
            toast.error(<MsgError />, { autoClose: 3000 });
        }
    }

    function handleToUser() {
        history.push('/user/');
    }

    return (
        <div className="login-container">
            <ToastContainer />
            <form onSubmit={handleToLogin}>
                <input name="user"
                    placeholder="Digite seu usuário"
                    onChange={e => setName(e.target.value)} />
                <input
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={e => setPassword(e.target.value)} />
                <button className="login" type="submit">Logar</button>
                <button className="simulate" onClick={handleToUser}>Simular prova</button>
            </form>
        </div>)
}
