import { useState } from "react"
import { evaluate, derivative } from 'mathjs'
import { NumberInput, TextInput, Button, Table } from '@mantine/core';
let math = require('mathjs')

const Newton = () => {

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
    const [changeInput, setChangeInput] = useState('x')

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputX = (event) => {
        console.log(event)
        setXL(event)
    }
    // const inputXR = (event) => {
    //     console.log(event)
    //     setXR(event)
    // }
    const click = () => {
        calNewton(parseFloat(xl), parseFloat(xr))
        //setDisplay(showAns())
        setDisplay(showAnsTable())
    }

    const calNewton = (x) => {
        console.log(x, equation)
        var xnew, e, scope, xold
        var iter, maxIter = 50
        var dataObj = {}
        var minErr = 0.00001
        let regex = equation.match(/[A-Za-z]/i)
        setChangeInput(regex[0])
        const f = (x) => {
            return evaluate(equation, { [regex[0]]: x })
        }
        const diff = (x) => {

            console.log(regex[0]);
            console.log(derivative(equation, `${regex[0]}`).evaluate({ [regex[0]]: x }));
            return derivative(equation, `${[regex[0]]}`).evaluate({ [regex[0]]: x })
        }
        const err = (xold, xnew) => {
            return Math.abs((xnew - xold) / xnew) * 100
        }
        xold = x
        for (iter = 0; iter < maxIter; iter++) {
            xnew = xold - (f(xold) / diff(xold))
            e = err(xold, xnew)
            dataObj = {
                iteration: iter,
                x: xnew,
            }
            data.push(dataObj)
            if (e < minErr) {
                break
            }
            xold = xnew
        }
    }

    const showAnsTable = () => {
        console.log(data)
        console.log(changeInput)
        setDataIter(data.map((x) => x.iteration))
        setDataXL(data.map((x) => x.x))
        const value = data.map((data) => (
            <tr key={data.iteration}>
                <td>{data.iteration}</td>
                <td>{data.x}</td>
            </tr>
        ))
        return (
            <div>

                <Table verticalSpacing="sm" withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>{changeInput}</th>
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
                label="X"
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
export default Newton