import React from 'react';
import { fallDown as Menu } from 'react-burger-menu';
import logout from '../../utils/logout';

export default props => {
    function handleLogout() {
        logout(props);
    }

    return(
        
        <Menu>
            <a className="menu-item" href="/testsview/">
                Provas
            </a>

            <a className="menu-item" href="/questionsview/" hidden={false}>
                Questões
            </a>

            <a className="menu-item" href="/testreport/">
                Provas Realizadas
            </a>

            <a className="menu-item" onClick={handleLogout}>
                Sair
            </a>
        </Menu>
    )
}