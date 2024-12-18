import { solution } from '../src/index'

const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`

describe('test solution', () => {
    it('result should be 12 after 100 seconds with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 100, 11, 7)
        expect(partOneAnswer).toBe(12)
    })

    it('result should be 225810288 after 100 seconds with input data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 100, 101, 103)
        expect(partOneAnswer).toBe(225810288)
    })

    it('result should be 6752 after checking 10403 seconds with input data', async () => {
        let partOneAnswer = await solutionPartTwo(dataFolder + '/input.txt', 100, 101, 103)
        expect(partOneAnswer).toBe(6752)
    })
})
