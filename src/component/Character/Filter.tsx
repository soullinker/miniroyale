import CharacterFilterService from '../../service/CharacterFilter';
import CharacterNavigationService from '../../service/CharacterNavigation';

import './Filter.scss';

function Filter() {
    const setFilter = (value: string) => {
        CharacterNavigationService.resetPage();
        CharacterFilterService.setFilter(value);
    }

    return <input
        type="text"
        placeholder="filter..."
        className="character-filter"
        onChange={e => setFilter(e.target.value)}
    />;
}

export default Filter;
