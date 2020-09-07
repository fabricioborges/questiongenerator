import React, { useEffect, useState } from 'react';
import './test-available-view.css';
import api from '../../services/api';

export default function TestAvailable({ history }) {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        async function loadTestAvailable(){
            const response = await api.get('testavailable');

            setTests(response.data);
        }

        loadTestAvailable();
    },[]);

    function handleToRun(id){
        history.push(`/testrun/${id}`)
    }
   
    return (
        <div className="App">
            <div className='test-available-container-view'>
            {tests.length > 0 ?
            (
                <ul>
                    {tests.map(test => (
                        <li key={test._id}>
                            <footer>
                                <strong>{test.title}</strong>
                                <p>Quantidade de questões: {test.questions.length}</p>
                                <button className="run" onClick={() => handleToRun(test._id)}>Executar prova</button>
                            </footer>
                        </li>
                    ))}
                </ul>
            ) : ''}
            </div>
        </div>
    )
}
