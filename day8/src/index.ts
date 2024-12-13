import { parseFileIntoArrayOfLines } from './utils'
import { Grid } from '../../classes/grid'
import { Point } from '../../classes/point'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day8/data'

const LOGGING = false

export async function solution ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let grid: Grid = new Grid(fileLines)
    let antinodeLocations = new Map()

    // Build a map by antenna frequency of all antenna locations
    let antennaFrequencyMap: Map<String, Array<Point>> = new Map()
    
    populateAntennaFrequencyMap(grid, antennaFrequencyMap)

    // If Part 2, add antenna location also as an antinode
    // If Part 2, continue finding antenna locations until you are off the map
    let offsetToFirstAntinode
    let findOnlyFirstAntinode = true
    if (partNumber === 1) {
        offsetToFirstAntinode = 1
    } else {
        offsetToFirstAntinode = 0
        findOnlyFirstAntinode = false
    }
    
    // For each antenna frequency, find antinodes for all combinations
    for (const [key, value] of antennaFrequencyMap) {
        for (let i = 0; i < value.length; i++) {
            for (let j = i+1; j < value.length; j++) {
                let xDistance = value[i].column - value[j].column
                let yDistance = value[i].row - value[j].row

                let counter = offsetToFirstAntinode // starts at 1 for part 1 and 0 for part 2
                let antiNode = new Point(value[i].row + (yDistance * counter), value[i].column + (xDistance * counter), '.')
                
                while(await grid.canMoveToLocation(antiNode.row, antiNode.column)) {
                    antinodeLocations.set(antiNode.getCoordinatesAsString(), '')        
                    antiNode = new Point(value[i].row + (yDistance * counter), value[i].column + (xDistance * counter), '.')
                    if (findOnlyFirstAntinode) break
                    counter++
                }


                counter = offsetToFirstAntinode // starts at 1 for part 1 and 0 for part 2
                antiNode = new Point(value[j].row + (yDistance * -1 * counter), value[j].column + (xDistance * -1) * counter, '.')

                while(await grid.canMoveToLocation(antiNode.row, antiNode.column)) {
                    antinodeLocations.set(antiNode.getCoordinatesAsString(), '')
                    antiNode = new Point(value[j].row + (yDistance * -1 * counter), value[j].column + (xDistance * -1) * counter, '.')
                    if (findOnlyFirstAntinode) break
                    counter++
                }



                // let xDistance = value[i].column - value[j].column
                // let yDistance = value[i].row - value[j].row
                // // console.log(`x distance: ${xDistance}, y distance ${yDistance}`)

                // let antiNode = new Point(value[i].row + yDistance, value[i].column + xDistance, '.')
                // if(await grid.canMoveToLocation(antiNode.row, antiNode.column)) {
                //     antinodeLocations.set(antiNode.getCoordinatesAsString(), '')
                //     // console.log('antiNode: ', antiNode)
                // }
                
                // antiNode = new Point(value[j].row + (yDistance * -1), value[j].column + (xDistance * -1), '.')
                // if(await grid.canMoveToLocation(antiNode.row, antiNode.column)) {
                //     antinodeLocations.set(antiNode.getCoordinatesAsString(), '')
                //     // console.log('antiNode: ', antiNode)
                // }   
            }
        }
    }
    
    return antinodeLocations.size
}

// export async function solutionPartTwo ( filename : string) {
//     let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
//     let grid: Grid = new Grid(fileLines)
//     let antinodeLocations = new Map()

//     // Build a map by antenna frequency of all antenna locations
//     let antennaFrequencyMap: Map<String, Array<Point>> = new Map()
    
//     populateAntennaFrequencyMap(grid, antennaFrequencyMap)

//     // For each antenna frequency, find antinodes for all combinations
//     for (const [key, value] of antennaFrequencyMap) {
//         // console.log('# frequency Locations', value.length)
//         for (let i = 0; i < value.length; i++) {
//             for (let j = i+1; j < value.length; j++) {
//                 let antiNode = new Point(value[i].row, value[i].column, '.')
//                 let counter = 1
                
//                 let xDistance = value[i].column - value[j].column
//                 let yDistance = value[i].row - value[j].row
//                 while(await grid.canMoveToLocation(antiNode.row, antiNode.column)) {
//                     antinodeLocations.set(antiNode.getCoordinatesAsString(), '')        
//                     // console.log(`x distance: ${xDistance}, y distance ${yDistance}`)
//                     antiNode = new Point(value[i].row + (yDistance * counter), value[i].column + (xDistance * counter), '.')
//                     counter++
//                 }
                   
//                 counter = 1
//                 antiNode = new Point(value[j].row, value[j].column, '.')
//                 while(await grid.canMoveToLocation(antiNode.row, antiNode.column)) {
//                     antinodeLocations.set(antiNode.getCoordinatesAsString(), '')
//                     antiNode = new Point(value[j].row + (yDistance * -1 * counter), value[j].column + (xDistance * -1) * counter, '.')
//                     counter++
//                 }
//             }
//         }
//     }
    
//     return antinodeLocations.size
// }

export function populateAntennaFrequencyMap (grid: Grid, antennaFrequencyMap: Map<String, Array<Point>> ) {
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            if (grid.gridPoints[row][column].value !== '.') {
                let antennaFrequency: String = grid.gridPoints[row][column].value
                let currentLocationsForFrequency = antennaFrequencyMap.get(antennaFrequency) || []
                let newPoint = new Point(row, column, antennaFrequency)
                currentLocationsForFrequency.push(newPoint)
                antennaFrequencyMap.set(antennaFrequency, currentLocationsForFrequency)
            }
        }
    }
}

// Finds all combinations given the input values.  Input values cannot repeat in the result.
export async function findCombinations(availableValues: Array<Point>, outputArrayLength: number) {
    let permutations: Array<Array<Point>> = []
    
    const permute = async (availableValues: Array<Point>, outputArray: Array<Point>) => {
        if (outputArray.length === outputArrayLength) {
            permutations.push(outputArray)
            return
        } 
        for (let i = 0; i < availableValues.length; i++) {
            await permute(availableValues.splice(i, 1), outputArray.concat(availableValues[i]))
        }   
    }
    await permute(availableValues, [])
    return permutations
}


solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/tests/input2.txt')
// solution(dataFolder + '/input.txt')

// solution(dataFolder + '/tests/input.txt', 2) // Should be 34
// solutionPartTwo(dataFolder + '/tests/input.txt') // Should be 34
// solutionPartTwo(dataFolder + '/tests/input3.txt') // Should be 9
// solutionPartTwo(dataFolder + '/input.txt')

// let pointArray = [new Point(0, 0, 'A'), new Point(1, 1, 'A'), new Point(2, 2, 'A')]
// findCombinations(pointArray, 2)
    .then(answer => console.log('answer:', answer))
