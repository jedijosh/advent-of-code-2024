import { solution, findPermutations } from '../src/index'

const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day7/data'
const OPERATORS_PART_ONE = ['+', '*']
const OPERATORS_PART_TWO = ['+', '*', '||']

describe('test solution', () => {
    // it('result should be 41 with sample data', async () => {
    //     let answer = await findPermutations(['+', '*'], 1)
    //     let resultArray = [ ['+'], ['*']]
    //     expect(answer).toBe(resultArray)
    // })

    it('result should be 3749 with sample data', async () => {
        let partOneAnswer = await solution(dataFolder + '/tests/input.txt', OPERATORS_PART_ONE)
        expect(partOneAnswer).toBe(3749)
    })
    
    test('result should be 1611660863222 with my data', async () => {
        let partOneAnswer = await solution(dataFolder + '/input.txt', OPERATORS_PART_ONE)
        expect(partOneAnswer).toBe(1611660863222)
    })
    
    test('part 2 result should be 11387 with sample data', async () => {
        let partTwoAnswer = await solution(dataFolder + '/tests/input.txt', OPERATORS_PART_TWO)
        expect(partTwoAnswer).toBe(11387)
    })
    
    // test('part 2 result should be 945341732469724 with my data', async () => {
    //     let partTwoAnswer = await solution(dataFolder + '/input.txt', OPERATORS_PART_TWO)
    //     expect(partTwoAnswer).toBe(945341732469724)
    // })
})
