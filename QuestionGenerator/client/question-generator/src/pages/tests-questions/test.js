import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from '../../components/menu/menu';
import './test.css';
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MsgSuccess = ({ closeToast }) => (
    <div>
        Prova cadastrada com sucesso!
    </div>
)

const MsgError = ({ closeToast }) => (
    <div>
        Ocorreu um error ao gravar o registro
    </div>
)

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function Test({ history, match }) {
    const classes = useStyles();
    const [title, setTitle] = useState();
    const [isAvailable, setIsAvailable] = useState();
    const [questionId, setQuestionId] = useState([]);
    const [questionsDb, setQuestionDb] = useState([]);

    useEffect(() => {
        if (match.params.id) {
            async function loadTest() {
                const response = await api.get(`tests/${match.params.id}`)
                console.log(response)
                setTitle(response.data.title);
                console.log(response.data.isAvailable);
                setIsAvailable(response.data.isAvailable);
                setQuestionsIds(response.data.questions)
            }
            loadTest();
        }
    }, [])

    useEffect(() => {
        async function loadQuestions() {
            const response = await api.get('questions/');

            setQuestionDb(response.data);
        }

        loadQuestions();
    }, [])


    function setQuestionsIds(questionsIds) {
        const ids = [];
        questionsIds.map(x => (
            ids.push(x._id)
        ));

        setQuestionId(ids);
    }

    const handleChange = (event) => {
        setQuestionId(event.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            var response;
            if (!match.params.id) {
                response = await api.post('/tests', {
                    title,
                    isAvailable,
                    questions: questionId
                });
            } else {
                response = await api.put('/tests', {
                    _id: match.params.id,
                    title,
                    isAvailable,
                    questions: questionId
                });
            }

            const codeResponse = 200;

            if (response.status === codeResponse) {
                toast.success(<MsgSuccess />, { autoClose: 5000 });

                history.push(`/testsview/`)
            } 
        } catch (error) {
            toast.success(<MsgError />, { autoClose: 5000 });
        }
    }

    function handleToIsAvailable(e){
        const available = !isAvailable;

        setIsAvailable(available);     
    }

    return (
        <div className="App">
            <Menu {...history}/>
            <div className="test-container">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Digite o título para a prova"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />

                    <label for="isAvailable">Disponível?</label>
                    <input
                        id="isAvailable"
                        type="checkbox"
                        name="isAvailable"
                        value={isAvailable}                        
                        onClick={e => handleToIsAvailable(e.target.value)}
                        defaultChecked={isAvailable}
                    />
                    {questionsDb.length > 0 ?
                        (<>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-mutiple-name-label"
                                    id="demo-mutiple-name"
                                    multiple
                                    value={questionId}
                                    onChange={handleChange}
                                    input={<Input />}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} disabled={true} value={0}>Selecione as questões</MenuItem>
                                    {questionsDb.map(name => (
                                        <MenuItem key={name._id} value={name._id}>
                                            {name.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                        ) : ''}
                    <button className="test" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}