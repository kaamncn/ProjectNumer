import { useEffect, useState } from "react"
import { evaluate, log } from 'mathjs'
import { NumberInput, TextInput, Button, Table, Center, Select } from '@mantine/core';
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
const Bisection = () => {
    const [equation, setEquation] = useState('(x^4)-13')
    const [xl, setXL] = useState()
    const [xr, setXR] = useState()
    const data = [];
    const [ans, setAns] = useState(0)
    const [dataIter, setDataIter] = useState([])
    const [dataXR, setDataXR] = useState([])
    const [dataXM, setDataXM] = useState([])
    const [dataXL, setDataXL] = useState([])
    const [dataError, setDataError] = useState([])
    const [display, setDisplay] = useState(null)
    let state = 0
    const [apiXL, setApiXL] = useState(0)
    const [apiXR, setApiXR] = useState(0)
    const [api, setApi] = useState([])
    const [token, setToken] = useState()

    // const clickToken = () => {
    //     fetch('http://localhost:5500/login')
    //         .then(res => res.json())
    //         .then(result => {
    //             setToken(result.token)
    //             //console.log(result);
    //             console.log(result.token);

    //         })
    // }

    const clickToken = () => {
        fetch('http://localhost:5500/login')
            .then(res => res.json())
            .then(result => {
                setToken(result.token); // set the token value in state
                console.log(result.token)
            })
    }
    const getData = () => {
        // make a request to the API endpoint with the token in the headers
        fetch('http://localhost:5500/dataEquation', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // handle the response data from the server
                console.log(data);
                setApi(data)
            })
            .catch(err => console.log(err));
    }

    // useEffect(() => {
    //     fetch('http://localhost:5500/dataEquation')
    //         .then(res => res.json())
    //         .then(result => {
    //             setApi(result)
    //             console.log(result);
    //         })
    // }, [])
    // const showX = (e) => {
    //     console.log(e);
    //     console.log(api);
    //     api.map((data) => {
    //         if (data.value == e) {
    //             console.log(data);
    //             setApiXL(data.xl)
    //             setApiXR(data.xr)
    //             setEquation(data.label)
    //             setXL(data.xl)
    //             setXR(data.xr)
    //         }
    //         console.log(data);
    //     })
    // }
    const options = {
        responsive: true,
        scales: {

        }
    };
    const dataChart = {
        labels: dataIter,
        datasets: [
            {
                label: 'Error',
                data: dataError,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // options:{
                //     scales:{
                //         xAxes: [{
                //             display: true,
                //             ticks: {
                //                 beginAtZero: true
                //             },
                //             scaleLabel: {
                //                 display: true,
                //                 //labelString: 'Spare Parts'
                //             }
                //         }],
                //         yAxes: [{
                //             type: 'logarithmic',
                //             ticks: {
                //                 autoSkip: true,
                //                 min: 0,
                //             }
                //         }]
                //     }
                // }
            },
            {
                label: 'XM',
                data: dataXM,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                // options:{
                //     scales:{
                //         xAxes: [{
                //             display: true,
                //             ticks: {
                //                 beginAtZero: true
                //             },
                //             scaleLabel: {
                //                 display: true,
                //                 //labelString: 'Spare Parts'
                //             }
                //         }],
                //         yAxes: [{
                //             type: 'logarithmic',
                //             ticks: {
                //                 autoSkip: true,
                //                 min: 0,
                //             }
                //         }]
                //     }
                // }
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
        calBisection(parseFloat(xl), parseFloat(xr))
        //setDisplay(showAns())
        if (state == 0) {

            setDisplay(showAnsTable())
        }

    }

    const calBisection = (xl, xr) => {
        console.log(xl, xr)
        var xm, e, scope
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
        do {
            xm = (xl + xr) / 2.0
            console.log(dataObj)


            if (f(xm) * f(xr) > 0) {
                e = err(xr, xm)
                dataObj = {
                    iteration: iter,
                    xl: xl,
                    xm: xm,
                    xr: xr,
                    err: e
                }
                data.push(dataObj)
                xr = xm;
            }
            else if (f(xm) * f(xr) < 0) {
                e = err(xl, xm)
                dataObj = {
                    iteration: iter,
                    xl: xl,
                    xm: xm,
                    xr: xr,
                    err: e
                }
                data.push(dataObj)
                xl = xm;
            }
            else {
                e = 0
                dataObj = {
                    iteration: iter,
                    xl: xl,
                    xm: xm,
                    xr: xr,
                    err: e
                }
                data.push(dataObj)
            }
            iter++
            console.log(e)
        } while (e > minErr && iter < maxIter)
        if (f(xl) < 0 && f(xr) > 0) {
            console.log(xm)
            setAns(xm)
        }
        else {
            alert("No")
            state = 1
        }
        // return(

        // )
    }
    const showAnsTable = () => {
        console.log(data)
        setDataIter(data.map((x) => x.iteration))
        setDataXL(data.map((x) => x.xl))
        setDataXM(data.map((x) => x.xm))
        setDataXR(data.map((x) => x.xr))
        setDataError(data.map((x) => x.err))
        const value = data.map((data) => (
            <tr key={data.iteration}>
                <td>{data.iteration}</td>
                <td>{data.xl}</td>
                <td>{data.xm}</td>
                <td>{data.xr}</td>
                <td>{data.err}</td>
            </tr>
        ))
        return (
            <div>


                <Table verticalSpacing="sm" withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>XL</th>
                            <th>XM</th>
                            <th>XR</th>
                            <th>Error</th>
                        </tr>
                    </thead>
                    <tbody>{value}</tbody>
                </Table>
            </div>

        )
    }
    return (
        <div>
            <Center maw={400} mx="auto" pt={20}>
                <TextInput
                    label="Equation"
                    withAsterisk
                    onChange={inputEquation}
                    value={equation}
                    style={{ width: 150 }}
                    data-testid='equation'
                />
                {/* <Select
                    label="Equation"
                    placeholder="Choose the equation"
                    data={api}
                    onChange={showX}
                /> */}
            </Center>
            <Center>
                <NumberInput
                    label="XL"
                    withAsterisk
                    onChange={inputXL}
                    //value={apiXL}
                    value={xl}
                    data-testid='xl'
                />

                <NumberInput
                    label="XR"
                    withAsterisk
                    onChange={inputXR}
                    //value={apiXR}
                    value={xr}
                    data-testid='xr'
                />
            </Center>
            <br></br>
            <Center>
                <Button onClick={click} data-testid='button'>
                    Calculate
                </Button>
            </Center>
            <br></br>
            <Center>
                <Button onClick={clickToken}>
                    Get Token
                </Button>
            </Center>
            <br></br>
            <Center>
                <Button onClick={getData}>
                    Send Token
                </Button>
            </Center>
            <div data-testid='ans'>
                    Ans = {ans.toPrecision(7)}
                </div>
            <Center>
                {display}

            </Center>
            <Center>
                {dataError.length > 0 && <Line data={dataChart} />}
            </Center>
        </div>

    );
}
export default Bisection