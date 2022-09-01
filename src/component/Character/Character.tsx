import RxComponent from '../RxComponent/RxComponent';
import CharacterService from '../../service/Character';
import CharacterModel from '../../service/model/Character';

import './Character.scss';

type CharacterProps = {
    id: number;
};
type CharacterState = {
    loading: boolean;
    character: CharacterModel | null;
};

class Character extends RxComponent<CharacterProps, CharacterState> {
    handler = {
        setCharacter: this.setCharacter.bind(this),
    }

    constructor(props: CharacterProps) {
        super(props);

        this.state = {
            loading: true,
            character: null,
        }
    }

    componentDidMount() {
        const character = CharacterService.getCharacter(this.props.id);
        if (character) {
            this.setCharacter(character);
        } else {
            CharacterService.loadCharacter(this.props.id).then(this.handler.setCharacter);
        }
    }

    setCharacter(character: CharacterModel) {
        this.setState({ character, loading: false });
    }

    render() {
        const { character } = this.state;

        return character ? <div className="character">
            <h1>{character.name}</h1>
            <div className="character__props">
                <div>Weight: {character.mass}</div>
                <div>name: {character.name}</div>
                <div>height: {character.height}</div>
                <div>mass: {character.mass}</div>
                <div>hairColor: {character.hairColor}</div>
                <div>skinColor: {character.skinColor}</div>
                <div>eyeColor: {character.eyeColor}</div>
                <div>birthYear: {character.birthYear}</div>
                <div>gender: {character.gender}</div>
                <div>homeWorld: {character.homeWorld.name}</div>
                <div>film count: {character.filmList.length}</div>
                <div>vehicle count: {character.vehicleList.length}</div>
                <div>starship count: {character.starshipList.length}</div>
                <div>created: {character.created.format('Y-m-d H:i:s')}</div>
                <div>edited: {character.edited.format('Y-m-d H:i:s')}</div>
            </div>
        </div> : <div>loading...</div>;
    }
}

export default Character;

