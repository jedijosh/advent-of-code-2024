import { parseFileIntoArrayOfLines } from './utils'
const dayNumber = require('../package.json').name
const dataFolder = `/mnt/c/Users/joshs/code/advent-of-code-2024-data/${dayNumber}/data`

const LOGGING = false

// you determine that a good hiking trail is as long as possible and has an even, gradual, uphill slope. 
// For all practical purposes, this means that a hiking trail is any path that starts at height 0, ends at height 9, and always increases by a height of exactly 1 at each step. 
// Hiking trails never include diagonal steps - only up, down, left, or right (from the perspective of the map).

// Trailheads always have height 0
// Trailheads score is the number of 9-height positions reachable from that trailhead via a hiking trail.

export async function solution ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)

    // Need to find all trailhead starts

    class TrailNode {
        height: number
        x: number 
        y: number 
        edges: Array<TrailNode> = []
        
        constructor(height: number, x: number, y: number) {
            this.height = height
            this.x = x
            this.y = y   
        }   
    }
    let trailHeads: Map<string, Set<string>> = new Map()
    let trailMap: Map<string, TrailNode> = new Map()
    let trailPaths: Array<{id: string, path: Array<string>}> = []
    let numberOfDistinctHikingTrails: number = 0

    for (let x = 0; x < fileLines.length; x++) {    
        for (let y = 0; y < fileLines[x].length; y++) {
            // Store the height as the id            
           let id = `${x},${y}`
            trailMap.set(id, { height: parseInt(fileLines[x][y]), x: x, y: y, edges: []} )
            if (fileLines[x][y] === '0') {
                trailPaths.push({id, path: [id]})
                trailHeads.set(id, new Set())
            }
        }
    }

    // Find edges
    trailMap.forEach(mapNode => {
        let directions = ['U', 'D', 'L', 'R']
        directions.forEach(direction => {
            let node2
            switch (direction) {
                case 'U':
                    node2 = trailMap.get(`${mapNode.x},${mapNode.y - 1}`)
                    if (node2 && node2.height - mapNode.height === 1) mapNode.edges.push(node2)
                    break

                case 'D':
                    node2 = trailMap.get(`${mapNode.x},${mapNode.y + 1}`)
                    if (node2 && node2.height - mapNode.height === 1) mapNode.edges.push(node2)
                    break

                case 'L':
                    node2 = trailMap.get(`${mapNode.x - 1},${mapNode.y}`)
                    if (node2 && node2.height - mapNode.height === 1) mapNode.edges.push(node2)
                    break

                case 'R':
                    node2 = trailMap.get(`${mapNode.x + 1},${mapNode.y}`)
                    if (node2 && node2.height - mapNode.height === 1) mapNode.edges.push(node2)
                    break
            }
        })
    })

    while (trailPaths.length > 0) {
        let currentPathLocation = trailPaths.pop()
        let trailNode
        if (currentPathLocation) trailNode = trailMap.get(currentPathLocation.id)
        if (trailNode && trailNode.height === 9) {
            let currentPeaksFromTrailhead 
            numberOfDistinctHikingTrails++
            // Find the map entry in trailHeads of where this path started.
            if (currentPathLocation) currentPeaksFromTrailhead = trailHeads.get(currentPathLocation.path[0])
            // Add the peak to the Set so distinct peaks can be counted
            currentPeaksFromTrailhead?.add(`${trailNode.x},${trailNode.y}`)
        } else {
            if (trailNode) trailNode.edges.forEach(edge => {
                let id = `${edge.x},${edge.y}`
                let path: Array<string> = []
                if (currentPathLocation) path = Array.from(currentPathLocation.path)
                path.push(id)
                trailPaths.push({id, path})
            })
        }
    }

    let result: number = 0
    if (partNumber === 1) {
        for (const [key, value] of trailHeads) {
            result += value.size
        }
        return result
    }
    else {
        return numberOfDistinctHikingTrails
    }
    
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input.txt', 2)
solution(dataFolder + '/input.txt', 2)
.then(answer => console.log('answer:', answer))
