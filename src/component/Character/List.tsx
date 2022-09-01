import RxComponent from '../RxComponent/RxComponent';
import { CharacterList } from '../../service/model/Character';
import CharacterService from '../../service/Character';
import { generatePath, NavLink } from 'react-router-dom';
import RouteConfig from '../../app/RouteConfig';
import CharacterListService from '../../service/CharacterList';

import './List.scss';

type ListProps = {};
type ListState = {
    list: CharacterList;
    loading: boolean;
}

class List extends RxComponent<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);

        this.state = {
            list: [],
            loading: true,
        }
    }

    handler = {
        setList: this.setList.bind(this),
    }

    setList(list: CharacterList) {
        this.setState({ list, loading: false });
    }

    componentDidMount() {
        this.subscribe(CharacterListService.list, { next: this.handler.setList });
        CharacterService.sync();
    }

    render() {
        const { loading, list } = this.state;

        const content = list.length ? list.map(character =>
            <NavLink
                to={generatePath(RouteConfig.character, { id: character.id.toString() })}
                key={character.id}
                className="character-list__link"
            >
                {character.name}
            </NavLink>) : <div>nothing found</div>;

        return <div className="character-list">
            {loading ? <div>loading...</div> : content}
        </div>
    }
}

export default List;
