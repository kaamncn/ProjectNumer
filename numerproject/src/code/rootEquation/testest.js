import { TextInput, Button } from '@mantine/core';
import { evaluate } from 'mathjs';
import { useState } from 'react';

const Testtest = () => {
    const [equation, setEquation] = useState()
    const [Xl, setXL] = useState()
    const [Xr, setXR] = useState()
    const [ans, setAns] = useState(null)


    const inputEquation = (e) => {
        console.log(e.target.value);
        setEquation(e.target.value)
    }
    const inputXL = (e) => {
        console.log(e.target.value);
        setXL(e.target.value)
    }
    const inputXR = (e) => {
        console.log(e.target.value);
        setXR(e.target.value)
    }
    const calfalse = (xl) => {
        //console.log(xl)
        var ans, scope
        scope = {
            x: xl
        }
        ans = evaluate(equation, scope)
        console.log(ans);
        setAns(ans)

    }
    const click = () => {

        calfalse(parseFloat(Xl), parseFloat(Xr))
    }
    return (
        <div>
            <TextInput
                placeholder="Equation"
                label="Equation"
                withAsterisk
                onChange={inputEquation}
            />
            <TextInput
                placeholder="XL"
                label="xl"
                // withAsterisk
                onChange={inputXL}
            />
            <TextInput
                placeholder="XR"
                label="xr"
                //withAsterisk
                onChange={inputXR}
                value={ans}
            />
            <Button onClick={click}>
                Calculate
            </Button>
        </div>
    )
}
export default Testtest