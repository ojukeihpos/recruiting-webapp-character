import { Component, createContext, useState } from "react";
import { CLASS_LIST } from "./consts";
import AttributeControls from "./AttributeControls";
import SkillTable from "./SkillTable";
import CharacterClass from "./CharacterClass";
import { ATTRIBUTE_LIST } from "./consts";
import './Character.css'



export const PointsContext = createContext();

export const PointsContextProvider = (props) => {
    const [spendablePoints, setSpendablePoints] = useState(0)
    const [spentPoints, setSpentPoints] = useState(0)
    return (
        <PointsContext.Provider value={{ spendablePoints, setSpendablePoints, spentPoints, setSpentPoints }}>
            {props.children}
        </PointsContext.Provider>
    )
}

export const AttributesContext = createContext();

export const AttributesContextProvider = (props) => {

    const [attributes, setAttributes] = useState(
        () => {
            let attributes = {}
            ATTRIBUTE_LIST.forEach(attribute => {
                attributes[attribute] = 0
            })
            return attributes
        })
    return (
        <AttributesContext.Provider value={[attributes, setAttributes]}>
            {props.children}
        </AttributesContext.Provider>
    )
}

export const ClassContext = createContext();

export const ClassContextProvider = (props) => {

    const [selectedClass, setSelectedClass] = useState("")
    return (
        <ClassContext.Provider value={[selectedClass, setSelectedClass]}>
            {props.children}
        </ClassContext.Provider>
    )
}

class Character extends Component {

    render() {
        return <PointsContextProvider>
            <AttributesContextProvider>
                <div className="character">
                    <div className="sidebar">
                        <AttributeControls />
                        <ClassContextProvider className="classes">
                            {Object.entries(CLASS_LIST).map(GAME_CLASS => {
                                return <CharacterClass key={GAME_CLASS[0]} className={GAME_CLASS[0]} reqAttributes={GAME_CLASS[1]} />
                            })}
                        </ClassContextProvider>
                    </div>
                    <SkillTable />
                </div>
            </AttributesContextProvider>
        </PointsContextProvider>
    }
}

export default Character