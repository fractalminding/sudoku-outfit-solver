
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
    },
    draw() {
        let canvas = this.elem
        let cellSize = matrix.cellSize
        let padding = matrix.padding
        //let lineWidth = matrix.lineWidth
        canvas.height = this.rows * cellSize + padding * 2
        canvas.width = this.columns * cellSize + padding * 2
        let context = canvas.getContext("2d")

        let getCoordsByIndexes = function(x, y) {
            let padding = matrix.padding
            let cellSize = matrix.cellSize
            let coords = [0, 0]
            coords[0] = padding + x * cellSize
            coords[1] = padding + y * cellSize

            return coords
        }

        let drawLines = function () {
            context.lineCap = "round"
            //console.log(this.rows)
            //draw vertical lines
            for (let y = 0; y < matrix.rows; y++) {
                
                for (let x = 0; x <= matrix.columns; x++) {
                    context.beginPath()
                    //console.log (context.lineWidth)
                    let borderValue = matrix.borders.verticalArray[y][x]
                    //console.log(borderValue)
                    if (borderValue == 0) {
                        continue
                    } else if (borderValue == 1) {
                        context.lineWidth = 2
                    } else if (borderValue == 2) {
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
            for (let y = 0; y <= matrix.rows; y++) {
                for (let x = 0; x < matrix.columns; x++) {
                    context.beginPath()
                    //console.log(matrix.borders.horizontalArray)
                    //console.log("y = " + y + " x = " + x)
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

        let drawValues = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")

            for (let y in matrix.values) {
                for (let x in matrix.values[y]) {
                    if (matrix.values[y][x].length == 0 
                        || matrix.numberTypes[y][x] == 0
                    ) {
                        continue
                    } else {
                        let value = matrix.values[y][x]
                        let coords = getCoordsByIndexes(x, y)
                        let xCoord = coords[0] + 13
                        let yCoord = coords[1] + 40
                        context.font = "40px Roboto-Light"
                        //context.font = "40px Courier New"

                        if (matrix.numberTypes[y][x] == 2) {
                            context.font = "18px Roboto-Light"
                            //context.font = "18px Courier New"
                            xCoord = coords[0] + 13
                            yCoord = coords[1] + 44
                        }
                        
                        context.fillText(value, xCoord, yCoord)
                    }
                }
            }
        }

        drawLines()
        drawValues()
        drawSelection()
    }
}

/* let createMatrixArray = function(rows, columns) {
    let array = []
    for (let y = 0; y < rows; y++) {
        let rowArray = []
        for (let x = 0; x < columns; x++) {
            rowArray.push(0)
        }
        array.push(rowArray)
    }
    return array
} */

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

let createMatrixNumberTypesArray = function(rows, columns) {
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

let createMatrixValuesArray = function(rows, columns) {
    let array = []
    for (let y = 0; y < rows; y++) {
        let rowArray = []
        for (let x = 0; x < columns; x++) {
            rowArray.push('')
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

let setClassicBorders = function() {
    for (let x in matrix.borders.horizontalArray[3]) {
        matrix.borders.horizontalArray[3][x] = 2
    }
    for (let x in matrix.borders.horizontalArray[6]) {
        matrix.borders.horizontalArray[6][x] = 2
    }
    for (let y in matrix.borders.verticalArray) {
        matrix.borders.verticalArray[y][3] = 2
    }
    for (let y in matrix.borders.verticalArray) {
        matrix.borders.verticalArray[y][6] = 2
    }
    
}

let setMatrix = function(columns, rows) {
    matrix.init()
    matrix.rows = rows
    matrix.columns = columns
    matrix.borders = createMatrixBordersObject(rows, columns)
    matrix.selection = createMatrixSelectionArray(rows, columns)
    matrix.values = createMatrixValuesArray(rows, columns)
    matrix.numberTypes = createMatrixNumberTypesArray(rows, columns)
}

let createClassicBoard = function() {
    let columnsElem = document.getElementById("create-matrix-panel-columns-amount")
    let rowsElem = document.getElementById("create-matrix-panel-rows-amount")
    let columns = +(columnsElem.value)
    let rows = +(rowsElem.value)
    //console.log(columns, rows)
    setMatrix(9, 9)
    setClassicBorders()
    matrix.draw()
}

let createMatrixPanelActivate = function() {
    let button = document.getElementById("create-matrix-panel-button")
    let buttonClassic = document.getElementById("create-matrix-panel-button-classic")

    button.onclick = function() {
        let columnsElem = document.getElementById("create-matrix-panel-columns-amount")
        let rowsElem = document.getElementById("create-matrix-panel-rows-amount")
        let columns = +(columnsElem.value)
        let rows = +(rowsElem.value)
        setMatrix(columns, rows)
        matrix.draw()
    }

    buttonClassic.onclick = createClassicBoard
}

let canvasActivate = function() {
    
    let getIndexesByCoords = function(x, y) {
        let cellSize = matrix.cellSize
        let padding = matrix.padding
        let indexes = [0, 0]

        for (let xIndex = 0; xIndex < matrix.columns; xIndex++) {
            if (x <= padding + cellSize * (xIndex + 1)) {
                indexes[0] = xIndex
                break
            }
        }

        for (let yIndex = 0; yIndex < matrix.rows; yIndex++) {
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

let getNumberType = function() {
    let numType = document.querySelector('*[name="num-type"]:checked').value
    let numTypeIndex = 0
    if (numType == 'usual-number') {
        numTypeIndex = 1
    } else if (numType == 'pair') {
        numTypeIndex = 2
    }
    return numTypeIndex
}

let numberClick = function(number) {
    let numberType = getNumberType()
    for (let y in matrix.selection) {
        for (let x in matrix.selection[y]) {
            if (matrix.selection[y][x] == true) {
                matrix.numberTypes[y][x] = numberType
                if (number == 0) {
                    matrix.values[y][x] = ''
                    continue
                }
                if (numberType == 1) {
                    matrix.values[y][x] = number
                } else if (numberType == 2) {
                    let currentValue = matrix.values[y][x]
                    let currentValueLenght = String(currentValue).length
                    if (currentValueLenght == 2) {
                        matrix.values[y][x] = String(number)
                    } else {
                        matrix.values[y][x] = currentValue + '' + String(number)
                    }
                }
            }
        }
    }
}

let numbersPanelActivate = function() {
    let numButtons = document.querySelectorAll("#numpad .num")
    
    for (let numButton of numButtons) {
        numButton.onclick = function() {
            let num = +(numButton.innerHTML)
            numberClick(num)
            matrix.draw()
        }
    }
}

let downInfoActivate = function() {
    let downInfoCanvas = document.getElementById("down-info-canvas")
    let DICcontext = downInfoCanvas.getContext("2d")

    let downInfoPrice = document.getElementById("down-info-price")
    let downInfoLink = document.getElementById("down-info-link")
    let downInfoButton = document.getElementById("down-info-button")

    let canvas = matrix.elem
    let context = canvas.getContext("2d")

    downInfoCanvas.height = 100
    downInfoCanvas.width = 1000

    downInfoButton.onclick = function() {
        downInfoCanvas.height = 100
        downInfoCanvas.width = 1000
        let price = downInfoPrice.value
        let link = downInfoLink.value

        let writeToDownInfoCanvas = function() {
            DICcontext.font = "60px Courier New"
            DICcontext.fillText(price, 20, 75)

            DICcontext.font = "40px Courier New"
            DICcontext.fillText(link, 450, 80)
        }
        let copyDICtoCanvas = function() {
            let copyCanvas = canvas.cloneNode(true)
            copyCanvas.id = "copy-canvas"
            copyCanvas.width = canvas.width
            copyCanvas.height = canvas.height
            let copyCanvasContext = copyCanvas.getContext("2d")
            copyCanvasContext.drawImage(canvas, 0, 0)

            let newInfoWidth = canvas.width
            let newInfoHeight = Math.round(newInfoWidth / 10)
            let canvasHeight = canvas.height
            canvas.height = canvasHeight + newInfoHeight

            context.drawImage(copyCanvas, 0, 0)
            context.drawImage(downInfoCanvas, 0, canvasHeight, newInfoWidth, newInfoHeight)
            
            copyCanvas.remove()
        }

        writeToDownInfoCanvas()
        copyDICtoCanvas()
    }
}

let oneSecond = setTimeout(function() {
    createClassicBoard()
    canvasActivate()
    createMatrixPanelActivate()
    selectionPanelActivate()
    bordersPanelActivate()
    numbersPanelActivate()
    downInfoActivate()
}, 300)

