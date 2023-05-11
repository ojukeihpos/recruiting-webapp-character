import { useContext, useEffect, useState } from "react";
import { Card, Collapse } from "react-bootstrap";
import { AttributesContext, ClassContext } from "./Character";
import './CharacterClass.css'

// Requirement 2
// Display classes on screen, visual change when min reqs met

// Requirement 3
// Display min reqs when class clicked

const CharacterClass = ({ className, reqAttributes }) => {
    const [colour, setColour] = useState("lightpink")
    const [attributes] = useContext(AttributesContext)
    const [selectedClass, setSelectedClass] = useContext(ClassContext)

    useEffect(() => {
        setColour("lightgreen")
        Object.entries(attributes).forEach(([attribute]) => {
            if (attributes[attribute] < reqAttributes[attribute]) {
                setColour("lightpink")
            }
        })
    }, [attributes, reqAttributes])

    return (
        <div style={{ backgroundColor: colour }} onClick={() => selectedClass == className ? setSelectedClass("") : setSelectedClass(className)}>
            {className}
            <Collapse id={className} in={selectedClass == className}>
                <div className="classMinimums">
                    {Object.entries(reqAttributes).map(
                        ([key, value]) =>
                            <div key={key}>{key} : {value}</div>
                    )}
                </div>
            </Collapse>
        </div>
    )
}
export default CharacterClass