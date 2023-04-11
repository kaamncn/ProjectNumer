import { useState } from "react"
import { evaluate } from 'mathjs'
import { NumberInput, TextInput, Button, Table } from '@mantine/core';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const FalsePosition = () => {

    const [equation, setEquation] = useState('(x^4)-13')
    const [xl, setXL] = useState(0)
    const [xr, setXR] = useState(0)
    const data = [];
    const [ans, setAns] = useState(0)
    const [dataIter, setDataIter] = useState([])
    const [dataXR, setDataXR] = useState([])
    const [dataX, setDataX] = useState([])
    const [dataXL, setDataXL] = useState([])
    const [dataError, setDataError] = useState([])
    const [display, setDisplay] = useState(null)
    let state = 1
    const dataChart = {
        labels: dataIter,
        datasets: [
            {
                label: 'Error',
                data: dataError,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'X',
                data: dataX,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    };
    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputXL = (event) => {
        console.log(event)
        setXL(event)
    }
    const inputXR = (event) => {
        console.log(event)
        setXR(event)
    }
    const click = () => {
        calFalsePosition(parseFloat(xl), parseFloat(xr))
        //setDisplay(showAns())
        if (state == 1) {
            setDisplay(showAnsTable())
        }
    }

    const calFalsePosition = (xl, xr) => {
        console.log(xl, xr)
        var x, e, scope
        var iter = 0, maxIter = 50
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
        const xi = (xl, xr) => {
            return ((xl * f(xr)) - (xr * f(xl))) / (f(xr) - f(xl))
        }
        do {
            x = xi(xl, xr)
            if (f(x) * f(xr) > 0) {
                e = err(xr, x)
                dataObj = {
                    iteration: iter,
                    xl: xl,
                    x: x,
                    xr: xr,
                    err: e
                }
                console.log(dataObj)
                data.push(dataObj)
                xr = x;
            }
            else if (f(x) * f(xr) < 0) {
                e = err(xl, x)
                dataObj = {
                    iteration: iter,
                    xl: xl,
                    x: x,
                    xr: xr,
                    err: e
                }
                console.log(dataObj)
                data.push(dataObj)
                xl = x;
            }
            iter++
            console.log(e)
        } while (e > minErr && iter < maxIter)
        if (f(xl) < 0 && f(xr) > 0) {
            console.log(x)
            setAns(x)
        }
        else {
            alert("No")
            state = 0
        }
    }

    const showAnsTable = () => {
        console.log(data)
        setDataIter(data.map((x) => x.iteration))
        setDataXL(data.map((x) => x.xl))
        setDataX(data.map((x) => x.x))
        setDataXR(data.map((x) => x.xr))
        setDataError(data.map((x) => x.err))
        const value = data.map((data) => (
            <tr key={data.iteration}>
                <td>{data.iteration}</td>
                <td>{data.xl}</td>
                <td>{data.x}</td>
                <td>{data.xr}</td>
                <td>{data.err}</td>
            </tr>
        ))
        return (
            <div>
                {/* Ans = {ans.toPrecision(7)} */}
                <Table verticalSpacing="sm" withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>XL</th>
                            <th>X</th>
                            <th>XR</th>
                            <th>ERROR</th>
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
                label="XL"
                withAsterisk
                onChange={inputXL}
            />
            <NumberInput
                label="XR"
                withAsterisk
                onChange={inputXR}
            />
            <Button onClick={click}>
                Calculate
            </Button>
            <br></br>
            {state == 1 &&
                <div>Ans = {ans.toPrecision(7)}</div>
}
            {display}
            {dataError.length > 0 && <Line data={dataChart} />}
        </div>

    );
}
export default FalsePosition