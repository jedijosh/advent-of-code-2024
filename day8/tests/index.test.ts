import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day8/data'

describe('test solution', () => {
    it('result should be 14 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(14)
    })
    
    test('result should be 329 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(329)
    })
    
    test('part 2 result should be 34 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', 2)
        expect(partTwoAnswer).toBe(34)
    })

    test('part 2 result should be 9 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input3.txt', 2)
        expect(partTwoAnswer).toBe(9)
    })
    
    test('part 2 result should be 1190 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 2)
        expect(partTwoAnswer).toBe(1190)
    })
})
