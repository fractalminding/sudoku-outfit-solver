
let matrix = {
    init() {
        this.rows = 0
        this.columns = 0
        this.elem = document.getElementById("board-canvas")

        let canvas = this.elem
        this.cellSize = 50
        this.padding = 5

        canvas.height = 0
        canvas.width = 0

        this.array = []
    },
    draw() {
        let canvas = this.elem
        let cellSize = matrix.cellSize
        let padding = matrix.padding
        //let lineWidth = matrix.lineWidth
        canvas.height = this.rows * cellSize + padding * 2
        canvas.width = this.columns * cellSize + padding * 2
        let context = canvas.getContext("2d")

        let drawLines = function () {
            context.lineCap = "round"

            //draw vertical lines
            for (let y = 0; y < this.rows; y++) {
                for (let x = 0; x <= this.columns; x++) {
                    context.beginPath()
                    //console.log (context.lineWidth)
                    let borderValue = matrix.borders.verticalArray[y][x]
                    //console.log(borderValue)
                    if (borderValue == 0) {
                        continue
                    } else if (borderValue == 1) {
                        context.lineWidth = 2
                    } else if(borderValue == 2) {
                        context.lineWidth = 4
                    }
                    //console.log ('here')
                    let startX = 0 + padding + x * cellSize
                    let startY = 0 + padding + y * cellSize
                    
                    let finishX = 0 + padding + x * cellSize
                    let finishY = 0 + padding + y * cellSize + cellSize
    
                    context.moveTo(startX, startY)
                    context.lineTo(finishX, finishY)
                    context.stroke()
                }
            }

            //draw horizontal lines
            for (let y = 0; y <= this.rows; y++) {
                for (let x = 0; x < this.columns; x++) {
                    context.beginPath()
                    let borderValue = matrix.borders.horizontalArray[y][x]
                    if (borderValue == 0) {
                        continue
                    } else if (borderValue == 1) {
                        context.lineWidth = 2
                    } else if(borderValue == 2) {
                        context.lineWidth = 4
                    }

                    let startX = 0 + padding + x * cellSize
                    let startY = 0 + padding + y * cellSize
                    let finishX = 0 + padding + x * cellSize + cellSize
                    let finishY = 0 + padding + y * cellSize

                    context.moveTo(startX, startY)
                    context.lineTo(finishX, finishY)
                    context.stroke()
                }
            }
            
        }

        let drawSelection = function() {

            let getCoordsByIndexes = function(x, y) {
                let padding = matrix.padding
                let cellSize = matrix.cellSize
                let coords = [0, 0]
                coords[0] = padding + x * cellSize
                coords[1] = padding + y * cellSize

                return coords
            }

            let drawCellSelection = function(x, y) {
                let canvas = matrix.elem
                let context = canvas.getContext("2d")
                let coords = getCoordsByIndexes(x, y)

                context.fillStyle = "rgba(255, 0, 234, 0.4)";
                context.fillRect (coords[0], coords[1], matrix.cellSize, matrix.cellSize);
            }

            let selection = matrix.selection
            for (let y in selection) {
                for (let x in selection[y]) {
                    if (selection[y][x] == true) {
                        drawCellSelection(x, y)
                    }
                }
            }
        }

        drawLines()
        drawSelection()
    }
}

let createMatrixArray = function(rows, columns) {
    let array = []
    for (let y = 0; y < rows; y++) {
        let rowArray = []
        for (let x = 0; x < columns; x++) {
            rowArray.push(0)
        }
        array.push(rowArray)
    }
    return array
}

let createMatrixSelectionArray = function(rows, columns) {
    let array = []
    for (let y = 0; y < rows; y++) {
        let rowArray = []
        for (let x = 0; x < columns; x++) {
            rowArray.push(false)
        }
        array.push(rowArray)
    }
    return array
}

let createMatrixBordersObject = function(rows, columns) {

    let isEdge = function(x, fullAmount) {
        if (x == 0 || x == fullAmount) {
            return true
        } else {
            return false
        }
    }

    let verticalArray = []
    let horizontalArray = []

    for (let y = 0; y <= rows; y++) {
        let rowArray = []
        for (let x = 0; x <= columns; x++) {
            
            if (isEdge(x, columns)) {
                rowArray.push(2)
            } else {
                rowArray.push(1)
            }
        }
        verticalArray.push(rowArray)
    }

    for (let y = 0; y <= rows; y++) {
        let rowArray = []
        for (let x = 0; x <= columns; x++) {
            
            if (isEdge(y, rows)) {
                rowArray.push(2)
            } else {
                rowArray.push(1)
            }
        }
        horizontalArray.push(rowArray)
    }

    return {verticalArray, horizontalArray}
}

let createMatrixPanelActivate = function() {
    let columnsElem = document.getElementById("create-matrix-panel-columns-amount")
    let rowsElem = document.getElementById("create-matrix-panel-rows-amount")
    let button = document.getElementById("create-matrix-panel-button")

    button.onclick = function() {
        columns = +(columnsElem.value)
        rows = +(rowsElem.value)

        matrix.init()
        matrix.rows = rows
        matrix.columns = columns
        matrix.array = createMatrixArray(rows, columns)
        matrix.borders = createMatrixBordersObject(rows, columns)
        matrix.selection = createMatrixSelectionArray(rows, columns)
        //console.log(matrix.array)
        //console.log(matrix.borders)
        matrix.draw()
        canvasActivate()
    }
}

let canvasActivate = function() {
    
    let getIndexesByCoords = function(x, y) {
        let cellSize = matrix.cellSize
        let padding = matrix.padding
        let indexes = [0, 0]

        for (let xIndex = 0; xIndex < columns; xIndex++) {
            if (x <= padding + cellSize * (xIndex + 1)) {
                indexes[0] = xIndex
                break
            }
        }

        for (let yIndex = 0; yIndex < rows; yIndex++) {
            if (y <= padding + cellSize * (yIndex + 1)) {
                indexes[1] = yIndex
                break
            }
        }

        return indexes
    }

    let isCanvasEdge = function(x, y) {
        let cellSize = matrix.cellSize
        let padding = matrix.padding
        let canvas = matrix.elem
        if (
            x < padding 
            || y < padding
            || x > canvas.width - padding
            || y > canvas.height - padding
        ) {
            return true
        } else {
            return false
        }
    }

    let canvas = matrix.elem
    canvas.style.display = "block"

    canvas.onclick = function(event) {
        let x = event.offsetX
        let y = event.offsetY
        if (isCanvasEdge(x, y)) {
            return false
        }
        let indexes = getIndexesByCoords(x, y)
        let value = matrix.selection[indexes[1]][indexes[0]]
        matrix.selection[indexes[1]][indexes[0]] = !value
        matrix.draw()
    }
}

let selectionPanelActivate = function() {
    let selectAll = document.getElementById("select-all")
    let deSelectAll = document.getElementById("deselect-all")

    selectAll.onclick = function() {
        for (let y in matrix.selection) {
            for (let x in matrix.selection[y]) {
                matrix.selection[y][x] = true
            }
        }
        matrix.draw()
    }

    deSelectAll.onclick = function() {
        for (let y in matrix.selection) {
            for (let x in matrix.selection[y]) {
                matrix.selection[y][x] = false
            }
        }
        matrix.draw()
    }
}

let bordersPanelActivate = function() {
    let setBordersHidden = document.getElementById("set-borders-hidden")
    let setBordersThin = document.getElementById("set-borders-thin")
    let setBordersFat = document.getElementById("set-borders-fat")

    let setBorders = function(weight) {
        let getDirection = function() {
            let direction = document.querySelector('*[name="border-type"]:checked').value
            return direction
        }
        let direction = getDirection()

        let applyBorderWeight = function(x, y) {
            
            if (direction == 'left') {
                matrix.borders.verticalArray[y][x] = weight
            } else if (direction == 'right') {
                matrix.borders.verticalArray[y][x + 1] = weight
            } else if (direction == 'up') {
                matrix.borders.horizontalArray[y][x] = weight
            } else if (direction == 'down') {
                matrix.borders.horizontalArray[y + 1][x] = weight
            }
        }

        for (let y in matrix.selection) {
            for (let x in matrix.selection[y]) {
                if (matrix.selection[y][x] == true) {
                    applyBorderWeight(+x, +y)
                }
            }
        }
        matrix.draw()
    }

    setBordersHidden.onclick = function() {
        setBorders(0)
    }
    setBordersThin.onclick = function() {
        setBorders(1)
    }
    setBordersFat.onclick = function() {
        setBorders(2)
    }
}

createMatrixPanelActivate()
selectionPanelActivate()
bordersPanelActivate()