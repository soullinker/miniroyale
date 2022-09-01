import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import CharacterModel, { CharacterList, CharacterPageResponse, CharacterRecord } from './model/Character';
import CharacterAdapter from './adapter/Character';

class Character {
    static API_URL = 'https://swapi.dev/api/';

    list = new BehaviorSubject<CharacterList>([]);

    map = new Map<number, CharacterModel>();

    handler = {
        fetchPage: this.fetchPage.bind(this),
        fetchCharacter: this.fetchCharacter.bind(this),
        updateMap: this.updateMap.bind(this),
    }

    constructor() {
        // @TODO: never ending subscription
        this.list.subscribe(this.handler.updateMap);
    }

    updateMap(characterList: CharacterList) {
        characterList.forEach(character => this.map.set(character.id, character));
    }

    sync() {
        axios.get<CharacterPageResponse>(Character.API_URL + 'people/')
            .then(response => response.data)
            .then(this.handler.fetchPage)
        ;
    }

    fetchPage(response: CharacterPageResponse) {
        const list = response.results.map(CharacterAdapter.fromRecord);

        this.list.next(list);
    }

    fetchCharacter(response: CharacterRecord): CharacterModel {
        return CharacterAdapter.fromRecord(response);
    }

    getCharacter(id: number): CharacterModel | null {
        return this.map.get(id) || null;
    }

    loadCharacter(id: number) {
        return axios.get<CharacterRecord>(Character.API_URL + 'people/' + id.toString() + '/')
            .then(response => response.data)
            .then(this.handler.fetchCharacter)
        ;
    }
}

const CharacterService = new Character();

export default CharacterService;
