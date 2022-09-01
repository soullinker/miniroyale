import { NavLink } from 'react-router-dom';
import RouteConfig from '../../app/RouteConfig';

import './Main.scss';

function Main() {
    return <div className="main">
        <pre>{'Test task for React engineer (admin panel & tools)\n' +
        '\n' +
        'Description:\n' +
        'Using a third-party API as a data source (example: Star Wars API https://swapi.dev/), implement a SPA React application consisting of two pages.\n' +
        'On the main page, display a list or cards of characters, add the possibility of character search and pagination to the list.\n' +
        'Implement a page with detailed information on the selected character.\n' +
        '\n' +
        'Pros:\n' +
        '+ Using TypeScript\n' +
        '+ Neat layout\n' +
        '+ Using UI framework (Material, Ant, Bootstrap, etc.)\n' +
        '\n' +
        'As an extra challenge:\n' +
        '+ To work with data, use storage (Redux, etc.)\n' +
        '+ Edit character information locally, without sending to server\''}</pre>
        <NavLink className="main__list" to={RouteConfig.characterList}>Character List</NavLink>
    </div>;
}

export default Main;
