import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day2/data'

const LOGGING = true

export async function solution ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let result: number = fileLines.length
    for (let i = 0; i < fileLines.length; i++) {       
        // Find all the numbers in the line
        let numbers = fileLines[i].match(/\d+/g)

        if (!numbers) break
        let unsafeReportLocation = await findUnsafeReportLocation(numbers)
        if (partNumber === 1) {
            if (unsafeReportLocation !== -1) result--
        } else {
            if (unsafeReportLocation !== -1) {
                // Try skipping each index to see if that makes the report safe
                for (let j = 0; j < numbers.length; j++) {
                    unsafeReportLocation = await findUnsafeReportLocation(numbers, j)
                    if (unsafeReportLocation === -1) break
                    if (j === numbers.length - 1) result--
                }                
            }
        }
    }
    return result
}

async function findUnsafeReportLocation(report: Array<string>, indexToSkip: number = -1) {
    // console.log(`skipping ${indexToSkip} and checking:`, report)
    let arrayToCheck : Array<number> = []
    // Make a copy of the array so the index to skip can be removed.
    for (let i = 0; i < report.length; i++) {
        arrayToCheck.push(parseInt(report[i]))
    }
    if (indexToSkip !== -1) arrayToCheck.splice(indexToSkip, 1)
    let isAscending = arrayToCheck[0] < arrayToCheck[1] ? true : false
    let location = -1
    let isSafe: boolean = true
    for (let i = 0; i < arrayToCheck.length - 1; i++) {
        let firstNumber: number = arrayToCheck[i]
        let secondNumber: number = arrayToCheck[i+1]
        if (isAscending && firstNumber > secondNumber) isSafe = false
        if (!isAscending && firstNumber < secondNumber) isSafe = false
        if ((Math.abs(secondNumber - firstNumber) < 1) || (Math.abs(secondNumber - firstNumber) > 3)) isSafe = false
        if (!isSafe) {
            location = i
            break
        }
    }
    return location
}


// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input.txt', 2)
solution(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
