import React, { useState } from 'react';
import './user.css';
import api from '../../services/api';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MsgSuccess = ({ closeToast }) => (
    <div>
        Usuário cadastrado com sucesso!
    </div>
)

const MsgError = ({ closeToast }) => (
    <div>
        Ocorreu um error ao gravar o registro
    </div>
)

export default function User({ history }) {
    const [userName, setUserName] = useState();

    function handleToLogin() {
        history.push('/');
    }

    async function handleCreateUser(e) {
        e.preventDefault();

        try {
            const response = await api.post('user', {
                name: userName
            })

            localStorage.setItem('userId', response.data._id);

            toast.success(<MsgSuccess />, { autoClose: 5000 });

            history.push(`/testavailable/`)

        } catch (error) {
            toast.success(<MsgError />, { autoClose: 5000 });
        }

    }

    return (
        <div className="user-container">
           <ToastContainer/>
            <form onSubmit={handleCreateUser}>
                <input
                    name="username"
                    placeholder="Digite seu nome"
                    value={userName}
                    onChange={e => setUserName(e.target.value)} />
                <button className="create-user" type="submit">Criar</button>
                <button className="come-back" onClick={handleToLogin}>Voltar ao login</button>
            </form>
        </div>
    )
}
