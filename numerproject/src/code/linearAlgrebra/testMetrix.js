import { SimpleGrid, NumberInput, Center, Button } from "@mantine/core"
import { log } from "mathjs";
import { useState } from "react";
import { det } from 'mathjs'

const Cramer = () => {
    const [dimension, setDimension] = useState(0)
    const [showMatrix, setMatrix] = useState(null)
    const [ans, setAns] = useState(2)
    const [xAns, setXAns] = useState(Array(dimension).fill(0))
    const [data, setData] = useState(Array(dimension).fill(0).map(() => Array(dimension).fill(0)))

    const pushData = (i, j, value) => {
        console.log(i, j, value);
        const m = [...data]
        m[i][j] = value
        console.log(m);
        setData(m)
    }
    const pushAns = (i, value) => {
        const a = [...ans]
        a[i] = value
        console.log(a);
        setAns(a)
    }
    
    const calCramer = () => {
        let mC, mA, mB, k = 0, DetA, ans1 = []
        let x = []
        mA = data
        mB = ans
        DetA = det(mA)
        console.log(mA);
        if (DetA === 0) {
            console.log("Can't divide by zero!");
        }
        else {
            for (let j = 0; j < dimension; j++) {
                mC = mA.map(row => [...row])
                for (let i = 0; i < dimension; i++) {
                    mC[i][k] = mB[i];
                }
                x[k] = det(mC) / DetA;
                ans1.push(x[k])
                console.log(`Y${k} = ${x[k]}`);
                k++;
            }
            console.log(ans1);
            setXAns(ans1)
        }
    }
    const createMatrix = (n) => {
        //console.log(dimension);
        console.log(data);
        let matrix = []
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                matrix.push(
                    <NumberInput key={`${i},${j}`} label={`X${i},${j}`} onChange={(value) => pushData(i, j, value)} />
                )
            }
            matrix.push(
                <NumberInput key={i} label={`Y${i}`} onChange={(value) => pushAns(i, value)} />
            )
        }
        return (
            <div>
                <Center maw={800} mx="auto" pt={20}>
                    <SimpleGrid cols={n + 1} verticalSpacing="sm">
                        {matrix}
                    </SimpleGrid>
                </Center>
                <br></br>

            </div>
        )
    }
    return (
        <div>
            <NumberInput onChange={(n) => {
                setData(Array(n).fill(0).map(() => Array(n).fill(0)))
                setAns(Array(n).fill(0))
                setDimension(n)
                // changeMatrix(n)
            }} />
            {createMatrix(dimension)}
            <Center>
                <Button onClick={calCramer}>
                    Calculate
                </Button>
            </Center>
            {xAns.map((ans, i) => {
                return (
                    <div key={i}>
                        <h3>{ans}</h3>
                    </div>
                )
            })}
            {/* {showAns()} */}
        </div>
    );
}
export default Cramer