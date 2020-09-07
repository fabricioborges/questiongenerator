import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './test-report.css';
import Menu from '../../components/menu/menu';

export default function TestReport({ history }) {
    const [tests, setTests] = useState([]);


    useEffect(() => {
        async function loadTests() {
            const response = await api.get(`testrun`);
            console.log(response.data)
            setTests(response.data);

        }

        loadTests();
    }, [])

    return (
        <div className="App">
            <Menu/>
            <div className='test-report-container-view'>
                {tests.length > 0 ? (
                    <ul>
                        {tests.map(x => (
                            <li>
                                <footer>
                                    <strong>{x.test.title}</strong>
                                    <p>Usuário: {x.user.name}</p>
                                    <p>Quantidade de acertos: {x.count}</p>
                                </footer>
                            </li>
                        ))}
                    </ul>
                ) : ''}
            </div>
        </div>
    )
}