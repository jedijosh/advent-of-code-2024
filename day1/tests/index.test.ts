import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day1/data'

describe('test solution', () => {
    it('result should be 11 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(11)
    })
    
    test('result should be 1873376 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(1873376)
    })
    
    test('part 2 result should be 31 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', 2)
        expect(partTwoAnswer).toBe(31)
    })
    
    test('part 2 result should be 18997088 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 2)
        expect(partTwoAnswer).toBe(18997088)
    })
})
