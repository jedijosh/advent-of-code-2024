import { solution } from '../src/index'

const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`

describe('test solution', () => {
    it('result should be 22 after blinking six time with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 6)
        expect(partOneAnswer).toBe(22)
    })

    it('result should be 55312 after blinking 25 times with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 25)
        expect(partOneAnswer).toBe(55312)
    })
    
    test('result should be 207683 after blinking 25 times with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 25)
        expect(partOneAnswer).toBe(207683)
    })

    test('result should be 244782991106220 after blinking 75 times with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 75)
        expect(partOneAnswer).toBe(244782991106220)
    })
})
