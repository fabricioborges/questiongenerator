import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu/menu';
import './question.css';
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MsgSuccess = ({ closeToast }) => (
    <div>
        Questão cadastrada com sucesso!
    </div>
)

const MsgError = ({ closeToast }) => (
    <div>
        Ocorreu um error ao gravar o registro
    </div>
)

export default function Question({ history, match }) {
    const [title, setTitle] = useState();
    const [fisrtAlternative, setFisrtAlternative] = useState();
    const [secondAlternative, setSecondAlternative] = useState();
    const [thirdAlternative, setThirdAlternative] = useState();
    const [fourthAlterative, setFourthAlterative] = useState();
    const [isCorrectFisrt, setIsCorrectFisrt] = useState();
    const [isCorrectSecond, setIsCorrectSecond] = useState();
    const [isCorrectThird, setIsCorrectThird] = useState();
    const [isCorrectFourth, setIsCorrectFourth] = useState();
    const [alternatives, setAlternatives] = useState([]);

    useEffect(() => {
        if (match.params.id) {


            async function loadQuestions() {
                const response = await api.get(`questions/${match.params.id}`)

                setTitle(response.data.title);
                setAlternatives(response.data.alternatives);
                setFisrtAlternative(response.data.alternatives[0].description);
                setIsCorrectFisrt(response.data.alternatives[0].isCorrect);
                setSecondAlternative(response.data.alternatives[1].description);
                setIsCorrectSecond(response.data.alternatives[1].isCorrect);
                setThirdAlternative(response.data.alternatives[2].description);
                setIsCorrectThird(response.data.alternatives[2].isCorrect);
                setFourthAlterative(response.data.alternatives[3].description);
                setIsCorrectFourth(response.data.alternatives[3].isCorrect);
            }

            loadQuestions();
        }
    }, [])

    function handleCorrect(e) {
        console.log(e.id)
        switch (e.id) {
            case '1':
                setIsCorrectFisrt(true);
                setIsCorrectSecond(false);
                setIsCorrectThird(false);
                setIsCorrectFourth(false);
                break;
            case '2':
                setIsCorrectFisrt(false);
                setIsCorrectSecond(true);
                setIsCorrectThird(false);
                setIsCorrectFourth(false);
                break;
            case '3':
                setIsCorrectFisrt(false);
                setIsCorrectSecond(false);
                setIsCorrectThird(true);
                setIsCorrectFourth(false);
                break;
            case '4':
                setIsCorrectFisrt(false);
                setIsCorrectSecond(false);
                setIsCorrectThird(false);
                setIsCorrectFourth(true);
                break;
            default:
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            var response;
            console.log(isCorrectFisrt);
            if (!match.params.id) {

                response = await api.post('questions', {
                    title,
                    alternatives: [{
                        description: fisrtAlternative,
                        isCorrect: isCorrectFisrt,
                    },
                    {
                        description: secondAlternative,
                        isCorrect: isCorrectSecond,
                    },
                    {
                        description: thirdAlternative,
                        isCorrect: isCorrectThird,
                    },
                    {
                        description: fourthAlterative,
                        isCorrect: isCorrectFourth,
                    }]
                });
            } else {
                response = await api.put('questions', {
                    _id: match.params.id,
                    title,
                    alternatives: [{
                        _id: alternatives[0]._id,
                        description: fisrtAlternative,
                        isCorrect: isCorrectFisrt,
                    },
                    {
                        _id: alternatives[1]._id,
                        description: secondAlternative,
                        isCorrect: isCorrectSecond,
                    },
                    {
                        _id: alternatives[2]._id,
                        description: thirdAlternative,
                        isCorrect: isCorrectThird,
                    },
                    {
                        _id: alternatives[3]._id,
                        description: fourthAlterative,
                        isCorrect: isCorrectFourth
                    }]
                });
            }

            const codeResponse = 200;

            if (response.status === codeResponse) {
                toast.success(<MsgSuccess />, { autoClose: 5000 });

                history.push(`/questionsview/`)
            }
        } catch (error) {
            toast.success(<MsgError />, { autoClose: 5000 });
        }
    }

    return (
        <div className="App">
            <Menu {...history}/>
            <div className="question-container">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Digite o título da questão"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />

                    <div className="question-container-alternative">

                        <input
                            placeholder="Digite a primeira alternativa"
                            name="first-altenative"
                            value={fisrtAlternative}
                            onChange={e => setFisrtAlternative(e.target.value)} />
                        <input
                            type="radio"
                            id={1}
                            name="first-altenative"
                            value={isCorrectFisrt}
                            checked={isCorrectFisrt}
                            onClick={e => handleCorrect(e.target)} />

                        <input
                            placeholder="Digite a segunda alternativa"
                            name="second-alternative"
                            value={secondAlternative}
                            onChange={e => setSecondAlternative(e.target.value)} />
                        <input
                            type="radio"
                            id={2}
                            name="second-alternative"
                            value={isCorrectSecond}
                            checked={isCorrectSecond}
                            onClick={e => handleCorrect(e.target)} />

                        <input
                            placeholder="Digite a terceira alternativa"
                            name="third-alternative"
                            value={thirdAlternative}
                            onChange={e => setThirdAlternative(e.target.value)} />
                        <input
                            type="radio"
                            id={3}
                            name="third-alternative"
                            value={isCorrectThird}
                            checked={isCorrectThird}
                            onClick={e => handleCorrect(e.target)} />

                        <input
                            placeholder="Digite a terceira alternativa"
                            name="fourth-alternative"
                            value={fourthAlterative}
                            onChange={e => setFourthAlterative(e.target.value)} />
                        <input
                            type="radio"
                            id={4}
                            name="fourth-alternative"
                            value={isCorrectFourth}
                            checked={isCorrectFourth}
                            onClick={e => handleCorrect(e.target)} />

                    </div>
                    <button className="question" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}