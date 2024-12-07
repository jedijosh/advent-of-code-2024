import { solution, partTwoSolutionTakeThree } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day6/data'

describe('test solution', () => {
    it('result should be 41 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(41)
    })
    
    test('result should be 5409 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(5409)
    })
    
    test('part 2 result should be 123 with sample data', async () => {
        let partTwoAnswer = await partTwoSolutionTakeThree(dataFolder + '/tests/input.txt')
        expect(partTwoAnswer).toBe(123)
    })
    
    test('part 2 result should be 2022 with my data', async () => {
        let partTwoAnswer = await partTwoSolutionTakeThree(dataFolder + '/input.txt')
        expect(partTwoAnswer).toBe(2022)
    })
})
