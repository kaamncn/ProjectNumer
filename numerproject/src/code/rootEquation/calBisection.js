// import { evaluate } from 'mathjs'
// export const calBisection = (xl, xr,equation) => {
//     let data=[],state=0
//     console.log(xl, xr)
//     var xm, e, scope
//     var iter = 0, maxIter = 50
//     var dataObj = {}
//     var minErr = 0.00001
//     const f = (x) => {
//         scope = {
//             x: x
//         }
//         return evaluate(equation, scope)
//     }
//     const err = (xold, xnew) => {
//         return Math.abs((xnew - xold) / xnew) * 100
//     }
//     do {
//         xm = (xl + xr) / 2.0
//         console.log(dataObj)


//         if (f(xm) * f(xr) > 0) {
//             e = err(xr, xm)
//             dataObj = {
//                 iteration: iter,
//                 xl: xl,
//                 xm: xm,
//                 xr: xr,
//                 err: e
//             }
//             data.push(dataObj)
//             xr = xm;
//         }
//         else if (f(xm) * f(xr) < 0) {
//             e = err(xl, xm)
//             dataObj = {
//                 iteration: iter,
//                 xl: xl,
//                 xm: xm,
//                 xr: xr,
//                 err: e
//             }
//             data.push(dataObj)
//             xl = xm;
//         }
//         else {
//             e = 0
//             dataObj = {
//                 iteration: iter,
//                 xl: xl,
//                 xm: xm,
//                 xr: xr,
//                 err: e
//             }
//             data.push(dataObj)
//         }
//         iter++
//         console.log(e)
//     } while (e > minErr && iter < maxIter)
//     if (f(xl) < 0 && f(xr) > 0) {
//         console.log(xm)
        
//     }
//     else {
//         alert("No")
//         state = 1
//     }
//     return{newData:data,newXM:xm}
// }