import CharacterFilterService from './CharacterFilter';
import { combineLatestWith, map } from 'rxjs';
import CharacterNavigationService, { CharacterNavigation } from './CharacterNavigation';
import { CharacterList as CharacterModelList } from './model/Character';

class CharacterList {
    list = CharacterFilterService.list
        .pipe(combineLatestWith(CharacterNavigationService.page))
        .pipe(map(CharacterList.getVisible))
    ;

    public static getVisible([characterList, pageIndex]: [CharacterModelList, number]): CharacterModelList {
        const start = pageIndex * CharacterNavigation.PER_PAGE_COUNT;
        const end = start + CharacterNavigation.PER_PAGE_COUNT;

        return characterList.slice(start, end);
    }
}

const CharacterListService = new CharacterList();

export default CharacterListService;
