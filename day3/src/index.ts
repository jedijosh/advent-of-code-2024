import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day3/data'

const LOGGING = true

export async function solution ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let result: number = 0
    let shouldMultiply = true
    let multiplyRegEx = /mul\(\d{1,3},\d{1,3}\)/g
    if (partNumber === 2) multiplyRegEx = /(mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\))?/g
    for (let i = 0; i < fileLines.length; i++) {    
        // Find all the numbers in the line   
        let regExResults = fileLines[i].matchAll(multiplyRegEx)
        // Loop through each entry in regExResults
        for (const match of regExResults) {
            if (match[0] === '') continue
            else if (match[0].includes('don\'t()')) {
                shouldMultiply = false
            }
            else if (match[0].includes('do()')) {
                shouldMultiply = true
            } else {               
                if (shouldMultiply) {
                    let numbers = match[0].match(/\d+/g)
                    if (!numbers) break
                    result += parseInt(numbers[0]) * parseInt(numbers[1])
                }
            }
            
        }
    }
    return result
}

// export async function solution( npm run filename : string, partNumber: number) {
//     let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
//     let result: number = 0
//     let currentOperation = 'do()'
//     let multiplyRegEx = /mul\(\d{1,3},\d{1,3}\)/g
//     let doRegEx = /do\(\)/g
//     let dontRegEx = /don't\(\)/g
//     for (let i = 0; i < fileLines.length; i++) {  
//         let startPosition = 0  
//         // console.log('******* NEW LINE ********')   
//         // Find all the numbers in the line   
//         let regExResults = fileLines[i].matchAll(multiplyRegEx)
//         let doResults = fileLines[i].matchAll(doRegEx)
//         let dontResults = fileLines[i].matchAll(dontRegEx)
//         let arrayOfControls = Array.from(doResults).concat(Array.from(dontResults))
//         let finalArray: Array<{startPosition: number, endPosition: number, operation: string}> = []
//         arrayOfControls.sort((a, b) => a.index - b.index)
//         // console.log('arrayOfControls', arrayOfControls)
//         arrayOfControls.forEach((control, index) => {
//             if (control[0] !== currentOperation) {
//                 finalArray.push({
//                     startPosition: startPosition,
//                     endPosition: control.index,
//                     operation: currentOperation
//                 })
//                 currentOperation = control[0]
//                 startPosition = control.index
//                 // console.log(`control is now ${currentOperation} at index ${control.index}`)
//             }
//             if (index === arrayOfControls.length - 1) {
//                 finalArray.push({
//                     startPosition: startPosition,
//                     endPosition: fileLines[i].length,
//                     operation: currentOperation
//                 })
//                 currentOperation = control[0]
//                 startPosition = control.index
//             }

//         })

//         // startPosition, endPosition, should multiply
//         // Loop through each entry in regExResults
//         for (const match of regExResults) {
//             if (partNumber === 1) {
//                 let numbers = match[0].match(/\d+/g)
//                 if (!numbers) break
//                 result += parseInt(numbers[0]) * parseInt(numbers[1])
//             } else {
//                 // console.log('mul match', match)
//                 let entryToCheck = finalArray.find(entry => {
//                     return entry.startPosition <= match.index && entry.endPosition > match.index
//                 })
//                 if (!entryToCheck) break
//                 if (entryToCheck.operation === 'do()') {
//                     // console.log('multiplying', match[0])
//                     console.log(`line ${i}, ${match.index}: multiplying`)
//                     let numbers = match[0].match(/\d+/g)
//                     if (!numbers) break
//                     // console.log(`multiplying ${parseInt(numbers[0])} and ${parseInt(numbers[1])}`)
//                     result += parseInt(numbers[0]) * parseInt(numbers[1])
//                 } else {
//                     console.log(`line ${i}, ${match.index}: not multiplying`)
//                 }
//             }
            
//         }
//     }
//     return result
// }

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input2.txt', 2)
solution(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
