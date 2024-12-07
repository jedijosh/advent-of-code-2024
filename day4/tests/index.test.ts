import { solution, solutionPartTwo } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day4/data'

describe('test solution', () => {
    it('result should be 18 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt')
        expect(partOneAnswer).toBe(18)
    })
    
    test('result should be 2603 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt')
        expect(partOneAnswer).toBe(2603)
    })
    
    test('part 2 result should be 9 with sample data', async () => {
        let partTwoAnswer = await solutionPartTwo(dataFolder + '/tests/input.txt', 2)
        expect(partTwoAnswer).toBe(9)
    })
    
    test('part 2 result should be 1965 with my data', async () => {
        let partTwoAnswer = await solutionPartTwo(dataFolder + '/input.txt', 2)
        expect(partTwoAnswer).toBe(1965)
    })
})
