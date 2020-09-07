import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu/menu';
import './test-view.css';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const MsgSuccess = ({ closeToast }) => (
    <div>
        Registro excluído com sucesso!
    </div>
)

const MsgError = ({ closeToast }) => (
    <div>
        Não foi possível excluir o registro!
    </div>
)

export default function TestsView({ history }) {

    const [tests, setTests] = useState([]);

    useEffect(() => {
        async function loadTests() {
            const response = await api.get('/tests');

            setTests(response.data);
        }

        loadTests();
    }, [])

    function handleToEdit(id) {
        history.push(`/test/${id}`)
    }

    function handleToDelete(test) {
        const options = {
            title: 'Excluir registro',
            message: 'Deseja excluir a prova selecionada?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => removeTest(test)
                },
                {
                    label: 'Não',
                    onClick: () => onclose
                }
            ],
            childrenElement: () => <div />,
            closeOnEscape: true,
            closeOnClickOutside: true,
            onClickOutside: () => { },
            onKeypressEscape: () => { }
        };

        confirmAlert(options);
    }

    async function removeTest(test) {
        try {
            const id = test._id;
            await api.delete(`tests`, { data: { id } }, {
                headers: {
                    contenttype: 'application/json'
                }
            });

            const index = tests.indexOf(test);
            var testsRefresh = [];

            if (index > -1) {
                delete tests[index];

                tests.map(x => testsRefresh.push(x));
            }

            setTests(testsRefresh);
            toast.success(<MsgSuccess />);

        }
        catch (err) {
            toast.error(<MsgError />);
        }
    }

    function handleToNew() {
        history.push(`/test/`)
    }

    return (
        <div className="App">
            <Menu {...history}/>
            <ToastContainer />
            <div className='test-container-view'>
                <div>
                    <button className="new" onClick={() => handleToNew()}>Adicionar</button>
                </div>
                {tests.length > 0 ? (
                    <ul>
                        {tests.map(test => (
                            <li key={test._id}>
                                <footer>
                                    <strong>{test.title}</strong>
                                    <p>Quantidade de questões: {test.questions.length}</p>
                                    <p>Disponibilidade da prova: {test.isAvailable === true ? 'Disponível' : 'Indisponível'}</p>
                                    <button className="edit" onClick={() => handleToEdit(test._id)}>Editar</button>
                                    <button className="delete" onClick={() => handleToDelete(test)}>Excluir</button>
                                </footer>
                            </li>
                        ))}
                    </ul>
                ) : 'Não há provas cadastradas :('}
            </div>

        </div>
    )
};