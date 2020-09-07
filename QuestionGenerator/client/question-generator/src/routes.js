import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/login';
import User from './pages/users/user';
import TestsView from './pages/tests-questions/test-view';
import Test from './pages/tests-questions/test';
import QuestionView from './pages/questions/question-view';
import Question from './pages/questions/question';
import TestAvailable from './pages/tests-available/test-available-view';
import TestRun from './pages/tests-available/test';
import TestReport from './pages/test-report/test-report';

export default function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/user/" exact component={User}/>
            <Route path="/testsview/" exact component={TestsView}/>
            <Route path='/test/' exact component={Test} /> 
            <Route path='/test/:id' exact component={Test} /> 
            <Route path="/questionsview/" exact component={QuestionView}/>
            <Route path="/questions/" exact component={Question} />
            <Route path="/questions/:id" exact component={Question} />
            <Route path='/testavailable/' exact component={TestAvailable} />
            <Route path="/testrun/:id" exact component={TestRun} />
            <Route path='/testreport/' exact component={TestReport}/>
        </BrowserRouter>
    );
}
