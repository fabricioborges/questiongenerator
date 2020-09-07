import React, { useState, useEffect } from 'react';
import './test.css';
import api from '../../services/api'; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

var selecteds = [];

export default function TestRun({ history, match }) {
    const [test, setTest] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedId, setSelectedId] = useState();


    useEffect(() => {
        async function loadTests() {
            const response = await api.get(`tests/${match.params.id}`);

            setTest(response.data);
            setQuestions(response.data.questions);
        }

        loadTests();
    }, [])

    function handleSelectedAlternative(e) {
        const index = selecteds.find(x => x.questionId === e.value);

        const result = selecteds.indexOf(index);

        delete selecteds[result];
        selecteds = selecteds.flat();

        selecteds.push({ questionId: e.value, alternativeId: e.id })
        setSelectedId(e.id);
    }

    function handleSubmit(e) {
        e.preventDefault();

        var countCorrects = 0;

        for (let i = 0; i < selecteds.length; i++) {
            const question = questions.find(x => x._id === selecteds[i].questionId);

            const alternative = question.alternatives.find(x => x._id === selecteds[i].alternativeId);

            if (alternative.isCorrect === true) countCorrects++;            
        }

        request(countCorrects);

        handleConfirm(countCorrects, questions.length);

        selecteds = [];
    }

    function handleConfirm(countCorrects, quantityQuestions) {
        const options = {
            title: 'Parabéns',
            message: `você acertou ${countCorrects} de ${quantityQuestions} questões`,
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => handleToTests()
                },                
            ],
            childrenElement: () => <div />,
            closeOnEscape: true,
            closeOnClickOutside: true,
            onClickOutside: () => { },
            onKeypressEscape: () => { }
        };

        confirmAlert(options);
    }

    async function request(countCorrects){
        const userId = localStorage.getItem('userId');

        console.log(userId)
        await api.post('testavailable', { testId: test._id, selecteds, userId, count: countCorrects});
    }

    function handleToTests(){
        history.push('/testavailable/')
    }

    return (
        <div className="App">
            <div className='test-run-container'>
                <form onSubmit={handleSubmit}>
                    <strong>{test.title}</strong>
                    <div>
                        {questions.length > 0 ? (
                            <ul>
                                {questions.map(question => (
                                    <>
                                        <strong>{question.title}</strong>
                                        {question.alternatives.map(x => (
                                            <li key={x._id}>
                                                <input
                                                    id={x._id}
                                                    value={question._id}
                                                    type="radio"
                                                    checked={selecteds.some(y => y.alternativeId === x._id)}
                                                    onClick={e => handleSelectedAlternative(e.target)} />
                                                <label for={x._id}>{x.description}</label>
                                            </li>
                                        ))}
                                    </>
                                ))}
                            </ul>
                        ) : <strong>{test.length}</strong>}
                    </div>
                    <button className="test-run" type="submit">Finalizar</button>
                </form>
            </div>
        </div>
    )
}