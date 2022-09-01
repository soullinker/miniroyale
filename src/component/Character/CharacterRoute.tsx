import { useParams } from 'react-router-dom';
import Character from './Character';

function CharacterRoute() {
    const params = useParams<"id">();

    return <Character id={parseInt(params.id || '0')} />;
}

export default CharacterRoute;
