import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day4/data'

const LOGGING = false

export async function solution ( filename : string) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let result: number = 0
    let xmasForward = /XMAS/g
    let xmasBackward = /SAMX/g
    let columns: Array<string> = []

    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {    
        // Check if XMAS is forward (going right)
        let forwardResults = fileLines[lineNumber].matchAll(xmasForward)
        let forwardResultsArray = Array.from(forwardResults)
        result += forwardResultsArray.length
        if (LOGGING) console.log(`number of matches in row ${lineNumber} and going forwards ${forwardResultsArray.length} `)
        // Check if XMAS is backwards (going left)
        let backwardResults = fileLines[lineNumber].matchAll(xmasBackward)
        let backwardResultsArray = Array.from(backwardResults)
        result += backwardResultsArray.length
        if (LOGGING) console.log(`number of matches in row ${lineNumber} and going backwards ${backwardResultsArray.length} `)

        
        for (let letterPosition = 0; letterPosition < fileLines[lineNumber].length; letterPosition++) {
            // Translate rows to columns
            columns[letterPosition] = columns[letterPosition] ? columns[letterPosition] + fileLines[lineNumber][letterPosition] : fileLines[lineNumber][letterPosition]

            // Check if the letter is 'X' which can be a start
            if (fileLines[lineNumber][letterPosition] === 'X') {
                // Check if XMAS is diagonal going up and backwards
                if (lineNumber - 3 < 0 || letterPosition - 3 < 0) {
                    // Do nothing as there are not 3 characters before hitting out of bounds
                } else {
                    let XMAS = fileLines[lineNumber][letterPosition] + fileLines[lineNumber - 1][letterPosition - 1] + fileLines[lineNumber - 2][letterPosition - 2] + fileLines[lineNumber - 3][letterPosition - 3]
                    if (XMAS === 'XMAS') {
                        if (LOGGING) console.log(`match found starting on lineNumber ${lineNumber}, position ${letterPosition} going diagonally up and backwards`)
                        result += 1
                    }
                }
                // Check if XMAS is diagonal going up and forwards
                if (lineNumber - 3 < 0 || letterPosition + 3 >= fileLines[lineNumber].length) {
                    // Do nothing as there are not 3 characters before hitting out of bounds
                } else {
                    let XMAS = fileLines[lineNumber][letterPosition] + fileLines[lineNumber - 1][letterPosition + 1] + fileLines[lineNumber - 2][letterPosition + 2] + fileLines[lineNumber - 3][letterPosition + 3]
                    if (XMAS === 'XMAS') {
                        if (LOGGING) console.log(`match found starting on lineNumber ${lineNumber}, position ${letterPosition} going diagonally up and forwards`)
                        result += 1
                    }
                }
                // Check if XMAS is diagonal going down and backwards
                if (lineNumber + 3 >= fileLines.length || letterPosition - 3 < 0) {
                    // Do nothing as there are not 3 characters before hitting out of bounds
                } else {
                    let XMAS = fileLines[lineNumber][letterPosition] + fileLines[lineNumber + 1][letterPosition - 1] + fileLines[lineNumber + 2][letterPosition - 2] + fileLines[lineNumber + 3][letterPosition - 3]
                    if (XMAS === 'XMAS') {
                        if (LOGGING) console.log(`match found starting on lineNumber ${lineNumber}, position ${letterPosition} going diagonally down and backwards`)
                        result += 1
                    }
                }
                // Check if XMAS is diagonal going down and forwards
                if (lineNumber + 3 >= fileLines.length || letterPosition + 3 >= fileLines[lineNumber].length) {
                    // Do nothing as there are not 3 characters before hitting out of bounds
                } else {
                    let XMAS = fileLines[lineNumber][letterPosition] + fileLines[lineNumber + 1][letterPosition + 1] + fileLines[lineNumber + 2][letterPosition + 2] + fileLines[lineNumber + 3][letterPosition + 3]
                    if (XMAS === 'XMAS') {
                        if (LOGGING) console.log(`match found starting on lineNumber ${lineNumber}, position ${letterPosition} going diagonally down and forwards`)
                        result += 1
                    }
                }
            }
        }
    }

    for (let i = 0; i < columns.length; i++) {  
        // Check if XMAS is going up
        let upResults = columns[i].matchAll(xmasBackward)
        let upResultArray = Array.from(upResults)
        result += upResultArray.length
        if (LOGGING) console.log(`number of matches in column ${i} and going up ${upResultArray.length} `)
        
        // Check if XMAS is going down
        let downResults = columns[i].matchAll(xmasForward)
        let downResultArray = Array.from(downResults)
        result += downResultArray.length
        if (LOGGING) console.log(`number of matches in column ${i} and going down ${downResultArray.length} `)
        
        
    }
    // Transform rows to columns

    return result
}

export async function solutionPartTwo ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let result: number = 0

    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {    
        for (let letterPosition = 0; letterPosition < fileLines[lineNumber].length; letterPosition++) {
            // Check if the letter is 'A' which can be a start
            if (fileLines[lineNumber][letterPosition] === 'A') {
                if (lineNumber - 1 < 0 || lineNumber + 1 === fileLines.length || letterPosition - 1 < 0 || letterPosition + 1 === fileLines[lineNumber].length) {
                    // Do nothing as there are not more characters before hitting out of bounds
                } else {
                    let firstDiagonal = fileLines[lineNumber - 1][letterPosition - 1] + fileLines[lineNumber][letterPosition] + fileLines[lineNumber + 1][letterPosition + 1]                    
                    let secondDiagonal = fileLines[lineNumber + 1][letterPosition - 1] + fileLines[lineNumber][letterPosition] + fileLines[lineNumber - 1][letterPosition + 1]
                    if ((firstDiagonal === 'MAS' || firstDiagonal === 'SAM') && (secondDiagonal === 'MAS' || secondDiagonal === 'SAM')) {
                        if (LOGGING) console.log(`match found starting on lineNumber ${lineNumber}, position ${letterPosition}`)
                        result += 1
                    }
                }
            }
        }
    }

    return result
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solutionPartTwo(dataFolder + '/tests/input.txt', 2)
solutionPartTwo(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
