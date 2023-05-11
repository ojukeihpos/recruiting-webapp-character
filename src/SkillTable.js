import { Button, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { SKILL_LIST } from "./consts";
import { AttributesContext, PointsContext } from "./Character";
import './SkillTable.css'

// Requirement 4
// Ability modifiers

// Requirement 5
// Skill and spendable points implementation

const SkillTable = () => {
    const [skillTable, setSkillTable] = useState([]);
    const [attributes] = useContext(AttributesContext)
    const { spendablePoints, setSpendablePoints, spentPoints, setSpentPoints } = useContext(PointsContext)

    useEffect(() => {
        let tableData = []

        SKILL_LIST.map((skill, index) => {

            let attribute = skill.attributeModifier
            let modifier = Math.floor((attributes[attribute] - 10) / 2)
            let spent = 0
            try {
                spent = skillTable[index].spent
                // retains number of points spent across attribute changes
            } catch (error) {
                spent = 0
            }
            let skillValue = Math.max(0, Math.max(0, 10 + (4 * attribute)) + modifier)
            tableData.push({
                skill: skill.name,
                spent: spent,
                attribute: attribute,
                modifier: modifier,
                skillValue: skillValue
            });
        })
        setSkillTable(tableData)
    }, [attributes])

    const handleIncrement = (skill) => {
        if (spendablePoints > 0) {
            skill.spent = Math.max(0, skill.spent + 1)
            setSpendablePoints(spendablePoints - 1)
            setSpentPoints(spentPoints + 1)
        }
    }

    const handleDecrement = (skill) => {
        if (skill.spent > 0) {
            skill.spent = Math.max(0, skill.spent - 1)
            setSpendablePoints(spendablePoints + 1)
            setSpentPoints(spentPoints - 1)
        }
    }

    return <div className="skillTable">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr className="headers">
                    <td>Skill</td>
                    <td>Points</td>
                    <td>Attribute</td>
                    <td>Modifier</td>
                    <td>Skill Value</td>
                </tr>
            </thead>
            <tbody>
                {skillTable.map((skill) => {
                    return (
                        <tr key={skill.name}>
                            <td>{skill.skill}</td>
                            <td className="pointsCol">
                                <Button size='sm' onClick={() => handleDecrement(skill)}>-</Button>
                                {skill.spent}
                                <Button size='sm' onClick={() => handleIncrement(skill)}>+</Button>
                            </td>
                            <td>{skill.attribute}</td>
                            <td>{skill.modifier}</td>
                            <td>{skill.modifier + skill.spent}</td>
                        </tr>);
                })}
            </tbody>
        </Table>
    </div>
}

export default SkillTable