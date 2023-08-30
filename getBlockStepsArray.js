let getBlockStepsArray = function(array) {
    let getLeftArray = function(array) {
        let leftArray = []
        let leftIndex = array[0][0]
        for (let cell of array) {
            //console.log(leftIndex)
            if (cell[0] < leftIndex) {
                leftArray = []
                leftArray.push(cell)
                leftIndex = cell[0]
            } else if (cell[0] == leftIndex) {
                leftArray.push(cell)
            }
        }
        return leftArray
    }
    
    let getStartCell = function(array) {
        let startCell = array[0]
        for (let cell of array) {
            if (cell[1] < startCell[1]) {
                startCell = cell
            }
        }
        return startCell
    }
    
    let getNewPoint = function(point, direction) {
        if (point == 1 && direction == 'up') return 3
        if (point == 1 && direction == 'right') return 2
        if (point == 1 && direction == 'down') return 3
        if (point == 1 && direction == 'left') return 2
    
        if (point == 2 && direction == 'up') return 4
        if (point == 2 && direction == 'right') return 1
        if (point == 2 && direction == 'down') return 4
        if (point == 2 && direction == 'left') return 1
    
        if (point == 3 && direction == 'up') return 1
        if (point == 3 && direction == 'right') return 4
        if (point == 3 && direction == 'down') return 1
        if (point == 3 && direction == 'left') return 4
    
        if (point == 4 && direction == 'up') return 2
        if (point == 4 && direction == 'right') return 3
        if (point == 4 && direction == 'down') return 2
        if (point == 4 && direction == 'left') return 3
    }
    
    let getNextStep = function(step, directions) {
        let tryFirstDirection = function(step, direction) {
            let targetX, targetY
            if (direction == 'up') {
                targetX = step[0]
                targetY = step[1] - 1
            } else if (direction == 'right') {
                targetX = step[0] + 1
                targetY = step[1]
            } else if (direction == 'down') {
                targetX = step[0]
                targetY = step[1] + 1
            } else if (direction == 'left') {
                targetX = step[0] - 1
                targetY = step[1]
            }
            for (let y in matrix.selection) {
                for (let x in matrix.selection[y]) {
                    if (x == targetX && y == targetY && matrix.selection[y][x] == true) {
                        let point = step[2]
                        let newPoint = getNewPoint(point, direction)
                        return [targetX, targetY, newPoint]
                    }
                }
            }
            return false
        }
        let useSecondDirection = function(step, direction) {
            let newPoint = getNewPoint(step[2], direction)
            let newStep = step.slice(0)
            newStep[2] = newPoint
            return newStep
        }
        let nextStep = tryFirstDirection(step, directions[0])
        if (!nextStep) {
            nextStep = useSecondDirection(step, directions[1])
        }
        return nextStep
    }
    
    let startCell = getStartCell(getLeftArray(array))
    let stepsArray = []
    let firstStep = startCell.slice(0)
    firstStep.push(1)
    let currentStep = firstStep.slice(0)
    stepsArray.push(currentStep)
    
    for (;;) {
        let point = currentStep[2]
        let directions = []
        if (point == 1) {
            directions = ['up', 'right']
        } else if (point == 2) {
            directions = ['right', 'down']
        } else if (point == 3) {
            directions = ['left', 'up']
        } else if (point == 4) {
            directions = ['down', 'left']
        }
        let nextStep = getNextStep(currentStep, directions)
        stepsArray.push(nextStep)
        currentStep = nextStep
        if (nextStep[0] == firstStep[0] && nextStep[1] == firstStep[1] && nextStep[2] == 3) {
            stepsArray.push(firstStep)
            break
        }
    }
    return stepsArray
}

