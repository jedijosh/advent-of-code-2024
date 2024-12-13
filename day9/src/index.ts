import { throwDeprecation } from 'process'
import { parseFileIntoArrayOfLines } from './utils'
import { start } from 'repl'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day9/data'

const LOGGING = false

class FileBlock {
    fileId: number
    startBlockId: number
    endBlockId: number
    blockSize: number
    constructor(fileId: number, startBlockId: number, endBlockId: number, blockSize: number) {
        this.fileId = fileId
        this.startBlockId = startBlockId
        this.endBlockId = endBlockId   
        this.blockSize = blockSize
    }   
}

export async function solution ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    
    if (partNumber === 1 ) {
        let fileSystem: Array<number> = []  
        populateFileSystem(fileLines[0], fileSystem)
        reorganizeFileSystem(fileSystem)
        return checkSum(fileSystem)
    } else {
        let fileSystemBlocks: Array<FileBlock> = []   
        populateFileSystemWithBlocks(fileLines[0], fileSystemBlocks)
        reorganizeFileSystemByBlocks(fileSystemBlocks)
        // console.log(fileSystemBlocks)
        return checkSumFileBlocks(fileSystemBlocks)
    }
}

export function populateFileSystem(inputData: String, fileSystem: Array<number>) {
    let readingFile = true
    let fileId = 0
    for (let characterNumber = 0; characterNumber < inputData.length; characterNumber++) {
        let blockSize: number = parseInt(inputData[characterNumber])
        let valueToAdd: number = readingFile ? fileId : -1
        for (let i = 0; i < blockSize; i++) {
            fileSystem.push(valueToAdd)
        }
        if (readingFile) {
            fileId++
        }
        readingFile = !readingFile
    }
}

export function populateFileSystemWithBlocks(inputData: String, fileSystem: Array<FileBlock>) {
    let readingFile = true
    let fileId = 0
    let startBlockIndex = 0
    for (let characterNumber = 0; characterNumber < inputData.length; characterNumber++) {
        let blockSize: number = parseInt(inputData[characterNumber])
        let valueToAdd: number = readingFile ? fileId : -1
        let endBlockIndex = startBlockIndex + blockSize - 1
        fileSystem.push(new FileBlock(valueToAdd, startBlockIndex, endBlockIndex, blockSize))
        startBlockIndex = endBlockIndex + 1
        if (readingFile) {
            fileId++
        }
        readingFile = !readingFile
    }
}

export function reorganizeFileSystem(fileSystem: Array<number>) {
    let nextFileIdFromEndOfArray = fileSystem.length - 1
    for(let blockIndex = 0; blockIndex < fileSystem.length; blockIndex++) {
        if (fileSystem[blockIndex] === -1) {
            while (fileSystem[nextFileIdFromEndOfArray] === -1) {
                nextFileIdFromEndOfArray--
            }
            if (nextFileIdFromEndOfArray <= blockIndex) break
            fileSystem[blockIndex] = fileSystem[nextFileIdFromEndOfArray]
            fileSystem[nextFileIdFromEndOfArray] = -1
            nextFileIdFromEndOfArray--
        }
    }
}

export function reorganizeFileSystemByBlocks(fileSystem: Array<FileBlock>) {
    // Start search from the end of the file
    
    let filesMoved: Set<number> = new Set()
    // Start from end of disk and work way backwards
    for (let blockIndex = fileSystem.length - 1; blockIndex >= 0; blockIndex--) {
        // console.log('processing', blockIndex)
        if (fileSystem[blockIndex].fileId !== -1) {
            // Once you find a file and not blank space, see if it can be moved to the left.
            // If the file has already been moved, it cannot be moved again.
            if (filesMoved.has(fileSystem[blockIndex].fileId)) continue
            
            // Find how many blocks are empty
            let blockSize = fileSystem[blockIndex].blockSize
            // console.log(`found file of size ${blockSize}`)

            // Start looking from the left for a block of empty space which is >= to the size of the block to be moved
            for (let blockNewIndex = 0; blockNewIndex < blockIndex; blockNewIndex++) {
                if (fileSystem[blockNewIndex].fileId === -1 && fileSystem[blockNewIndex].blockSize >= blockSize) {
                    let sizeOfBlankSpace = fileSystem[blockNewIndex].blockSize  
                    // console.log(`moving ${fileSystem[blockIndex].fileId} from index ${blockIndex} to index ${blockNewIndex}`);
                    filesMoved.add(fileSystem[blockIndex].fileId)
                    // We have found the blank space where the file block can be moved
                    // Move the file into the empty space
                    fileSystem[blockNewIndex].fileId = fileSystem[blockIndex].fileId;
                    // Mark the old location as empty space
                    fileSystem[blockIndex].fileId = -1;

                    // If the file we moved was smaller than the size of the empty space we moved it into, we need to add a new file block for the remainder of the empty space
                    // Add it to the end and then re-sort the array so it ends up in the position.
                    if (sizeOfBlankSpace > blockSize) {

                        let oldEndId = fileSystem[blockNewIndex].endBlockId
                        let oldStartId = fileSystem[blockNewIndex].startBlockId
                        // fileId was already updated, need to update the end, blocksize of the formerly blank space
                        fileSystem[blockNewIndex].endBlockId = oldStartId + blockSize - 1
                        fileSystem[blockNewIndex].blockSize = blockSize

                        fileSystem.push(new FileBlock(-1, 
                            fileSystem[blockNewIndex].startBlockId + blockSize, 
                            oldEndId, 
                            sizeOfBlankSpace - blockSize))
                        blockIndex++
                    }
                    // Break so we stop looking for files to move from end
                    break;
                }
            }
            fileSystem.sort((a, b) => a.startBlockId - b.startBlockId)
        }
    }
    return fileSystem
}

export function checkSum(fileSystem: Array<number>) {
    let checkSum = 0
    for(let blockIndex = 0; blockIndex < fileSystem.length; blockIndex++) {
        let fileIdAtIndex = fileSystem[blockIndex]
        if (fileIdAtIndex !== -1) checkSum += fileIdAtIndex * blockIndex
    }
    return checkSum
}

export function checkSumFileBlocks(fileSystem: Array<FileBlock>) {
    let checkSum = 0
    for(let blockIndex = 0; blockIndex < fileSystem.length; blockIndex++) {
        let fileBlockAtIndex = fileSystem[blockIndex]
        if (fileBlockAtIndex.fileId !== -1) {
            for (let i = 0; i < fileBlockAtIndex.blockSize; i++) {
                checkSum += fileBlockAtIndex.fileId * (fileBlockAtIndex.startBlockId + i)
            }
        }
    }
    return checkSum
}

// solution(dataFolder + '/tests/input.txt', 1) // 1928
// solution(dataFolder + '/input.txt', 1) // 6330095022244

// solution(dataFolder + '/tests/input.txt', 2) // 2858
solution(dataFolder + '/input.txt', 2) // 6359491814941
.then(answer => console.log('answer:', answer))
