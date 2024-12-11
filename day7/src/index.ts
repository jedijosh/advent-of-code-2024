import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day7/data'

const LOGGING = false

const OPERATORS_PART_ONE = ['+', '*']
const OPERATORS_PART_TWO = ['+', '*', '||']

export async function solution ( filename : string, validOperators: Array<string>) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let result: number = 0

    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let line = fileLines[lineNumber]
        let lineSplit = line.split(':')
        let testValue = parseInt(lineSplit[0])
        let equationNumbers = lineSplit[1].split(' ').filter((value) => value !== '')
        // Test all permutations of operators
        
    
        
        let permutations = await findPermutations(validOperators, equationNumbers.length - 1)
        // let lastNumber = equationNumbers[equationNumbers.length-1]
        // // If the last number is not at the end of the test value, the concatentation operator cannot be the last operator.  Remove all permutations where this is true.
        // if (lineSplit[0].slice(lastNumber.toString().length) === lastNumber) {
        //     let newPermutations = permutations.filter(element => {
        //         let lastOperator = element[element.length - 1]
        //         return lastOperator !== '||'
        //     })
        //     permutations = newPermutations
        // }

        // // If the test value is not divisible by the last number, multiplication cannot be the last operator.  Remove all permutations where this is true.
        // if (testValue % parseInt(lastNumber) !== 0 ) {
        //     let newPermutations = permutations.filter(element => {
        //         let lastOperator = element[element.length - 1]
        //         return lastOperator !== '||'
        //     })
        //     permutations = newPermutations
        // }

        for (let permutationIndex = 0; permutationIndex < permutations.length; permutationIndex++) {
            console.log(`processing line number ${lineNumber} of ${fileLines.length}, permutation ${permutationIndex} of ${permutations.length}`)
            let equationResult = equationNumbers[0]
            let equationNumberIndex = 0
            for (let operatorIndex = 0; operatorIndex < permutations[permutationIndex].length; operatorIndex++) {
                let operator = permutations[permutationIndex][operatorIndex]
                let functionToEvaluate
                if ( operator === '||') {
                    functionToEvaluate = "'" + equationResult + "'+" + equationNumbers[equationNumberIndex+1]
                } else {
                    functionToEvaluate = equationResult + permutations[permutationIndex][operatorIndex] + equationNumbers[equationNumberIndex+1]
                }
                equationResult = eval(functionToEvaluate)
                equationNumberIndex++
            }
            if (parseInt(equationResult) === testValue) {
                result += testValue
                break
            }
        }
    }
    
    return result
}

// export async function solution ( filename : string, validOperators: Array<string>) {
//     let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
//     let result: number = 0

//     for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
//         let line = fileLines[lineNumber]
//         let lineSplit = line.split(':')
//         let testValue = parseInt(lineSplit[0])
//         let equationNumbers = lineSplit[1].split(' ').filter((value) => value !== '')
//         // Test all permutations of operators

        
//         let permutations = await findPermutations(validOperators, equationNumbers.length - 1)

//         for (let permutationIndex = 0; permutationIndex < permutations.length; permutationIndex++) {
//             console.log(`processing line number ${lineNumber} of ${fileLines.length}, permutation ${permutationIndex} of ${permutations.length}`)
//             let equationResult = equationNumbers[0]
//             let equationNumberIndex = 0
//             for (let operatorIndex = 0; operatorIndex < permutations[permutationIndex].length; operatorIndex++) {
//                 let operator = permutations[permutationIndex][operatorIndex]
//                 let functionToEvaluate
//                 if ( operator === '||') {
//                     functionToEvaluate = "'" + equationResult + "'+" + equationNumbers[equationNumberIndex+1]
//                 } else {
//                     functionToEvaluate = equationResult + permutations[permutationIndex][operatorIndex] + equationNumbers[equationNumberIndex+1]
//                 }
//                 equationResult = eval(functionToEvaluate)
//                 equationNumberIndex++
//             }
//             if (parseInt(equationResult) === testValue) {
//                 result += testValue
//                 break
//             }
//         }
//     }
    
//     return result
// }

export async function findPermutations(availableValues: Array<string>, outputArrayLength: number) {
    let permutations: Array<Array<string>> = []
    
    const permute = async (availableValues: Array<string>, outputArray: Array<string>) => {
        if (outputArray.length === outputArrayLength) {
            permutations.push(outputArray)
            return
        } 
        for (let i = 0; i < availableValues.length; i++) {
            await permute(availableValues, outputArray.concat(availableValues[i]))
        }   
    }
    await permute(availableValues, [])
    return permutations
}

// solution(dataFolder + '/tests/input.txt', OPERATORS_PART_ONE)
// solution(dataFolder + '/input.txt', OPERATORS_PART_ONE)

// solution(dataFolder + '/tests/input.txt', OPERATORS_PART_TWO)
solution(dataFolder + '/input.txt', OPERATORS_PART_TWO)
    .then(answer => console.log('answer:', answer))

// findPermutations(['+', '*'], 2)
//     .then(permutations => console.log(permutations))

// findPermutations(['+', '*'], 3)
//     .then(permutations => console.log(permutations))