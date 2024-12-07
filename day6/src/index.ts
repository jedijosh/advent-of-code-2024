import { parseFileIntoArrayOfLines } from './utils'
import { Grid } from '../../classes/grid'
import { Point } from '../../classes/point'
import { Vector } from '../../classes/Vector'
import path from 'path'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day6/data'

const LOGGING = false

export async function solution ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let grid: Grid = new Grid(fileLines)
    let pointsVisited = new Map()
    let direction = 'U'

    // Find where the guard starts
    let currentPoint: Point = new Point(0, 0, '^')
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            if (grid.gridPoints[row][column].value === '^') {
                currentPoint = grid.gridPoints[row][column]
                break
            }
        }
    }

    while(1 === 1) {
        // console.log(`current point: (${currentPoint.row}, ${currentPoint.column}), path length: ${pointsVisited.size}`)
        let nextPoint: Point
        try {
            nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
        } catch {
            break
        }
        
        // console.log(`next point: (${nextPoint.row}, ${nextPoint.column}), path length: ${pointsVisited.size}`)
        // Check if the next point is still on the grid.
        if (await grid.canMoveToLocation(nextPoint.row, nextPoint.column)) {
            
            // If the next point would be an obstacle, rotate 90 degrees right and move that direction.
            while (nextPoint.value === '#') {
                direction = await rotate90Degrees(direction)
                nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
            }
            currentPoint = nextPoint
            pointsVisited.set(currentPoint, 1)
        } else {
            break
        }
    }
    return pointsVisited.size
}

export async function solutionPartTwo ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let grid: Grid = new Grid(fileLines)
    let pointsVisited: Map<string, Array<string>> = new Map()
    let obstacleLocations = new Map()
    let direction = 'U'

    // Find where the guard starts
    let currentPoint: Point = new Point(0, 0, '^')
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            if (grid.gridPoints[row][column].value === '^') {
                currentPoint = grid.gridPoints[row][column]
                break
            }
        }
    }
    let startingPoint = currentPoint

    while(1 === 1) {
        // Find the next location.
        if (LOGGING) console.log('*****************************')
        if (LOGGING) console.log(`current point: (${currentPoint.row}, ${currentPoint.column}), direction: ${direction}, path length: ${pointsVisited.size}`)
        let nextPoint: Point
        try {
            nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
            if (LOGGING) console.log(`next point: (${nextPoint.row}, ${nextPoint.column}), value: ${nextPoint.value}, path length: ${pointsVisited.size}`)
        } catch {
            // If getNextLocation throws an error, we've reached the end of the grid.
            break
        }

        // If that location is not already an obstacle, change it to one.
        // If the next point would be an obstacle, rotate 90 degrees right and move that direction.
        while (nextPoint.value === '#') {
            direction = await rotate90Degrees(direction)
            nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
        }

        if (LOGGING) console.log(`next point: (${nextPoint.row}, ${nextPoint.column}), value: ${nextPoint.value}, path length: ${pointsVisited.size}`)
        // Continue traversing the path until you reach the end or find a loop.
        // if (!(startingPoint.row === nextPoint.row && startingPoint.column === nextPoint.column))

        let obstacleAtNextPointResultsInLoop: boolean = await findLoopOrExit(currentPoint, nextPoint, direction, pointsVisited, fileLines)
        if (obstacleAtNextPointResultsInLoop && !(startingPoint.row === nextPoint.row && startingPoint.column === nextPoint.column)) {
            obstacleLocations.set(convertPointToString(nextPoint), 1)
        }
        currentPoint = nextPoint
        let key = convertPointToString(currentPoint)
        let directionsTraveled = pointsVisited.get(key) || []
        directionsTraveled.push(direction)
        pointsVisited.set(key, directionsTraveled)

    }
    console.log('obstacle locations', obstacleLocations)
    return obstacleLocations.size
}

async function findAllPointsVisited ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let grid: Grid = new Grid(fileLines)
    let pointsVisited = new Map()
    let direction = 'U'

    // Find where the guard starts
    let currentPoint: Point = new Point(0, 0, '^')
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            if (grid.gridPoints[row][column].value === '^') {
                currentPoint = grid.gridPoints[row][column]
                break
            }
        }
    }

    while(1 === 1) {
        // console.log(`current point: (${currentPoint.row}, ${currentPoint.column}), path length: ${pointsVisited.size}`)
        let nextPoint: Point
        try {
            nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
        } catch {
            break
        }
        
        // console.log(`next point: (${nextPoint.row}, ${nextPoint.column}), path length: ${pointsVisited.size}`)
        // Check if the next point is still on the grid.
        if (await grid.canMoveToLocation(nextPoint.row, nextPoint.column)) {
            
            // If the next point would be an obstacle, rotate 90 degrees right and move that direction.
            while (nextPoint.value === '#') {
                direction = await rotate90Degrees(direction)
                nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
            }
            currentPoint = nextPoint
            pointsVisited.set(currentPoint, 1)
        } else {
            break
        }
    }
    return pointsVisited
}

async function doesLoopExistUsingPartOne ( filename : string, obstacleLocation: Point) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let grid: Grid = new Grid(fileLines)
    
    let pointsVisited = new Map()
    let direction = 'U'

    // Find where the guard starts
    let currentPoint: Point = new Point(0, 0, '^')
    for (let row = 0; row < grid.numberOfRows; row++) {
        for (let column = 0; column < grid.numberOfColumns; column++) {
            if (grid.gridPoints[row][column].value === '^') {
                currentPoint = grid.gridPoints[row][column]
                break
            }
        }
    }

    // Need to make sure we're not placing an obstacle at the starting position
    if (obstacleLocation.row === currentPoint.row && obstacleLocation.column === currentPoint.column) {
        return false
    }
    grid.gridPoints[obstacleLocation.row][obstacleLocation.column].value = '#'

    while(1 === 1) {
        // console.log(`current point: (${currentPoint.row}, ${currentPoint.column}), path length: ${pointsVisited.size}`)
        let nextPoint: Point
        try {
            nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
        } catch {
            break
        }
        
        // console.log(`next point: (${nextPoint.row}, ${nextPoint.column}), path length: ${pointsVisited.size}`)
        // Check if the next point is still on the grid.
        if (await grid.canMoveToLocation(nextPoint.row, nextPoint.column)) {
            
            // If the next point would be an obstacle, rotate 90 degrees right and move that direction.
            while (nextPoint.value === '#') {
                direction = await rotate90Degrees(direction)
                nextPoint = await grid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, direction))
            }
            currentPoint = nextPoint
            let directionsTraveled = pointsVisited.get(nextPoint) || []
            if (directionsTraveled.includes(direction)) {
                return true
            }
            directionsTraveled.push(direction)
            pointsVisited.set(currentPoint, directionsTraveled)
        } else {
            break
        }
    }
    return false
}

export async function partTwoSolutionTakeThree ( filename : string) {
    let placesToTryObstacles = await findAllPointsVisited(filename, 2)
    let obstacleLocations: Map<Point, number> = new Map()
    let counter: number = 0
    for (const key of placesToTryObstacles) {
        let loopExists: boolean = await doesLoopExistUsingPartOne(filename, key[0])
        if (loopExists) obstacleLocations.set(key[0], 1)
        counter++
    }
    return obstacleLocations.size
}

function convertPointToString (point: Point) {
    return '(' + point.row.toString() + ', ' + point.column.toString() + ')'
}

export async function findLoopOrExit ( startingPoint: Point, pointToChangeToObstacle: Point, direction: string, pointsVisited: Map<string, Array<string>>, fileLines: Array<String>) {
    if (LOGGING) console.log('in function')
    let resultsInLoop = false

    // Copy all values so originals aren't changed
    let currentPoint = new Point(startingPoint.row, startingPoint.column, '1')
    let visitedList: Map<string, Array<string>> = new Map()
    let funcDirection = `${direction}`
    let modifiedGrid: Grid = new Grid(fileLines)
    modifiedGrid.gridPoints[pointToChangeToObstacle.row][pointToChangeToObstacle.column].value = '#'
    // console.log('modifiedGrid')
    // modifiedGrid.gridPoints.forEach(row => {
    //     let rowString = ''
    //     row.forEach(point => {
    //         rowString += point.value
    //     })
    //     console.log(rowString)
    // })

    if (LOGGING) console.log(`current point: (${currentPoint.row}, ${currentPoint.column}), direction: ${funcDirection}, path length: ${visitedList.size}`)
    while(1 === 1) {
        // console.log('******************************')
        let nextPoint: Point
        // nextPoint = new Point(pointToChangeToObstacle.row, pointToChangeToObstacle.column, '1')
        try {
            nextPoint = await modifiedGrid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, funcDirection))
            if (LOGGING) console.log(`next point: (${nextPoint.row}, ${nextPoint.column}), value: ${nextPoint.value}, path length: ${visitedList.size}`)
        } catch {
            break
        }
        
        // Check if the next point is still on the grid.
        // if (await funcGrid.canMoveToLocation(nextPoint.row, nextPoint.column)) {
            
            // If the next point would be an obstacle, rotate 90 degrees right and move that direction.
            while (nextPoint.value === '#') {
                funcDirection = await rotate90Degrees(funcDirection)
                nextPoint = await modifiedGrid.getNextLocation(currentPoint.row, currentPoint.column, new Vector(1, funcDirection))
            }
            if (LOGGING) console.log(`final next point: (${nextPoint.row}, ${nextPoint.column}), value: ${nextPoint.value}, direction: ${funcDirection}, path length: ${visitedList.size}`)
            currentPoint = nextPoint
            // console.log('visitedList', visitedList)
            let key = convertPointToString(nextPoint)
            let directionsTraveled: Array<string> = visitedList.get(key) || []
            
            // If the nextPoint has been visited going the same direction, we are in a loop.
            if (directionsTraveled.includes(funcDirection)) {
                if (LOGGING) console.log('loop detected', funcDirection, directionsTraveled)
                console.log('visitedList', visitedList)
                resultsInLoop = true
                break
            }
            directionsTraveled.push(funcDirection)
            visitedList.set(key, directionsTraveled)
        // } else {
        //     break
        // }
    }
    return resultsInLoop
}

async function rotate90Degrees (direction: string) {
    switch (direction) {
        case 'U':
            return 'R'
        case 'R':
            return 'D'
        case 'D':
            return 'L'
        case 'L':
            return 'U'
        default:
            throw new Error('Invalid direction')
    }
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// These weren't working
// solutionPartTwo(dataFolder + '/tests/input.txt', 2)
// solutionPartTwo(dataFolder + '/input.txt', 2)

// partTwoSolutionTakeThree(dataFolder + '/tests/input.txt')
partTwoSolutionTakeThree(dataFolder + '/input.txt')
    .then(answer => console.log('answer:', answer))

// Obstacles to place based on example:
// 6, 3
// 7, 6
// 7, 7
// 8, 1
// 8, 3
// 9, 7