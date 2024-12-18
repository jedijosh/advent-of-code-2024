import { parseFileIntoArrayOfLines } from './utils'
const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`

const LOGGING = false

export async function solution ( filename : string, numberOfBlinks: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    // Create a map of what distinct numbers are in the array and how many
    let stoneList: Map<number, number> = new Map()
    let initialStoneList = fileLines[0].matchAll(/\d+/g)

    for (let match of initialStoneList) {
        let entry = stoneList.get(parseInt(match[0]))
        if (entry) {
            stoneList.set(parseInt(match[0]), entry + 1)
        } else {
            stoneList.set(parseInt(match[0]), 1)
        }
    }

    let stoneIterationMap: Map<number, Array<number>> = new Map()
    for (let blinkNumber = 0; blinkNumber < numberOfBlinks; blinkNumber++) {
        let newStoneList: Map<number, number> = new Map()
        for (const [numberOnStone, count] of stoneList) {
            let resultingStones = stoneIterationMap.get(numberOnStone)
            if (!resultingStones) {
                resultingStones = findNextStoneValues(numberOnStone)
                stoneIterationMap.set(numberOnStone, findNextStoneValues(numberOnStone))
            }
            let previousCount = newStoneList.get(resultingStones[0]) || 0
            newStoneList.set(resultingStones[0], previousCount + count)
            
            
            if (resultingStones.length === 2) {
                previousCount = newStoneList.get(resultingStones[1]) || 0
                newStoneList.set(resultingStones[1], previousCount + count)
            }
        }
        stoneList = newStoneList
    }

    let result = 0
    for (const [numberOnStone, count] of stoneList) {
        result += count
    }
    return result
    
}

export function findNextStoneValues (numberOnStone: number) {
    let result: Array<number> = []
    let numberOnStoneString = numberOnStone.toString()
    if (numberOnStone === 0) {
        result.push(1)
    } else if (numberOnStoneString.length % 2 === 0 ) {
        // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. 
        // The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. 
        // (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
        result.push(parseInt(numberOnStoneString.substring(0, numberOnStoneString.length / 2)))
        result.push(parseInt(numberOnStoneString.substring(numberOnStoneString.length / 2)))

    } else {
        // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
        result.push(numberOnStone * 2024)
    }
    return result
}

// solution(dataFolder + '/tests/input.txt', 6)
// solution(dataFolder + '/input.txt', 25)

solution(dataFolder + '/input.txt', 75)
.then(answer => console.log('answer:', answer))
