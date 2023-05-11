import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Character from "./Character";
import './MainPage.css'

import { Fragment, useState } from "react";

// Requirement 8
// Multiple characters

const MainPage = () => {
    const [characters, setCharactersArray] = useState([<Character />]);

    return (<Container fluid>
        <div className="partyControls">
            <Button size="sm" onClick={() => {
                if (characters.length > 1) {
                    characters.pop()
                }
                setCharactersArray([...characters])
            }}>Remove Character</Button>
            <Button size="sm" onClick={() => setCharactersArray([...characters, <Character />])}>Add Character</Button>
        </div>
        {characters.map((character, index) => {
            return <Fragment key={index}>
                <p className="characterLabel">Character {index + 1}</p>
                {character}
            </Fragment>
        })}
    </Container>)
}

export default MainPage