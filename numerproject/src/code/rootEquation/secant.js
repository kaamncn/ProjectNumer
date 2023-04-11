import { useState } from "react"
import { evaluate, derivative } from 'mathjs'
import { NumberInput, TextInput, Button, Table } from '@mantine/core';

const Secant = () => {

    const [equation, setEquation] = useState('(x^2)-7')
    const [xl, setXL] = useState(0)
    const [xr, setXR] = useState(0)
    const data = [];
    const [ans, setAns] = useState()
    const [dataIter, setDataIter] = useState([])
    const [dataXR, setDataXR] = useState([])
    const [dataXM, setDataXM] = useState([])
    const [dataXL, setDataXL] = useState([])
    const [display, setDisplay] = useState(null)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputX = (event) => {
        console.log(event)
        setXL(event)
    }
    const click = () => {
        calSecant(parseFloat(xl), parseFloat(xr))
        //setDisplay(showAns())
        setDisplay(showAnsTable())
    }

    const calSecant = (x0, x1) => {
        //console.log(x, equation)
        var xnew, e, scope, xold1, xold2
        var iter, maxIter = 50
        var dataObj = {}
        var minErr = 0.00001
        const f = (x) => {
            scope = {
                x: x
            }
            return evaluate(equation, scope)
        }
        const err = (xold, xnew) => {
            return Math.abs((xnew - xold) / xnew) * 100
        }
        xold1 = x1
        xold2 = x0
        for (iter = 0; iter < maxIter; iter++) {
            xnew = xold1 - ((f(xold1) * (xold1 - xold2)) / (f(xold1) - f(xold2)))
            e = err(xold2, xold1)
            dataObj = {
                iteration: iter,
                x1: xold1,
                x2: xold2
            }
            data.push(dataObj)
            if (e < minErr) {
                break
            }
            xold2 = xold1
            xold1 = xnew

        }
    }

    const showAnsTable = () => {
        console.log(data)
        setDataIter(data.map((x) => x.iteration))
        setDataXL(data.map((x) => x.x))
        const value = data.map((data) => (
            <tr key={data.iteration}>
                <td>{data.iteration}</td>
                <td>{data.x1}</td>
                <td>{data.x2}</td>
            </tr>
        ))
        return (
            <div>

                <Table verticalSpacing="sm" withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Iteration</th>

                            <th>X1</th>
                            <th>X2</th>

                        </tr>
                    </thead>
                    <tbody>{value}</tbody>
                </Table>
            </div>

        )
    }
    return (
        <div>
            <TextInput
                label="Equation"
                withAsterisk
                onChange={inputEquation}
                value={equation}
            //style={{width:150}}
            />
            <NumberInput
                label="X0"
                withAsterisk
                onChange={inputX}
            />
            <NumberInput
                label="X1"
                withAsterisk
                onChange={inputX}
            />
            <Button onClick={click}>
                Calculate
            </Button>
            {display}
        </div>

    );
}
export default Secant