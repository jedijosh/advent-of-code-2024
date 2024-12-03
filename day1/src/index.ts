import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day1/data'

const LOGGING = false

export async function solution ( filename : string, partNumber: number) {
    let result: number = 0
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let firstList: Array<number> = []
    let secondList: Array<number> = []
    for (let i = 0; i < fileLines.length; i++) {
        let numbers = fileLines[i].match(/\d+/g)
        let firstNumber = numbers ? parseInt(numbers[0]) : -1
        let secondNumber = numbers ? parseInt(numbers[1]) : -1
        firstList.push(firstNumber)
        secondList.push(secondNumber)
    }
    firstList.sort((a, b) => b - a)
    secondList.sort((a, b) => b - a)
    
    if (partNumber === 1) {
        result = await findDistanceBetweenLists(firstList, secondList)
    } else {
        result = await findSimilarityScoreBetweenLists(firstList, secondList)
    }
    
    return result
}

async function findDistanceBetweenLists(firstList: Array<number>, secondList: Array<number>) {
    let totalDistance: number = 0
    for (let i = 0; i < firstList.length; i++) {
        totalDistance += Math.abs(secondList[i] - firstList[i])
    }
    return totalDistance
}

async function findSimilarityScoreBetweenLists(firstList: Array<number>, secondList: Array<number>) {
    let similarityScore: number = 0
    for (let i = 0; i < firstList.length; i++) {
        let numberOfOccurences = secondList.filter((number) => number === firstList[i]).length
        similarityScore += firstList[i] * numberOfOccurences
    }
    return similarityScore
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input.txt', 2)
solution(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
