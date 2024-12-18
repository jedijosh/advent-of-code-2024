import { parseFileIntoArrayOfLines } from './utils'
const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`
const fs = require('fs')
const blessed = require('blessed')

const LOGGING = false
const VISUALIZE = true

class Robot {
    row: number
    column: number
    xVelocity: number
    yVelocity: number
    constructor(row: number, column: number, xVelocity: number, yVelocity: number) {
        this.row = row
        this.column = column
        this.xVelocity = xVelocity
        this.yVelocity = yVelocity
    }

    findLocationAtTime (numberOfElapsedSeconds: number, gridWidth: number, gridHeight: number) {
        let newRow = this.row + (this.yVelocity * numberOfElapsedSeconds)
        if (newRow >= gridHeight) newRow = newRow % gridHeight
        if (newRow < 0) {
            while (newRow < 0) newRow = newRow + gridHeight
        }

        let newColumn = this.column + (this.xVelocity * numberOfElapsedSeconds)
        if (newColumn >= gridWidth) newColumn = newColumn % gridWidth
        if (newColumn < 0) {
            while (newColumn < 0) newColumn = newColumn + gridWidth
        }
        return {
            row: newRow, 
            column: newColumn
        }
    }
}

export async function solution ( filename : string, numberOfSeconds: number, gridWidth: number, gridHeight: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let robotList: Array<Robot> = []

    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let splitLine = fileLines[lineNumber].split(' ')
        let startingPosition = splitLine[0].split('=')[1] 
        let velocities = splitLine[1].split('=')[1]
        robotList.push(new Robot(
            parseInt(startingPosition.split(',')[1]), 
            parseInt(startingPosition.split(',')[0]), 
            parseInt(velocities.split(',')[0]),
            parseInt(velocities.split(',')[1])
        ))
    }

    let newRobotList: Array<Robot> = []
    for (let robot of robotList) {
        let newRobot = new Robot(
            robot.findLocationAtTime(numberOfSeconds, gridWidth, gridHeight).row,
            robot.findLocationAtTime(numberOfSeconds, gridWidth, gridHeight).column,
            robot.xVelocity,
            robot.yVelocity
        )
        newRobotList.push(newRobot)
    }
    robotList = newRobotList

    let quadrantOneRobots: number = 0
    let quadrantTwoRobots: number = 0
    let quadrantThreeRobots: number = 0
    let quadrantFourRobots: number = 0
    let middleRow = Math.floor(gridHeight / 2)
    let middleColumn = Math.floor(gridWidth / 2)
    for (let robot of robotList) {
        if (robot.row < middleRow && robot.column < middleColumn) quadrantOneRobots++
        if (robot.row < middleRow && robot.column > middleColumn) quadrantTwoRobots++
        if (robot.row > middleRow && robot.column < middleColumn) quadrantThreeRobots++
        if (robot.row > middleRow && robot.column > middleColumn) quadrantFourRobots++
    }
    
    let result = quadrantOneRobots * quadrantTwoRobots * quadrantThreeRobots * quadrantFourRobots

    return result
    
}

export async function solutionPartTwo ( filename : string, numberOfSeconds: number, gridWidth: number, gridHeight: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let robotList: Array<Robot> = []

    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        let splitLine = fileLines[lineNumber].split(' ')
        let startingPosition = splitLine[0].split('=')[1] 
        let velocities = splitLine[1].split('=')[1]
        robotList.push(new Robot(
            parseInt(startingPosition.split(',')[1]), 
            parseInt(startingPosition.split(',')[0]), 
            parseInt(velocities.split(',')[0]),
            parseInt(velocities.split(',')[1])
        ))
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
            width: '95%',
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

    let minimumSafetyFactor
    let timeForMinSafetyFactor
    for (let second = 0; second < numberOfSeconds; second++) {
        let newRobotList: Array<Robot> = []
        // Find robot's new location at the current second
        for (let robot of robotList) {
            let locationAtTime = robot.findLocationAtTime(second, gridWidth, gridHeight)
            let newRobot = new Robot(
                locationAtTime.row,
                locationAtTime.column,
                robot.xVelocity,
                robot.yVelocity
            )
            newRobotList.push(newRobot)
        }

        if (VISUALIZE) {
            box.setContent(`Second ${second}\n${await robotLocationsToSingleString(newRobotList, gridHeight, gridWidth)}`)
            screen.render()
            await delay(10)
        }

        let quadrantOneRobots: number = 0
        let quadrantTwoRobots: number = 0
        let quadrantThreeRobots: number = 0
        let quadrantFourRobots: number = 0
        let middleRow = Math.floor(gridHeight / 2)
        let middleColumn = Math.floor(gridWidth / 2)
        for (let robot of newRobotList) {
            if (robot.row < middleRow && robot.column < middleColumn) quadrantOneRobots++
            if (robot.row < middleRow && robot.column > middleColumn) quadrantTwoRobots++
            if (robot.row > middleRow && robot.column < middleColumn) quadrantThreeRobots++
            if (robot.row > middleRow && robot.column > middleColumn) quadrantFourRobots++
        }

        let safetyFactor = quadrantOneRobots * quadrantTwoRobots * quadrantThreeRobots * quadrantFourRobots
        if (!minimumSafetyFactor || safetyFactor < minimumSafetyFactor) {
            minimumSafetyFactor = safetyFactor
            timeForMinSafetyFactor = second

            let grid: Array<Array<string>> = new Array(gridHeight)
            for (let row = 0; row < gridHeight; row++) {
                grid[row] = []
                for (let column = 0; column < gridWidth; column++) {
                    grid[row].push('.')
                }
            }
            for (let robot of newRobotList) {
                grid[robot.row][robot.column] = 'X'
            }
            fs.writeFileSync(`${second}.txt`, grid.map(row => row.join('')).join('\n') + '\n\n', 'utf8')
        }
    }

    console.log(`minimum safety factor is ${minimumSafetyFactor} after ${timeForMinSafetyFactor} seconds`)
    
    return timeForMinSafetyFactor
    
}

async function robotLocationsToSingleString(robotList: Array<Robot>, gridHeight: number, gridWidth: number) {
    let grid: Array<Array<string>> = new Array(gridHeight)
    for (let row = 0; row < gridHeight; row++) {
        grid[row] = []
        for (let column = 0; column < gridWidth; column++) {
            grid[row].push('.')
        }
    }
    for (let i = 0; i < robotList.length; i++) {
        grid[robotList[i].row][robotList[i].column] = 'X'
    }
    // for (let robot of robotList) {
    //     grid[robot.row][robot.column] = 'X'
    // }
    return grid.map(row => row.join('')).join('\n')
}

function delay(milliseconds: number){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
}

// solution(dataFolder + '/tests/input.txt', 100, 11, 7)
// solution(dataFolder + '/tests/input2.txt', 5, 11, 7)
// solution(dataFolder + '/input.txt', 100, 101, 103)

// Try running for 10,403 seconds and log the safety factor for each second.  
solutionPartTwo(dataFolder + '/input.txt', 10403, 101, 103)
.then(answer => console.log('answer:', answer))
