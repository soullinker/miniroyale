import { StarshipList } from './Starship';
import { VehicleList } from './Vehicle';
import { FilmList } from './Film';
import HomeWorld, { unknownHomeWorld } from './HomeWorld';
import DateTime from './DateTime';

type CharacterRecord = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

type CharacterRecordList = CharacterRecord[];

type CharacterPageResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: CharacterRecordList;
}

class CharacterStructure {
    id: number | null = null;

    name = 'Unknown';

    height = 180.0;

    mass = 100.0;

    hairColor = 'blond';

    skinColor = 'fair';

    eyeColor = 'blue';

    birthYear = '19BBY';

    gender = 'male';

    homeWorld: HomeWorld = unknownHomeWorld;

    filmList: FilmList = [];

    vehicleList: VehicleList = [];

    starshipList: StarshipList = [];

    created: DateTime = new DateTime(new Date());

    edited: DateTime = new DateTime(new Date());

    constructor(data: CharacterStructure) {
        Object.assign(this, data);
    }
}

let characterId = -1;

class Character extends CharacterStructure {
    id: number;

    constructor(data: CharacterStructure) {
        super(data);

        this.id = data.id ?? characterId--;
    }
}

type CharacterList = Character[];

export type { CharacterList, CharacterRecord, CharacterRecordList, CharacterPageResponse };
export default Character;
