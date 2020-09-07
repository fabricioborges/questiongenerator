import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu/menu';
import './question-view.css';
import api from '../../services/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


export default function QuestionView({ history }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function loadQuestions() {
            const response = await api.get('/questions');
          
            setQuestions(response.data);
        }

        loadQuestions();
    }, [])

    function handleToEdit(id) {
        history.push(`/questions/${id}`)
    }

    function handleToDelete(question) {
        const options = {
            title: 'Excluir registro',
            message: 'Deseja excluir a questão selecionada?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => removeQuestion(question)
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

    async function removeQuestion(question) {
        try {            
            const id = question._id;
            await api.delete(`questions`, { data: { id } }, {
                headers: {
                    contenttype: 'application/json'
                }
            });

            const index = questions.indexOf(question);
            var questionsRefresh = [];

            if (index > -1) {
                delete questions[index];

                questions.map(x => questionsRefresh.push(x));
            }

            setQuestions(questionsRefresh);
            toast.success(<MsgSuccess />);

        }
        catch (err) {
            toast.error(<MsgError />);
        }
    }

    function handleToNew() {
        history.push(`/questions/`)
    }

    return (
        <div className="App">
            <Menu {...history}/>
            <ToastContainer />
            <div className="question-container-view">
                <div>
                    <button className="new" onClick={() => handleToNew()}>Adicionar</button>
                </div>
                {questions.length > 0 ?
                    (
                        <ul className="question-ul">
                            {questions.map(question => (
                                <li key={question._id}>
                                    <footer>
                                        <strong>{question.title}</strong>
                                        <ul className="alternative-ul">
                                            {question.alternatives.map(alternative => (
                                                <li>
                                                    <p>{alternative.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="edit" onClick={() => handleToEdit(question._id)}>Editar</button>
                                        <button className="delete" onClick={() => handleToDelete(question)}>Excluir</button>
                                    </footer>
                                </li>
                            ))}
                        </ul>
                    ) : ''}
            </div>

        </div>
    );
}