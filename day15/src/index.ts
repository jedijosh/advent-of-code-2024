import { parseFileIntoArrayOfLines } from './utils'
const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`
import { Grid } from '../../classes/grid'
import { Point } from '../../classes/point'
import { Vector } from '../../classes/Vector'
const blessed = require('blessed')

const LOGGING = false
const VISUALIZE = true

export async function solution ( filename : string) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let gridLines: Array<String> = []
    let index: number = 0
    while (fileLines[index].length !== 0) {
        gridLines.push(fileLines[index])
        index++
    }

    let screen, box
    if (VISUALIZE) {
        screen = blessed.screen({
            smartCSR: true
        })
        
        screen.title = dayNumber

        box = blessed.box({
            top: 'center',
            left: 'center',
            width: '905',
            height: '95%',
            content: '',
            tags: true,
            border: {
            type: 'line'
            },
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: '#f0f0f0'
                }
            },
            scrollable: true,
            scrollbar: {
                style: {
                    bg: 'yellow'
                }
            },
            keys: true
        })

        // Append our box to the screen.
        screen.append(box)

        // Quit on Escape, q, or Control-C.
        screen.key(['escape', 'q', 'C-c'], function() {
            return process.exit(0);
        })

        screen.render()
    }

    let grid: Grid = new Grid(gridLines)
    // Find where the guard starts
    let currentPoint: Point = new Point(0, 0, '^')
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            if (grid.gridPoints[row][column].value === '@') {
                currentPoint = grid.gridPoints[row][column]
                break
            }
        }
    }

    grid.canMoveToLocation = async function (newRowNumber: number, newColumnNumber: number) {
        // Needs to be a recursive function which checks if the current location can move in the direction indicated by the vector.  
        // Keep checking until a wall (#) is encountered
        if (newRowNumber < 0 || newRowNumber >= this.numberOfRows) return false
        if (newColumnNumber < 0 || newColumnNumber >= this.numberOfColumns) return false
        return true
    }

    let moveCounter: number = 1
    let moveString: string = ''
    for (let lineNumber = index + 1; lineNumber < fileLines.length; lineNumber++) {
        moveString += fileLines[lineNumber]
    }
        for(let moveIndex = 0; moveIndex < moveString.length; moveIndex++) {
            let move: String = moveString[moveIndex]
            let vector
            switch (move) {
                case '^':
                    vector = new Vector(1, 'U')
                    break
                case 'v':
                    vector = new Vector(1, 'D')
                    break
                case '<':
                    vector = new Vector(1, 'L')
                    break
                case '>':
                    vector = new Vector(1, 'R')
                    break
                default:
                    throw new Error('Invalid move')
            }
            if (await moveToLocation(currentPoint, vector, grid)) {
                currentPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, vector)
            }
            // await printGrid(grid)
            if (VISUALIZE) {
                box.setContent(`Move ${moveCounter} of ${moveString.length}\n${await gridToSingleString(grid)}`)
                screen.render()
                await delay(10)
            }
            moveCounter++
        }
    

    let result: number = 0
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            if (grid.gridPoints[row][column].value === 'O') result += ((100 * row) + column)
        }
    }
    return result
}

function delay(milliseconds: number){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
}

async function moveToLocation (currentPoint: Point, vector: Vector, grid: Grid) {
    // Returns true if move was successful, false if move was not successful
    // console.log('next movement')
    let nextPoint: Point 
    try {
        nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, vector)
        // console.log(`trying to move ${currentPoint.value} from ${currentPoint.row},${currentPoint.column} to ${nextPoint.row},${nextPoint.column}`)
        if (nextPoint.value === '#') {
            // console.log(`${nextPoint.value} matches #, returning false`)
            return false
        } else if (nextPoint.value === '.') {
            // console.log(`found ., moving ${currentPoint.value} from ${currentPoint.row},${currentPoint.column} to ${nextPoint.row},${nextPoint.column}`)
            // console.log('currentPoint before', currentPoint.value)
            // console.log('nextPoint before', nextPoint.value)
            grid.gridPoints[nextPoint.row][nextPoint.column].value = currentPoint.value
            grid.gridPoints[currentPoint.row][currentPoint.column].value = '.'
            // console.log('currentPoint after', currentPoint.value)
            // console.log('nextPoint after', nextPoint.value)
            return true
        } else {
            if (await moveToLocation(nextPoint, vector, grid)) {
                // console.log(`next location was able to move, moving ${currentPoint.value} from ${currentPoint.row},${currentPoint.column} to ${nextPoint.row},${nextPoint.column}`)
                // console.log('currentPoint before', currentPoint.value)
                // console.log('nextPoint before', nextPoint.value)
                grid.gridPoints[nextPoint.row][nextPoint.column].value = currentPoint.value
                grid.gridPoints[currentPoint.row][currentPoint.column].value = '.'
                // console.log('currentPoint after', currentPoint.value)
                // console.log('nextPoint after', nextPoint.value)
                return true
            } else {
                return false
            }
        }
    } catch (e) {
        console.log('error:', e)
        throw new Error('Error moving to location')
    }
}

async function printGrid(grid: Grid) {
    for (let row = 0; row < grid.numberOfRows; row++) {
        let line: string = ''
        for (let column = 0; column < grid.numberOfColumns; column++) {
            line += grid.gridPoints[row][column].value.toString()
        }
        console.log(line)
    }
}

async function gridToSingleString(grid: Grid) {
    let line: string = ''
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            line += grid.gridPoints[row][column].value.toString()
        }
        line += '\n'
    }
    return line
}

// solution(dataFolder + '/tests/input.txt')
// solution(dataFolder + '/tests/input2.txt')
solution(dataFolder + '/input.txt')

// solution(dataFolder + '/input.txt', 10403, 101, 103)
.then(answer => console.log('answer:', answer))
