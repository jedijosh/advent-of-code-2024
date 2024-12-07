import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day3/data'

describe('test solution', () => {
    it('result should be 161 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(161)
    })
    
    test('result should be 196826776 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(196826776)
    })
    
    test('part 2 result should be 48 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input2.txt', 2)
        expect(partTwoAnswer).toBe(48)
    })
    
    test('part 2 result should be 106780429 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 2)
        expect(partTwoAnswer).toBe(106780429)
    })
})
