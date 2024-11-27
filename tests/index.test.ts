import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day1/data'

describe('test solution', () => {
    it('result should be 1 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(1)
    })
    
    test('result should be 1 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(1)
    })
    
    test('part 2 result should be 1 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', 3)
        expect(partTwoAnswer).toBe(1)
    })
    
    test('part 2 result should be 1 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 3)
        expect(partTwoAnswer).toBe(1)
    })
})
