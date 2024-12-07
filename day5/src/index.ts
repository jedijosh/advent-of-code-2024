import { parseFileIntoArrayOfLines } from './utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2024-data/day5/data'

const LOGGING = false

export async function solution ( filename : string, partNumber: number) {
    let fileLines : String[] = await parseFileIntoArrayOfLines(filename)
    let rulesMap = new Map()
    let result: number = 0

    let lineNumber = 0
    let line = fileLines[lineNumber]
    // 47|53 means that if an update includes both page number 47 and page number 53, then page number 47 must be printed at some point before page number 53
    while (line.trim() !== '') {
        let rule = line.split('|')
        let mustBePrintedEarlier = rule[0].trim()
        let numberRuleAppliesTo = rule[1].trim()
        
        let previousRules: Array<string> = rulesMap.get(numberRuleAppliesTo) || []
        previousRules.push(mustBePrintedEarlier)
        rulesMap.set(numberRuleAppliesTo, previousRules)
        lineNumber++
        line = fileLines[lineNumber]
    }
    
    lineNumber++

    // Rules have all been processed.  Now process the list of updates.
    let counter = 0
    for (lineNumber; lineNumber < fileLines.length; lineNumber++) {
        let updateToEvaluate = fileLines[lineNumber].split(',')
        let isValid = true
        let fixingIncorrectUpdate = false
        for (let pageNumber = 0; pageNumber < updateToEvaluate.length; pageNumber++) {
            counter++
            if (counter % 1000 === 0) console.log(`processed ${counter} updates, evaluating line ${lineNumber}`)

            // Find the current page number to evaluate
            let pageToEvaluate = updateToEvaluate[pageNumber]
            // Get all rules which apply to this page number.  This will give all the numbers which need to appear before it in the update.
            let rulesToApply = rulesMap.get(pageToEvaluate)
            // Check each number in the rule.  If the update contains the value, it needs to have a smaller index than the current index
            if (rulesToApply) {
                for (let ruleIndex = 0; ruleIndex < rulesToApply.length; ruleIndex++) {
                    let index = updateToEvaluate.indexOf(rulesToApply[ruleIndex])
                    if (index === -1) {
                        continue
                    } else if (index > pageNumber) {
                        if (partNumber === 1) {
                            // If the index is greater than the current index, then the rule is not valid
                            // For part 1, we can stop processing the update as it is not valid
                            // if (LOGGING) console.log(`page ${pageToEvaluate} must be printed after page ${updateToEvaluate[ruleIndex]}`)
                            isValid = false
                            break
                        } else {
                            // Move the number at index before the number of pageNumber.  This will ensure the failing rule now passes.
                            fixingIncorrectUpdate = true
                            if (LOGGING) console.log(`attempting to fix ${updateToEvaluate} as ${rulesToApply[ruleIndex]} was not before ${pageToEvaluate}`)
                            // updateToEvaluate.splice(pageNumber, 1)
                            // let newUpdate = updateToEvaluate.slice(0, index).concat(pageToEvaluate).concat(updateToEvaluate.slice(index))
                            let removedElement = updateToEvaluate.splice(index, 1)
                            let newUpdate = updateToEvaluate.slice(0, pageNumber).concat(rulesToApply[ruleIndex]).concat(updateToEvaluate.slice(pageNumber))
                            updateToEvaluate = newUpdate
                            if (LOGGING) console.log('new update to evaluate is', updateToEvaluate)
                            pageNumber = -1
                            break
                        }
                    }                  
                }
            }
            if (pageNumber === updateToEvaluate.length - 1) {
                if (partNumber === 1) {
                    if (isValid) {
                        if (LOGGING) console.log(`update ${updateToEvaluate} is correct.`)
                        result += parseInt(updateToEvaluate[Math.floor(updateToEvaluate.length / 2)])
                    }
                } else {
                    if (fixingIncorrectUpdate) {
                        if (LOGGING) console.log(`fixed incorrect update ${updateToEvaluate}`)
                        result += parseInt(updateToEvaluate[Math.floor(updateToEvaluate.length / 2)])
                    }
                }
            }
        }
    }
    if (LOGGING) console.log(`processed ${counter} updates`)
    return result
}

// solution(dataFolder + '/tests/input.txt', 1)
// solution(dataFolder + '/input.txt', 1)

// solution(dataFolder + '/tests/input.txt', 2)
solution(dataFolder + '/input.txt', 2)
    .then(answer => console.log('answer:', answer))
