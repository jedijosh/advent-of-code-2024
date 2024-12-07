import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day5/data'

describe('test solution', () => {
    it('result should be 143 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(143)
    })
    
    test('result should be 4872 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(4872)
    })
    
    test('part 2 result should be 123 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', 2)
        expect(partTwoAnswer).toBe(123)
    })
    
    test('part 2 result should be 5564 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 2)
        expect(partTwoAnswer).toBe(5564)
    })
})
