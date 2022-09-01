import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RouteConfig from './RouteConfig';

import CharacterRoute from '../component/Character/CharacterRoute';
import Main from '../component/Main/Main';
import Page from '../component/Character/Page';

import '../style/global.scss';
import './App.scss';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path={RouteConfig.index} element={<Main />} />
                    <Route path={RouteConfig.characterList} element={<Page />} />
                    <Route path={RouteConfig.character} element={<CharacterRoute />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
