import { solution } from '../src/index'

const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`

describe('test solution', () => {
    it('result should be 36 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(36)
    })
    
    test('result should be 552 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(552)
    })
    
    test('part 2 result should be 81 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', 2)
        expect(partTwoAnswer).toBe(81)
    })
    
    test('part 2 result should be 1225 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 2)
        expect(partTwoAnswer).toBe(1225)
    })
})
