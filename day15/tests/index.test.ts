import { solution } from '../src/index'

const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`

describe('test solution', () => {
    it('result should be 2028 with small sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt')
        expect(partOneAnswer).toBe(2028)
    })

    it('result should be 10092 with full sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input2.txt')
        expect(partOneAnswer).toBe(10092)
    })

    it('result should be 1406392 with input data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt')
        expect(partOneAnswer).toBe(1406392)
    })

    // it('result should be 6752 after checking 10403 seconds with input data', async () => {
    //     let partOneAnswer = await solutionPartTwo(dataFolder + '/input.txt', 100, 101, 103)
    //     expect(partOneAnswer).toBe(6752)
    // })
})
