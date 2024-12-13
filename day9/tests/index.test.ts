import { solution } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day9/data'

describe('test solution', () => {
    it('result should be 1928 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', 1)
        expect(partOneAnswer).toBe(1928)
    })
    
    test('result should be 6330095022244 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', 1)
        expect(partOneAnswer).toBe(6330095022244)
    })
    
    test('part 2 result should be 2858 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', 2)
        expect(partTwoAnswer).toBe(2858)
    })
    
    test('part 2 result should be 6359491814941 with my data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/input.txt', 2)
        expect(partTwoAnswer).toBe(6359491814941)
    })
})
