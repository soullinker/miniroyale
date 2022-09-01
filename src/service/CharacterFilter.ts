import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { CharacterList } from './model/Character';
import CharacterService from './Character';

class CharacterFilter {
    filter = new BehaviorSubject('');

    handler = {
        applyFilter: this.applyFilter.bind(this),
    }

    list = CharacterService.list
        .pipe(combineLatestWith(this.filter))
        .pipe(map(this.handler.applyFilter))
    ;

    applyFilter([characterList, filter]: [CharacterList, string]) {
        const name = filter.toLowerCase();

        return characterList.filter(character => character.name.toLowerCase().includes(name));
    }

    setFilter(filter: string) {
        this.filter.next(filter);
    }
}

const CharacterFilterService = new CharacterFilter();

export default CharacterFilterService;
