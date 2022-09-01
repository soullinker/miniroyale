import CharacterModel, { CharacterRecord } from '../model/Character';
import { unknownHomeWorld } from '../model/HomeWorld';
import DateTime from '../model/DateTime';

class Character {
    public static fromRecord(record: CharacterRecord): CharacterModel {
        // string: https://swapi.dev/api/people/1/
        const id = parseInt(record.url.replace('https://swapi.dev/api/people/', ''));

        return new CharacterModel({
            id,
            name: record.name,
            height: parseFloat(record.height),
            mass: parseFloat(record.mass),
            hairColor: record.hair_color,
            skinColor: record.skin_color,
            eyeColor: record.eye_color,
            birthYear: record.birth_year,
            gender: record.gender,
            homeWorld: unknownHomeWorld,
            filmList: [],
            vehicleList: [],
            starshipList: [],
            created: new DateTime(new Date(record.created)),
            edited: new DateTime(new Date(record.edited)),
        });
    }
}

export default Character;
