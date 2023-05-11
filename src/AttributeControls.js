import { Button, Table } from "react-bootstrap";
import { ATTRIBUTE_LIST } from "./consts"
import { AttributesContext, PointsContext } from "./Character";
import { useEffect, useState, useContext } from "react";
import './AttributeControls.css'

// Requirement 1
// Independent attribute control

// Requirement 7
// Maximum total for attributes

const AttributeController = ({ attribute }) => {
  const [attributes, setAttributes] = useContext(AttributesContext)
  const { spendablePoints, setSpendablePoints, spentPoints, setSpentPoints } = useContext(PointsContext)

  function calculatePoints(attributeModifier) {
    return 10 + (4 * attributeModifier)
  }

  function calculateSpendablePoints(intelligenceModifier) {
    return calculatePoints(Math.floor((intelligenceModifier - 10) / 2))
  }

  function handleDecrement() {
    let newSpendablePoints = calculateSpendablePoints(attributes['Intelligence'] - 1)

    if (attribute === 'Intelligence') {
      if ((spentPoints > 0 && newSpendablePoints - spentPoints >= 0) || (attribute === 'Intelligence' && spentPoints <= 0)) {
        setAttributes({
          ...attributes,
          [attribute]: attributes[attribute] - 1,
        })
        setSpendablePoints(Math.max(0, newSpendablePoints - spentPoints))
      }
    } else {
      setAttributes({
        ...attributes,
        [attribute]: attributes[attribute] - 1,
      })
    }
  }

  function handleIncrement() {
    setAttributes({
      ...attributes,
      [attribute]: attributes[attribute] + 1,
    })
    if (attribute === 'Intelligence') {
      setSpendablePoints(Math.max(0, calculateSpendablePoints(attributes['Intelligence'] + 1) - spentPoints))
    }
  }

  return (
    <tr>
      <td>
        <Button className="subtract" size="sm" onClick={handleDecrement}>-</Button>
        <div className="attribute">{attribute} : {attributes[attribute]}</div>
        <Button className="add" size="sm" onClick={handleIncrement} disabled={Object.values(attributes).reduce((partialSum, a) => partialSum + a, 0) >= 70}>+</Button>
      </td>
    </tr>
  )
}

const AttributeControls = () => {
  const { spendablePoints, setSpendablePoints, spentPoints, setSpentPoints } = useContext(PointsContext)
  const [attributes] = useContext(AttributesContext)

  return <div id="playerControls">
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr className="headers">
          <td>
            Attributes - Total: {Object.values(attributes).reduce((partialSum, a) => partialSum + a, 0)}/70
          </td>
        </tr>
      </thead>
      <tbody>
        {ATTRIBUTE_LIST.map((attribute) => {
          return <AttributeController attribute={attribute} key={attribute} />
        })}
        <tr>
          <td>
            Spendable Points: {spendablePoints}/{spendablePoints + spentPoints}
          </td>
        </tr>
      </tbody>
    </Table>
  </div >
}

export default AttributeControls