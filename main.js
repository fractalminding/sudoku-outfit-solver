
let matrix = {
    init() {
        this.rows = 0
        this.columns = 0
        this.elem = document.getElementById("board-canvas")
        this.color = "#000000"

        let canvas = this.elem
        this.cellSize = 100
        this.padding = 5

        canvas.height = 0
        canvas.width = 0
    },
    moveSelection(key) {
        let x = 0, y = 0
        let targetX = 0, targetY = 0
        loop: for (y in matrix.selection) {
            for (x in matrix.selection[y]) {
                if (matrix.selection[y][x] == true) {
                    x = +x
                    y = +y
                    break loop
                }
            }
        }
        if (key == "ArrowUp") {
            if (y != 0) {
                targetX = x
                targetY = y - 1
            } else {
                return
            }
        } else if (key == "ArrowDown") {
            if (y != matrix.rows - 1) {
                targetX = x
                targetY = y + 1
            } else {
                return
            }
        } else if (key == "ArrowLeft") {
            //console.log(x, y)
            if (x != 0) {
                targetX = x - 1 
                targetY = y
            } else {
                return
            }
        } else if (key == "ArrowRight") {
            if (x != matrix.columns - 1) {
                targetX = x + 1 
                targetY = y
            } else {
                return
            }
        }

        matrix.selection[y][x] = false
        matrix.selection[targetY][targetX] = true
        matrix.draw()
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
                        let lineThickness = matrix.thinLineThickness
                        context.lineWidth = lineThickness
                    } else if (borderValue == 2) {
                        let lineThickness = matrix.fatLineThickness
                        context.lineWidth = lineThickness
                    }
                    //console.log ('here')
                    let startX = 0 + padding + x * cellSize
                    let startY = 0 + padding + y * cellSize
                    
                    let finishX = 0 + padding + x * cellSize
                    let finishY = 0 + padding + y * cellSize + cellSize
    
                    context.moveTo(startX, startY)
                    context.lineTo(finishX, finishY)
                    context.strokeStyle = matrix.color
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
                        let lineThickness = matrix.thinLineThickness
                        context.lineWidth = lineThickness
                    } else if(borderValue == 2) {
                        let lineThickness = matrix.fatLineThickness
                        context.lineWidth = lineThickness
                    }

                    let startX = 0 + padding + x * cellSize
                    let startY = 0 + padding + y * cellSize
                    let finishX = 0 + padding + x * cellSize + cellSize
                    let finishY = 0 + padding + y * cellSize

                    context.moveTo(startX, startY)
                    context.lineTo(finishX, finishY)
                    context.strokeStyle = matrix.color
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
                    //console.log(matrix.values[y][x], matrix.numberTypes[y][x])
                    if (matrix.values[y][x] == 0 
                        || matrix.numberTypes[y][x] == 0
                    ) {
                        continue
                    } else {
                        let value = matrix.values[y][x]
                        //console.log("here")
                        let coords = getCoordsByIndexes(x, y)
                        let xCoord = coords[0] + 28
                        let yCoord = coords[1] + 80
                        context.font = "80px Roboto-Light"
                        //context.font = "40px Courier New"

                        if (matrix.numberTypes[y][x] == 2) {
                            context.font = "36px Roboto-Light"
                            //context.font = "18px Courier New"
                            xCoord = coords[0] + 28
                            yCoord = coords[1] + 88
                        }
                        context.fillStyle = matrix.color;
                        context.fillText(value, xCoord, yCoord)
                    }
                }
            }
        }

        let drawFakeText = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            context.font = "80px Roboto-Light"
            context.fillStyle = matrix.color;
            context.fillText("123jh1j2h31k2j3h", 10, 10)
            canvas.width = canvas.width
        }

        let drawTwins = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            //let startX, startY, finishX, finishY

            let drawTwin = function(startX, startY, finishX, finishY) {
                context.beginPath()
                context.setLineDash([])
                context.lineWidth = matrix.fatLineThickness
                context.moveTo(startX, startY)
                context.lineTo(finishX, finishY)
                context.strokeStyle = matrix.color
                context.stroke()
            }
            for (let y in matrix.twins) {
                for (let x in matrix.twins[y]) {
                    x = +x, y = +y
                    let type = matrix.twins[y][x]
                    let coords = getCoordsByIndexes(x + 1, y + 1)
                    let delta = matrix.cellSize / 5

                    if (type == 0) {
                        continue
                    } else if (type == 1) {
                        let startX = coords[0] - delta
                        let startY = coords[1] + delta
                        let finishX = coords[0] + delta
                        let finishY = coords[1] - delta

                        drawTwin(startX, startY, finishX, finishY)
                    } else if (type == 2) {
                        let startX = coords[0] - delta
                        let startY = coords[1] - delta
                        let finishX = coords[0] + delta
                        let finishY = coords[1] + delta

                        drawTwin(startX, startY, finishX, finishY)
                    } else if (type == 3) {
                        {
                            let startX = coords[0] - delta
                            let startY = coords[1] + delta
                            let finishX = coords[0] + delta
                            let finishY = coords[1] - delta

                            drawTwin(startX, startY, finishX, finishY)
                        }
                        {
                            let startX = coords[0] - delta
                            let startY = coords[1] - delta
                            let finishX = coords[0] + delta
                            let finishY = coords[1] + delta

                            drawTwin(startX, startY, finishX, finishY)
                        }
                        
                    }

                    
                }
            }
        }

        let drawCross = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            let padding = matrix.padding

            let drawCrossLine = function(startX, startY, finishX, finishY) {
                context.beginPath()
                context.setLineDash([2, 5])
                context.moveTo(startX, startY)
                context.lineTo(finishX, finishY)
                context.strokeStyle = matrix.color
                context.lineWidth = matrix.thinLineThickness
                context.stroke()
            }

            let type = matrix.cross
            if (type == 0) {
                return
            } else if (type == 1) {
                let startX = 0 + padding
                let startY = canvas.height - padding
                let finishX = canvas.width - padding
                let finishY = 0 + padding

                drawCrossLine(startX, startY, finishX, finishY)
            } else if (type == 2) {
                let startX = 0 + padding
                let startY = 0 + padding
                let finishX = canvas.width - padding
                let finishY = canvas.height - padding

                drawCrossLine(startX, startY, finishX, finishY)
            } else if (type == 3) {
                {
                    let startX = 0 + padding
                    let startY = canvas.height - padding
                    let finishX = canvas.width - padding
                    let finishY = 0 + padding

                    drawCrossLine(startX, startY, finishX, finishY)
                }
                {
                    let startX = 0 + padding
                    let startY = 0 + padding
                    let finishX = canvas.width - padding
                    let finishY = canvas.height - padding

                    drawCrossLine(startX, startY, finishX, finishY)
                }
            }
        }

        drawFakeText()
        drawLines()
        drawCross()
        drawValues()
        drawTwins()
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
            rowArray.push(0)
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

let createMatrixTwinsArray = function(rows, columns) {
    let array = []
    for (let y = 0; y < rows - 1; y++) {
        let rowArray = []
        for (let x = 0; x < columns - 1; x++) {
            rowArray.push(0)
        }
        array.push(rowArray)
    }
    return array
}

let setMatrix = function(columns, rows) {
    matrix.init()
    matrix.rows = rows
    matrix.columns = columns
    matrix.borders = createMatrixBordersObject(rows, columns)
    matrix.selection = createMatrixSelectionArray(rows, columns)
    matrix.values = createMatrixValuesArray(rows, columns)
    matrix.numberTypes = createMatrixNumberTypesArray(rows, columns)
    matrix.twins = createMatrixTwinsArray(rows, columns)
    matrix.cross = 0
    matrix.thinLineThickness = 2
    matrix.fatLineThickness = 4
    matrix.genArray = []
    matrix.isCtrlPressed = false
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
        let xClient = event.offsetX
        let yClient = event.offsetY
        let clientWidth = canvas.clientWidth
        let clientHeight = canvas.clientHeight
        let x = 0, y = 0
        if (xClient != 0) {
            x = Math.round(canvas.width * xClient / clientWidth)
        }
        if (yClient != 0) {
            
            y = Math.round(canvas.height * yClient / clientHeight)
            //console.log(x)
        }
        

        if (isCanvasEdge(x, y)) {
            return false
        }
        let indexes = getIndexesByCoords(x, y)
        let value = matrix.selection[indexes[1]][indexes[0]]
        //console.log(matrix.isCtrlPressed)
        if (matrix.isCtrlPressed == false) {
            for (let y in matrix.selection) {
                for (let x in matrix.selection[y]) {
                    matrix.selection[y][x] = false
                }
            }
            //console.log(matrix.selection)
        }
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
            DICcontext.fillStyle = matrix.color
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

let designPanelActivate = function() {
    let randomDesignButton = document.getElementById("random-design-button")
    let applyButton = document.getElementById("apply-thickness-settings")

    randomDesignButton.onclick = function() {
        let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        matrix.color = randomColor
        matrix.draw()
    }

    applyButton.onclick = function() {
        let thinLineThickness = +(document.getElementById("thin-line-thickness").value)
        let fatLineThickness = +(document.getElementById("fat-line-thickness").value)
        matrix.thinLineThickness = thinLineThickness
        matrix.fatLineThickness = fatLineThickness
        matrix.draw()
    }

}

let twinsPanelActivate = function() {
    let twinsHidden = document.getElementById("twins-hidden")
    let twinsSlash = document.getElementById("twins-slash")
    let twinsUnderslash = document.getElementById("twins-underslash")
    let twinsX = document.getElementById("twins-x")

    let setTwins = function(type) {
        let getDirection = function() {
            let direction = document.querySelector('*[name="twins-position"]:checked').value
            return direction
        }
        let direction = getDirection()

        let applyTwins = function(x, y) {
            
            if (direction == 'up-left') {
                if (x == 0 || y == 0) {
                    return
                } else {
                    matrix.twins[y - 1][x - 1] = type
                }
            } else if (direction == 'up-right') {
                if (x == matrix.columns - 1 || y == 0) {
                    return
                } else {
                    matrix.twins[y - 1][x] = type
                }
            } else if (direction == 'down-left') {
                if (x == 0 || y == matrix.rows - 1) {
                    return
                } else {
                    matrix.twins[y][x - 1] = type
                }
            } else if (direction == 'down-right') {
                if (x == matrix.columns - 1 || y == matrix.rows - 1) {
                    return
                } else {
                    matrix.twins[y][x] = type
                }
            }
        }

        for (let y in matrix.selection) {
            for (let x in matrix.selection[y]) {
                if (matrix.selection[y][x] == true) {
                    applyTwins(+x, +y)
                }
            }
        }
        matrix.draw()
        //console.log(matrix.twins)
    }

    twinsHidden.onclick = function() {
        setTwins(0)
    }
    twinsSlash.onclick = function() {
        setTwins(1)
    }
    twinsUnderslash.onclick = function() {
        setTwins(2)
    }
    twinsX.onclick = function() {
        setTwins(3)
    }
}

let crossPanelActivate = function() {
    
    let buttons = document.querySelectorAll("#cross-panel .button")
    for (let button of buttons) {
        button.onclick = function() {
            let type = 0
            if (button.id == "cross-slash") {
                type = 1
            } else if (button.id == "cross-backslash") {
                type = 2
            } else if(button.id == "cross-double") {
                type = 3
            }
            matrix.cross = type
            matrix.draw()
            
        }
    }
}

let generationPanelActivate = function() {
    let button = document.getElementById("generation-button")
    button.onclick = function() {
        let genType = document.querySelector('*[name="generation-type"]:checked').value
        if (genType == 'from-zero') {
            if (matrix.rows == matrix.columns) {
                let newValues = ultraGen.get(matrix.rows)
                for (;;) {
                    if (newValues == undefined) {
                        newValues = ultraGen.get(matrix.rows)
                    } else {
                        break
                    }
                }
                matrix.values = newValues
                for (let y in matrix.numberTypes) {
                    for (let x in matrix.numberTypes[y]) {
                        matrix.numberTypes[y][x] = 1
                    }
                }
                //console.log(matrix.values)
                matrix.draw()
            }
        } else if (genType == 'from-pattern') {
            let valuesCopy = JSON.parse(JSON.stringify(matrix.values))
            
            values = ultraGen.fillCandidates(valuesCopy, matrix.rows, true)
            matrix.genArray = []
            ultraGen.getFromPattern(values, matrix.rows, matrix.genArray, 1)
            //console.log(ultraGen.toNormalArray(array))
            //console.log(matrix.genArray)
            if (matrix.genArray.length == 0) {
                console.log('0 решений')
            }
            // let max = matrix.genArray.length - 1
            // let randomIndex = Math.floor(Math.random() * max) + 0
            matrix.values = matrix.genArray[0]

            for (let y in matrix.numberTypes) {
                for (let x in matrix.numberTypes[y]) {
                    matrix.numberTypes[y][x] = 1
                }
            }

            matrix.draw()
        }
    }
}

let keyboardEventsActivate = function() {
    document.body.onkeyup = function(event) {
        
        let key = event.key

        if(key == "Control") {
            matrix.isCtrlPressed = false
        }
        
        let elem = document.querySelector(`#numpad *[key="${key}"]`)
        if (elem) {
            elem.click()
        }
    }

    document.body.onkeydown = function(event) {
        let key = event.key
        if(key == "Control") {
            matrix.isCtrlPressed = true
        }

        if (key == "ArrowRight" || key == "ArrowLeft" || key == "ArrowUp" || key == "ArrowDown") {
            let amountOfSelectionCells = 0
            for (let y in matrix.selection) {
                for (let x in matrix.selection[y]) {
                    if (matrix.selection[y][x] == true) {
                        amountOfSelectionCells++
                    }
                }
            }
            if (amountOfSelectionCells == 1) {
                matrix.moveSelection(key)
                event.preventDefault();
                //return false
            }
        }
    }
}

let mouseEventsActivate = function() {
    document.body.onclick = function(event) {
        if (event.target.id == "container") {
            for (let y in matrix.selection) {
                for (let x in matrix.selection[y]) {
                    matrix.selection[y][x] = false
                    matrix.draw()
                }
            }
        }
    }
}

createClassicBoard()
canvasActivate()
createMatrixPanelActivate()
selectionPanelActivate()
bordersPanelActivate()
numbersPanelActivate()
downInfoActivate()
designPanelActivate()
twinsPanelActivate()
crossPanelActivate()
generationPanelActivate()
keyboardEventsActivate()
mouseEventsActivate()