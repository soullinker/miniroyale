import { BehaviorSubject, map } from 'rxjs';
import CharacterFilterService from './CharacterFilter';
import { CharacterList } from './model/Character';

class CharacterNavigation {
    static PER_PAGE_COUNT = 5;

    page = new BehaviorSubject(0);

    pageCount = CharacterFilterService.list.pipe(map(CharacterNavigation.countPage));

    static countPage(characterList: CharacterList) {
        return Math.floor((characterList.length - 1) / CharacterNavigation.PER_PAGE_COUNT) + 1;
    }

    setPage(index: number) {
        this.page.next(index);
    }

    resetPage() {
        const page = this.page.getValue();
        if (page !== 0) {
            this.setPage(0);
        }
    }
}

const CharacterNavigationService = new CharacterNavigation();

export { CharacterNavigation }
export default CharacterNavigationService;
