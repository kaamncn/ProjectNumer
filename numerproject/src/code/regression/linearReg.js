import { useState } from "react";
import {
    NumberInput,
    TextInput,
    Button,
    Table,
    Grid,
    SimpleGrid,
    Center,
} from "@mantine/core";
import { log, sum, square, pow } from "mathjs";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

const LinearReg = () => {
    const [number, setNumber] = useState(0)
    const [data, setData] = useState([{ x: 0, y: 0 }]); // default data with one row
    const [ans, setAns] = useState(Array(2).fill(0))
    const [x, setX] = useState(Array(number).fill(0))
    const [y, setY] = useState(Array(number).fill(0))
    const [fx, setFx] = useState(0)
    const [ansFx, setAnsFx] = useState(0)
    const insertRow = () => {
        setData([...data, { x: 0, y: 0 }]); // add a new row with x and y set to 0
    };
    const inputX = (value, i) => {
        console.log(value, i);
        // // console.log(x);
        const newData = [...x]; // create a copy of the data array
        newData[i] = value; // update the x value of the row at the given index
        setX(newData); // update the state with the new data
        console.log(newData);
    };

    const inputY = (value, i) => {
        console.log(value, i);
        // // console.log(y);
        const newData = [...y]; // create a copy of the data array
        newData[i] = value; // update the y value of the row at the given index
        setY(newData); // update the state with the new data
        console.log(newData);
    };
    const table = (n) => {
        console.log(n);
        let matrix = []
        for (let i = 0; i < n; i++) {
            matrix.push(
                <tr key={i}>
                    <td>
                        <NumberInput onChange={(value) => inputX(value, i)} />
                    </td>
                    <td>
                        <NumberInput onChange={(value) => inputY(value, i)} />
                    </td>
                </tr>
            )
        }
        return (
            <Table verticalSpacing="sm" withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                </thead>
                <tbody>
                    {matrix}
                </tbody>
            </Table>
        )
    }
    const calLinearReg = () => {
        console.log(data);
        let a0, a1, ans = [], sum2X = 0, sumXY = 0, value = 0
        let n = x.length
        // let sumX = sum(data.map((value) => value.x))
        // let sumY = sum(data.map((value) => value.y))
        // let sum2X = sum(data.map((value) => pow(value.x, 2)))
        // let sumXY = sum(data.map((value) => value.y * value.x))
        let sumX = sum(x)
        let sumY = sum(y)
        for (let i = 0; i < x.length; i++) {
            sum2X += pow(x[i], 2)
            sumXY += (x[i] * y[i])
        }
        //let sum2X = sum()
        // let sumXY = sum()
        console.log(n, sumX, sumY, sum2X, sumXY);
        ans[1] = (n * sumXY - sumX * sumY) / (n * sum2X - sumX ** 2)
        ans[0] = (sumY - ans[1] * sumX) / n
        value = (ans[1] * fx) + ans[0]
        // console.log(ans);
        setAns(ans)
        setAnsFx(value)
        ShowAns()
    }
    const ShowAns = () => {
        return (
            <div>
                <h3>f(x)={`${ans[1].toFixed(2)}x + ${ans[0].toFixed(2)}`}</h3>
                <h3>Ans = {ansFx}</h3>
            </div>
        )
    }
    return (
        <div>
            <Center maw={400} mx="auto" pt={20}>
                <NumberInput label="Number" onChange={(n) => {
                    // table(n)
                    setX(Array(n).fill(0))
                    setY(Array(n).fill(0))
                    setNumber(n)
                }} />
                <NumberInput label="X" onChange={(x) => {
                    setFx(x)
                }} />
            </Center>
            <Center>
                {table(number)}
            </Center>
            <br></br>
            <Center>
                <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                    {/* <Button onClick={insertRow}>+</Button> */}
                    <Button onClick={calLinearReg}>Calculate</Button>
                </SimpleGrid>
            </Center>
            {/* <ShowAns/> */}
            {ShowAns()}
        </div>
    );
};

export default LinearReg;







// import { NumberInput, TextInput, Button, Table, Grid, SimpleGrid, Center } from '@mantine/core';
// import { index } from 'mathjs';
// import { useState } from 'react';
// const LinearReg = () => {
//     const [inputX, setInputX] = useState([])
//     const [inputY, setInputY] = useState([])
//     const [input, setInput] = useState([{ x: 0, y: 0 }])
//     let count = 1;
//     const insertRow = () => {
//         count++;
//         console.log(inputX);
//         console.log(inputY);
//         // return(
//         //     <
//         // )
//     }
//     const pushX = (i, value) => {
//         // const x = [...inputX]
//         // x[i]=value
//         // console.log(x);
//         // setInputX(x)
//         .

//     }
// const pushY = (i, value) => {
//     const y = [...inputY]
//     y[i] = value
//     console.log(y);
//     setInputX(y)
// }
// return (
//     <div>
//         <Center maw={400} mx="auto" pt={20}>
//             <Table verticalSpacing="sm" withBorder withColumnBorders>
//                 <thead>
//                     <tr>
//                         <th>X</th>
//                         <th>Y</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {input.map((row, i) => (
//                         <tr key={i}>
//                             <td>
//                                 <NumberInput onChange={(value, i) => { pushX(value, i) }}></NumberInput>
//                             </td>
//                             <td>
//                                 <NumberInput onChange={(value, i) => { pushY(value, i) }}></NumberInput>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>



//             </Table>
//         </Center>
//         <br></br>
//         <Center>
//             <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
//                 <Button onClick={insertRow}>+</Button>
//                 <Button>Calculate</Button>
//             </SimpleGrid>
//         </Center>

//     </div>

// )
// }
// export default LinearReg

