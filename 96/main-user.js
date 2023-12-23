
let matrix = {
    init() {
        
        
        this.elem = document.getElementById("board-canvas")
        this.color = "#000000"
        this.solvingColor = "#eb213c"
        let canvas = this.elem
        this.cellSize = 100
        this.padding = 5
        canvas.height = 0
        canvas.width = 0

        matrix.thinLineThickness = 2
        matrix.fatLineThickness = 4
        matrix.isCtrlPressed = false

        this.data = data
        //matrix.draw()
    },
    moveSelection(key) {
        let x = 0, y = 0
        let targetX = 0, targetY = 0
        loop: for (y in matrix.data.selection) {
            for (x in matrix.data.selection[y]) {
                if (matrix.data.selection[y][x] == true) {
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
            if (y != matrix.data.rows - 1) {
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
            if (x != matrix.data.columns - 1) {
                targetX = x + 1 
                targetY = y
            } else {
                return
            }
        }

        matrix.data.selection[y][x] = false
        matrix.data.selection[targetY][targetX] = true
        matrix.draw()
    },
    deSelectAll() {
        for (let y in this.data.selection) {
            for (let x in this.data.selection[y]) {
                this.data.selection[y][x] = false
            }
        }
    },
    selectAll() {
        for (let y in this.data.selection) {
            for (let x in this.data.selection[y]) {
                this.data.selection[y][x] = true
            }
        }
    },
    getSelected() {
        let array = matrix.data.selection
        selectedArray = []
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                if (array[y][x] == true) {
                    selectedArray.push([x, y])
                }
            }
        }
        return selectedArray
    },
    draw() {
        let canvas = this.elem
        let cellSize = matrix.cellSize
        let padding = matrix.padding
        //let lineWidth = matrix.lineWidth
        canvas.height = this.data.rows * cellSize + padding * 2
        canvas.width = this.data.columns * cellSize + padding * 2
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
            //draw vertical lines
            for (let y = 0; y < matrix.data.rows; y++) {
                
                for (let x = 0; x <= matrix.data.columns; x++) {
                    context.beginPath()
                    //console.log (context.lineWidth)
                    let borderValue = matrix.data.borders.verticalArray[y][x]
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
            for (let y = 0; y <= matrix.data.rows; y++) {
                for (let x = 0; x < matrix.data.columns; x++) {
                    context.beginPath()
                    //console.log(matrix.data.borders.horizontalArray)
                    //console.log("y = " + y + " x = " + x)
                    let borderValue = matrix.data.borders.horizontalArray[y][x]
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

            let selection = matrix.data.selection
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

            for (let y in matrix.data.values) {
                for (let x in matrix.data.values[y]) {
                    //console.log(matrix.data.values[y][x], matrix.numberTypes[y][x])
                    if (matrix.data.values[y][x] == 0) {
                        continue
                    } else {
                        let coords = getCoordsByIndexes(x, y)
                        let xCoord = coords[0] + 28
                        let yCoord = coords[1] + 80
                        let value = matrix.data.values[y][x]
                        if (String(value).length == 1) {
                            xCoord = coords[0] + 28
                            yCoord = coords[1] + 80
                            //context.font = "80px Roboto-Light"
                            context.font = "80px Roboto-Light"
                        } else if (String(value).length == 2) {
                            xCoord = coords[0] + 28
                            yCoord = coords[1] + 88
                            //context.font = "36px Roboto-Light"
                            context.font = "36px Roboto-Light"
                        }

                        context.fillStyle = matrix.color;
                        context.fillText(value, xCoord, yCoord)
                    }
                }
            }
        }

        let drawSolving = function() {
            if (solving.visible == false) {
                return
            }
            for (let y in matrix.data.solving) {
                for (let x in matrix.data.solving[y]) {
                    if (matrix.data.values[y][x] != 0 && matrix.data.values[y][x].toString().length == 1) {
                        continue
                    }
                    
                    if (matrix.data.solving[y][x][0] != 0) {
                        // solving-type = number
                        let value = matrix.data.solving[y][x][0]
                        let coords = getCoordsByIndexes(x, y)
                        let xCoord = coords[0] + matrix.cellSize / 2
                        let yCoord = coords[1] + 80
                        context.font = "80px Roboto-Light"
                        context.textAlign = 'center'
                        context.fillStyle = matrix.solvingColor
                        context.fillText(value, xCoord, yCoord)
                    } else {
                        { 
                            // solving-type = central
                            let value = matrix.data.solving[y][x][1].join('')
                            if (value.length != 0) {
                                let fontSize = 20, yDelta = 30
                                if (value.length == 1) {fontSize = 80; yDelta = 80}
                                if (value.length == 2) {fontSize = 70; yDelta = 75}
                                if (value.length == 3) {fontSize = 57; yDelta = 70}
                                if (value.length == 4) {fontSize = 42; yDelta = 67}
                                if (value.length == 5) {fontSize = 32; yDelta = 62}
                                if (value.length == 6) {fontSize = 27; yDelta = 60}
                                if (value.length == 7) {fontSize = 23; yDelta = 59}
                                if (value.length == 8) {fontSize = 21; yDelta = 57}
                                if (value.length == 9) {fontSize = 20; yDelta = 56}
                                let coords = getCoordsByIndexes(x, y)
                                let xCoord = coords[0] + matrix.cellSize / 2
                                let yCoord = coords[1] + yDelta
                                context.font = `${fontSize}px Roboto-Light`
                                context.textAlign = 'center'
                                context.fillStyle = matrix.solvingColor
                                context.fillText(value, xCoord, yCoord)
                            }
                        }
                        {
                            // solving-type = corner
                            let cornerArray = matrix.data.solving[y][x][2]
                            let xDelta = 0, yDelta = 0

                            for (let i in cornerArray) {
                                let value = cornerArray[i]
                                if (i == 0) {xDelta = -35; yDelta = -25}
                                if (i == 1) {xDelta = +35; yDelta = -25}
                                if (i == 2) {xDelta = -35; yDelta = 45}
                                if (i == 3) {xDelta = 35; yDelta = 45}
                                if (i == 4) {break}

                                let coords = getCoordsByIndexes(x, y)
                                let xCoord = coords[0] + matrix.cellSize / 2 + xDelta
                                let yCoord = coords[1] + matrix.cellSize / 2 + yDelta
                                context.font = '30px Roboto-Light'
                                context.textAlign = 'center'
                                context.fillStyle = matrix.solvingColor
                                context.fillText(value, xCoord, yCoord)
                            }
                        }
                    }
                    
                    /* let value = matrix.data.values[y][x]
                    if (String(value).length == 1) {
                        xCoord = coords[0] + 28
                        yCoord = coords[1] + 80
                        
                    } else if (String(value).length == 2) {
                        xCoord = coords[0] + 28
                        yCoord = coords[1] + 88
                        context.font = "36px Roboto-Light"
                    } */

                    
                    
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
            for (let y in matrix.data.twins) {
                for (let x in matrix.data.twins[y]) {
                    x = +x, y = +y
                    let type = matrix.data.twins[y][x]
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

        let drawInequals = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            //let startX, startY, finishX, finishY

            let drawLine = function(startX, startY, finishX, finishY) {
                context.beginPath()
                context.setLineDash([])
                context.lineWidth = matrix.fatLineThickness
                context.moveTo(startX, startY)
                context.lineTo(finishX, finishY)
                context.strokeStyle = matrix.color
                context.stroke()
            }
            for (let y in matrix.data.inequals.horizontal) {
                for (let x in matrix.data.inequals.horizontal[y]) {
                    x = +x, y = +y
                    let type = matrix.data.inequals.horizontal[y][x]
                    let coords = getCoordsByIndexes(x + 1, y)
                    coords[1] = coords[1] + matrix.cellSize / 2
                    let deltaX = matrix.cellSize / 6
                    let deltaY = matrix.cellSize / 6

                    if (type == 0) {
                        continue
                    } else if (type == 1) {
                        //меньше
                        let startX = coords[0] - deltaX
                        let startY = coords[1]
                        let finishX = coords[0] + deltaX
                        let finishY = coords[1] + deltaY

                        drawLine(startX, startY, finishX, finishY)

                        startX = coords[0] - deltaX
                        startY = coords[1]
                        finishX = coords[0] + deltaX
                        finishY = coords[1] - deltaY

                        drawLine(startX, startY, finishX, finishY)
                    } else if (type == 2) {
                        //больше
                        let startX = coords[0] + deltaX
                        let startY = coords[1]
                        let finishX = coords[0] - deltaX
                        let finishY = coords[1] + deltaY

                        drawLine(startX, startY, finishX, finishY)

                        startX = coords[0] + deltaX
                        startY = coords[1]
                        finishX = coords[0] - deltaX
                        finishY = coords[1] - deltaY

                        drawLine(startX, startY, finishX, finishY)
                    }
                }
            }

            for (let y in matrix.data.inequals.vertical) {
                for (let x in matrix.data.inequals.vertical[y]) {
                    x = +x, y = +y
                    let type = matrix.data.inequals.vertical[y][x]
                    let coords = getCoordsByIndexes(x, y + 1)
                    coords[0] = coords[0] + matrix.cellSize / 2
                    let deltaX = matrix.cellSize / 6
                    let deltaY = matrix.cellSize / 6

                    if (type == 0) {
                        continue
                    } else if (type == 3) {
                        //меньше сверху
                        let startX = coords[0]
                        let startY = coords[1] - deltaY
                        let finishX = coords[0] + deltaX
                        let finishY = coords[1] + deltaY

                        drawLine(startX, startY, finishX, finishY)

                        startX = coords[0]
                        startY = coords[1] - deltaY
                        finishX = coords[0] - deltaX
                        finishY = coords[1] + deltaY

                        drawLine(startX, startY, finishX, finishY)
                    } else if (type == 4) {
                        //больше сверху
                        let startX = coords[0]
                        let startY = coords[1] + deltaY
                        let finishX = coords[0] + deltaX
                        let finishY = coords[1] - deltaY

                        drawLine(startX, startY, finishX, finishY)

                        startX = coords[0]
                        startY = coords[1] + deltaY
                        finishX = coords[0] - deltaX
                        finishY = coords[1] - deltaY

                        drawLine(startX, startY, finishX, finishY)
                    }
                }
            }
        }

        let drawCrossLine = function(startX, startY, finishX, finishY, isSelected) {
            //console.log(startX, startY, finishX, finishY)
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            context.beginPath()
            context.setLineDash([2, 5])
            context.moveTo(startX, startY)
            context.lineTo(finishX, finishY)
            context.strokeStyle = matrix.color
            if (isSelected) {
                context.strokeStyle = "#3fe94d"
            }
            context.lineWidth = matrix.thinLineThickness
            context.stroke()
        }

        let drawCross = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            let padding = matrix.padding

            

            let type = matrix.data.cross
            if (type == 0) {
                return
            } else if (type == 1) {
                let startX = 0 + padding
                let startY = canvas.height - padding
                let finishX = canvas.width - padding
                let finishY = 0 + padding

                drawCrossLine(startX, startY, finishX, finishY, false)
            } else if (type == 2) {
                let startX = 0 + padding
                let startY = 0 + padding
                let finishX = canvas.width - padding
                let finishY = canvas.height - padding

                drawCrossLine(startX, startY, finishX, finishY, false)
            } else if (type == 3) {
                {
                    let startX = 0 + padding
                    let startY = canvas.height - padding
                    let finishX = canvas.width - padding
                    let finishY = 0 + padding

                    drawCrossLine(startX, startY, finishX, finishY, false)
                }
                {
                    let startX = 0 + padding
                    let startY = 0 + padding
                    let finishX = canvas.width - padding
                    let finishY = canvas.height - padding

                    drawCrossLine(startX, startY, finishX, finishY, false)
                }
            }
        }

        let drawChains = function() {
            for (let chainArray of matrix.data.chains) {
                //let chainArray = chain.split('-')
                for (let i = 0; i < chainArray.length - 1; i++) {
                    let startX = chainArray[i][0]
                    let startY = chainArray[i][1]
                    let finishX = chainArray[i + 1][0]
                    let finishY = chainArray[i + 1][1]

                    let coords1 = getCoordsByIndexes(startX, startY)
                    let coords2 = getCoordsByIndexes(finishX, finishY)

                    coords1[0] = coords1[0] + Math.round(matrix.cellSize / 2)
                    coords1[1] = coords1[1] + Math.round(matrix.cellSize / 2)
                    coords2[0] = coords2[0] + Math.round(matrix.cellSize / 2)
                    coords2[1] = coords2[1] + Math.round(matrix.cellSize / 2)

                    drawCrossLine(coords1[0], coords1[1], coords2[0], coords2[1], false)
                }
            }
        }

        let drawBlockLable = function(x, y, text) {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            
            context.beginPath()
            context.fillStyle = "#ffffff"
            //context.fillStyle = "#af0ca2"
            context.rect(x + 20, y + 5, 60, 20)
            context.fill()
            let fontSize = 20
            context.font = `${fontSize}px Roboto-Light`
            context.textAlign = 'center'
            context.fillStyle = matrix.color
            context.fillText(text, x + 50, y + 20)
            context.textAlign = 'left'
        }

        let drawBlockOutlines2 = function() {
            for (let obj of matrix.data.blockOutlines) {
                let text = obj.text
                let array = obj.array
                //console.log(array)
                let upLeft = array[0], 
                    upRight = array[0], 
                    downLeft = array[0], 
                    downRight = array[0]
                
                for (let cell of array) {
                    if (cell[0] <= upLeft[0] && cell[1] <= upLeft[1]) {
                        upLeft = cell
                    }
                    if (cell[0] >= upRight[0] && cell[1] <= upRight[1]) {
                        upRight = cell
                    }
                    if (cell[0] <= downLeft[0] && cell[1] >= downLeft[1]) {
                        downLeft = cell
                    }
                    if (cell[0] >= downRight[0] && cell[1] >= downRight[1]) {
                        downRight = cell
                    }
                }
                let cellSize = matrix.cellSize
                let margin = 90

                let upLeftCoords = getCoordsByIndexes(upLeft[0], upLeft[1])
                let upLeftTrueCoords = [
                    upLeftCoords[0] + cellSize - margin,
                    upLeftCoords[1] + cellSize - margin
                ]

                let upRightCoords = getCoordsByIndexes(upRight[0], upRight[1])
                let upRigthTrueCoords = [
                    upRightCoords[0] + margin,
                    upRightCoords[1] + cellSize - margin
                ]

                let downLeftCoords = getCoordsByIndexes(downLeft[0], downLeft[1])
                let downLeftTrueCoords = [
                    downLeftCoords[0] + cellSize - margin,
                    downLeftCoords[1] + margin
                ]

                let downRightCoords = getCoordsByIndexes(downRight[0], downRight[1])
                let downRightTrueCoords = [
                    downRightCoords[0] + margin,
                    downRightCoords[1] + margin
                ]

                //console.log()

                drawCrossLine(upLeftTrueCoords[0], upLeftTrueCoords[1], upRigthTrueCoords[0], upRigthTrueCoords[1], false)
                drawCrossLine(upRigthTrueCoords[0], upRigthTrueCoords[1], downRightTrueCoords[0], downRightTrueCoords[1], false)
                drawCrossLine(downRightTrueCoords[0], downRightTrueCoords[1], downLeftTrueCoords[0], downLeftTrueCoords[1], false)
                drawCrossLine(downLeftTrueCoords[0], downLeftTrueCoords[1], upLeftTrueCoords[0], upLeftTrueCoords[1], false)

                if (text != "") {
                    drawBlockLable(upLeftCoords[0], upLeftCoords[1], text)
                }
            }
        }

        let correctByPoint = function(step, point) {
            //console.log(point)
            let margin = 90
            let size = matrix.cellSize
            let x = step[0]
            let y = step[1]
            let newX, newY
            if (point == 1) {
                newX = x + size - margin
                newY = y + size - margin
            } else if (point == 2) {
                newX = x + margin
                newY = y + size - margin
            } else if (point == 3) {
                newX = x + size - margin
                newY = y + margin
            } else if (point == 4) {
                newX = x + margin
                newY = y + margin
            }
            //console.log([newX, newY])
            return [newX, newY]
        }

        let drawBlockOutlines = function() {
            if (Object.keys(matrix.data.blockOutlines).length == 0) {
                return
            }
            //console.log(matrix.data.blockOutlines)
            for (let obj of matrix.data.blockOutlines) {
                let text = obj.text
                let stepsArray = obj.stepsArray
                let isSelected = obj.isSelected
                
                //let stepsArray = getBlockStepsArray(array)
                //console.log(stepsArray)
                for (let i = 0; i < stepsArray.length - 1; i++) {
                    let startPoint = stepsArray[i][2]
                    let finishPoint = stepsArray[i + 1][2]

                    let startX = stepsArray[i][0]
                    let startY = stepsArray[i][1]
                    let finishX = stepsArray[i + 1][0]
                    let finishY = stepsArray[i + 1][1]

                    let coords1 = correctByPoint(getCoordsByIndexes(startX, startY), startPoint)
                    let coords2 = correctByPoint(getCoordsByIndexes(finishX, finishY), finishPoint)

                    drawCrossLine(coords1[0], coords1[1], coords2[0], coords2[1], isSelected)
                }
                if (text != "") {
                    let coords = getCoordsByIndexes(stepsArray[0][0], stepsArray[0][1])
                    drawBlockLable(coords[0], coords[1], text)
                }
            }
        }

        drawFakeText()
        drawLines()
        drawCross()
        drawChains()
        drawBlockOutlines()
        drawTwins()
        drawInequals()
        drawValues()
        drawSolving()
        drawSelection()
    }
}

let printOutlineList = function() {
    let elem = document.getElementById("block-outline-list")
    elem.innerHTML = ''

    for (let index in matrix.data.blockOutlines) {
        let row = document.createElement('div')
        row.classList.add('block-outline-row')
        row.innerHTML = `Блок ${index} X`

        row.onclick = function() {
            matrix.data.blockOutlines.splice(index, 1)
            printOutlineList()
            matrix.draw()
        }

        row.onmouseover = function() {
            matrix.data.blockOutlines[index].isSelected = true
            matrix.draw()
        }
        
        row.onmouseout = function() {
            matrix.data.blockOutlines[index].isSelected = false
            matrix.draw()
        }

        elem.appendChild(row)
    }
}

let controls = {
    writing: {
        mode: "solving",
        insertMode: "number",
        solvingMode: "central"
    }
}

let solving = {
    visible: true,
    showHide() {
        let turnedValue = !this.visible
        //console.log (turnedValue)
        this.visible = turnedValue
        matrix.draw()
        return this.visible
    },
    remove() {
        matrix.data.solving = createMatrixSolvingArray(matrix.data.rows, matrix.data.columns)
        matrix.draw()
    },
    apply() {
        for (let y in matrix.data.solving) {
            for (let x in matrix.data.solving[y]) {
                let number = matrix.data.solving[y][x][0]
                let centralArray = matrix.data.solving[y][x][1]
                if (number != 0) {
                    matrix.data.solving[y][x] = [0, [], []]
                    matrix.data.values[y][x] = number
                } else if (centralArray.length == 1) {
                    matrix.data.solving[y][x] = [0, [], []]
                    matrix.data.values[y][x] = centralArray[0]
                }
            }
        }
        matrix.draw()
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

/* let createMatrixNumberTypesArray = function(rows, columns) {
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

let createMatrixSolvingArray = function(rows, columns) {
    let array = []
    for (let y = 0; y < rows; y++) {
        let rowArray = []
        for (let x = 0; x < columns; x++) {
            rowArray.push([0,[],[]])
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
    for (let x in matrix.data.borders.horizontalArray[3]) {
        matrix.data.borders.horizontalArray[3][x] = 2
    }
    for (let x in matrix.data.borders.horizontalArray[6]) {
        matrix.data.borders.horizontalArray[6][x] = 2
    }
    for (let y in matrix.data.borders.verticalArray) {
        matrix.data.borders.verticalArray[y][3] = 2
    }
    for (let y in matrix.data.borders.verticalArray) {
        matrix.data.borders.verticalArray[y][6] = 2
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

let createMatrixInequalsArray = function(rows, columns) {
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

let setMatrix = function(columns, rows) {
    matrix.init()
    matrix.data.rows = rows
    matrix.data.columns = columns
    matrix.data.borders = createMatrixBordersObject(rows, columns)
    matrix.data.selection = createMatrixSelectionArray(rows, columns)
    matrix.data.values = createMatrixValuesArray(rows, columns)
    matrix.data.solving = createMatrixSolvingArray(rows, columns)
    //matrix.numberTypes = createMatrixNumberTypesArray(rows, columns)
    matrix.data.twins = createMatrixTwinsArray(rows, columns)
    matrix.data.inequals = {}
    matrix.data.inequals.horizontal = createMatrixInequalsArray(rows, columns)
    matrix.data.inequals.vertical = createMatrixInequalsArray(rows, columns)
    matrix.data.cross = 0
    
    matrix.genArray = []
    
    matrix.data.chains = []
    matrix.data.blockOutlines = []

    printOutlineList()
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

        for (let xIndex = 0; xIndex < matrix.data.columns; xIndex++) {
            if (x <= padding + cellSize * (xIndex + 1)) {
                indexes[0] = xIndex
                break
            }
        }

        for (let yIndex = 0; yIndex < matrix.data.rows; yIndex++) {
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
        let value = matrix.data.selection[indexes[1]][indexes[0]]
        //console.log(matrix.isCtrlPressed)
        if (matrix.isCtrlPressed == false) {
            matrix.deSelectAll()
            //console.log(matrix.data.selection)
        }
        matrix.data.selection[indexes[1]][indexes[0]] = !value
        matrix.draw()
    }
}

let selectionPanelActivate = function() {
    let selectAll = document.getElementById("select-all")
    let deSelectAll = document.getElementById("deselect-all")

    selectAll.onclick = function() {
        matrix.selectAll()
        matrix.draw()
    }

    deSelectAll.onclick = function() {
        matrix.deSelectAll()
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
                matrix.data.borders.verticalArray[y][x] = weight
            } else if (direction == 'right') {
                matrix.data.borders.verticalArray[y][x + 1] = weight
            } else if (direction == 'up') {
                matrix.data.borders.horizontalArray[y][x] = weight
            } else if (direction == 'down') {
                matrix.data.borders.horizontalArray[y + 1][x] = weight
            }
        }

        for (let y in matrix.data.selection) {
            for (let x in matrix.data.selection[y]) {
                if (matrix.data.selection[y][x] == true) {
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

let numberClick = function(number) {
    let focusElem = document.querySelector("*:focus")
    if (focusElem != undefined && focusElem.tagName == "INPUT") {
        return
    }

    let press = function(number, x, y) {

        let writeType = controls.writing.mode
        let insertType = controls.writing.insertMode
        let solvingType = controls.writing.solvingMode

        if (number == 0) {
            matrix.data.values[y][x] = 0
            matrix.data.solving[y][x] = [0, [], []]
            return
        }

        if (writeType == "insert") {
            if (insertType == "number") {
                matrix.data.values[y][x] = number
                matrix.data.solving[y][x] = [0, [], []]
            } else if (insertType == "pair") {
                let currentValue = matrix.data.values[y][x]
                let currentValueLenght = String(currentValue).length
                if (currentValueLenght == 0) {
                    matrix.data.values[y][x] = String(number)
                } else if (currentValueLenght == 1){
                    matrix.data.values[y][x] = currentValue + '' + String(number)
                } else if (currentValueLenght == 2) {
                    matrix.data.values[y][x] = String(currentValue)[1] + String(number)
                }
            }
        } else if (writeType == "solving") {
            let value = matrix.data.values[y][x]
            if (value != 0 && value.toString().length == 1) {
                return
            }
            //console.log('123')
            if (solvingType == "number") {
                matrix.data.solving[y][x] = [number, [], []]
            } else if (solvingType == "central") {
                let currentCentralValue = matrix.data.solving[y][x][1]
                if (matrix.data.solving[y][x][0] != 0) {
                    return
                }
                if (currentCentralValue.length == 0) {
                    matrix.data.solving[y][x][1].push(number)
                } else {
                    let indexOfNumber = matrix.data.solving[y][x][1].indexOf(number)
                    if (indexOfNumber == -1) {
                        matrix.data.solving[y][x][1].push(number)
                        let sortedArray = matrix.data.solving[y][x][1].sort((a, b) => a - b);
                        matrix.data.solving[y][x][1] = sortedArray
                    } else {
                        matrix.data.solving[y][x][1].splice(indexOfNumber, 1)
                    }
                }
            } else if (solvingType == "corner") {
                let currentCentralValue = matrix.data.solving[y][x][2]
                if (matrix.data.solving[y][x][0] != 0) {
                    return
                }
                if (currentCentralValue.length == 0) {
                    matrix.data.solving[y][x][2].push(number)
                } else {
                    let indexOfNumber = matrix.data.solving[y][x][2].indexOf(number)
                    if (indexOfNumber == -1) {
                        matrix.data.solving[y][x][2].push(number)
                        /* let sortedArray = matrix.data.solving[y][x][1].sort((a, b) => a - b);
                        matrix.data.solving[y][x][1] = sortedArray */
                    } else {
                        matrix.data.solving[y][x][2].splice(indexOfNumber, 1)
                    }
                }
            }
        }
    }
    
    for (let y in matrix.data.selection) {
        for (let x in matrix.data.selection[y]) {
            if (matrix.data.selection[y][x] == true) {
                press(number, x, y)
            }
        }
    }
}

let numbersPanelActivate = function() {
    
    let numbersActivate = function() {
        let numButtons = document.querySelectorAll("#numpad .num")
    
        for (let numButton of numButtons) {
            numButton.onclick = function() {
                let num = +(numButton.getAttribute("key"))
                numberClick(num)
                matrix.draw()
            }
        }
    }

    let controlsActivate = function() {
        let insertButton = document.getElementById("insert-writing-mode")
        let solvingButton = document.getElementById("solving-writing-mode")
        let insertPanel = document.getElementById("insert-mode-types")
        let solvingPanel = document.getElementById("solving-mode-types")

        insertButton.onclick = function() {
            solvingPanel.style.display = "none"
            insertPanel.style.display = "inline-block"
            solvingButton.classList.remove("writing-mode-active")
            insertButton.classList.add("writing-mode-active")

            controls.writing.mode = "insert"
        }

        solvingButton.onclick = function() {
            insertPanel.style.display = "none"
            solvingPanel.style.display = "inline-block"
            insertButton.classList.remove("writing-mode-active")
            solvingButton.classList.add("writing-mode-active")

            controls.writing.mode = "solving"
        }

        let insertModeNumber = document.getElementById("insert-mode-number")
        let insertModePair = document.getElementById("insert-mode-pair")

        insertModeNumber.onclick = function() {
            insertModePair.classList.remove("writing-mode-elem-active")
            insertModeNumber.classList.add("writing-mode-elem-active")

            controls.writing.insertMode = "number"
        }

        insertModePair.onclick = function() {
            insertModeNumber.classList.remove("writing-mode-elem-active")
            insertModePair.classList.add("writing-mode-elem-active")

            controls.writing.insertMode = "pair"
        }

        let solvingModeNumber = document.getElementById("solving-mode-number")
        let solvingModeCentral = document.getElementById("solving-mode-central")
        let solvingModeCorner = document.getElementById("solving-mode-corner")

        solvingModeNumber.onclick = function() {
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.add("writing-mode-elem-active")

            controls.writing.solvingMode = "number"
        }

        solvingModeCentral.onclick = function() {
            solvingModeCentral.classList.add("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "central"
        }

        solvingModeCorner.onclick = function() {
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModeCorner.classList.add("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "corner"
        }

        let showHideSolving = document.getElementById("show-hide-solving")
        let removeSolving = document.getElementById("remove-solving")
        let applySolving = document.getElementById("apply-solving")

        showHideSolving.onclick = function() {
            if (solving.showHide()) {
                //console.log("active")
                showHideSolving.classList.add("show-hide-solving-active")
            } else {
                //console.log("not active")
                showHideSolving.classList.remove("show-hide-solving-active")
            }
        }
        removeSolving.onclick = solving.remove
        applySolving.onclick = solving.apply
    }
    
    numbersActivate()
    controlsActivate()
}

let upInfoActivate = function() {
    let upInfoCanvas = document.getElementById("up-info-canvas")
    let UICcontext = upInfoCanvas.getContext("2d")

    let upInfoNumber = document.getElementById("up-info-number")
    let upInfoButton = document.getElementById("up-info-button")

    let canvas = matrix.elem
    let context = canvas.getContext("2d")

    upInfoCanvas.height = 100
    upInfoCanvas.width = 1000

    upInfoButton.onclick = function() {
        upInfoCanvas.height = 100
        upInfoCanvas.width = 1000
        let infoNumber = upInfoNumber.value

        let writeToUpInfoCanvas = function() {
            UICcontext.font = "60px Roboto-Light"
            UICcontext.fillStyle = matrix.color
            UICcontext.fillText(infoNumber, 20, 75)

        }
        let copyUICtoCanvas = function() {
            let copyCanvas = canvas.cloneNode(true)
            copyCanvas.id = "copy-canvas"
            copyCanvas.width = canvas.width
            copyCanvas.height = canvas.height
            let copyCanvasContext = copyCanvas.getContext("2d")
            copyCanvasContext.drawImage(canvas, 0, 0)

            let newInfoWidth = canvas.width
            let newPanelHeight = Math.round(newInfoWidth / 10)
            let newInfoHeight = newPanelHeight
            let canvasHeight = canvas.height
            canvas.height = canvasHeight + newInfoHeight

            context.drawImage(copyCanvas, 0, newPanelHeight)
            context.drawImage(upInfoCanvas, 0, 0, newInfoWidth, newInfoHeight)
            
            copyCanvas.remove()
        }

        writeToUpInfoCanvas()
        copyUICtoCanvas()
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
            DICcontext.font = "60px Roboto-Light"
            DICcontext.fillStyle = matrix.color
            DICcontext.fillText(price, 20, 75)

            DICcontext.font = "40px Roboto-Light"
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
                    matrix.data.twins[y - 1][x - 1] = type
                }
            } else if (direction == 'up-right') {
                if (x == matrix.data.columns - 1 || y == 0) {
                    return
                } else {
                    matrix.data.twins[y - 1][x] = type
                }
            } else if (direction == 'down-left') {
                if (x == 0 || y == matrix.data.rows - 1) {
                    return
                } else {
                    matrix.data.twins[y][x - 1] = type
                }
            } else if (direction == 'down-right') {
                if (x == matrix.data.columns - 1 || y == matrix.data.rows - 1) {
                    return
                } else {
                    matrix.data.twins[y][x] = type
                }
            }
        }

        for (let y in matrix.data.selection) {
            for (let x in matrix.data.selection[y]) {
                if (matrix.data.selection[y][x] == true) {
                    applyTwins(+x, +y)
                }
            }
        }
        matrix.draw()
        //console.log(matrix.data.twins)
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
            matrix.data.cross = type
            matrix.draw()
            
        }
    }
}

let generationPanelActivate = function() {
    let button = document.getElementById("generation-button")
    button.onclick = function() {
        let genType = document.querySelector('*[name="generation-type"]:checked').value
        if (genType == "from-zero") {
            for (let y in matrix.data.values) {
                for (let x in matrix.data.values[y]) {
                    matrix.data.values[y][x] = 0
                }
            }
        }

        let valuesCopy = JSON.parse(JSON.stringify(matrix.data.values))
        
        values = ultraGen.fillCandidates(valuesCopy, matrix.data.rows, true)
        matrix.genArray = []
        ultraGen.getFromPattern(values, matrix.data.rows, matrix.genArray, 1)
        //console.log(ultraGen.toNormalArray(array))
        //console.log(matrix.genArray)
        if (matrix.genArray.length == 0) {
            console.log('0 решений')
        }
        // let max = matrix.genArray.length - 1
        // let randomIndex = Math.floor(Math.random() * max) + 0
        matrix.data.values = matrix.genArray[0]

        /* for (let y in matrix.numberTypes) {
            for (let x in matrix.numberTypes[y]) {
                matrix.numberTypes[y][x] = 1
            }
        } */

        matrix.draw()
    }
}

let keyboardEventsActivate = function() {
    document.body.onkeyup = function(event) {
        
        let key = event.key

        if (key == "Control") {
            matrix.isCtrlPressed = false
        }

        let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
        if (numbers.indexOf(key) != -1) {
            numberClick(+key)
            matrix.draw()
        }
    }

    document.body.onkeydown = function(event) {
        let key = event.key

        //console.log(key)

        if (key == "Escape") {
            matrix.deSelectAll()
            matrix.draw()
        }

        if (key == "Control") {
            matrix.isCtrlPressed = true
        }

        if (key == "Delete" || key == "Backspace") {
            numberClick(0)
            matrix.draw()
        }

        if (key == "a") {
            if (matrix.isCtrlPressed == true) {
                matrix.selectAll()
                matrix.draw()
            }
        }

        if (key == "ArrowRight" || key == "ArrowLeft" || key == "ArrowUp" || key == "ArrowDown") {
            let amountOfSelectionCells = 0
            for (let y in matrix.data.selection) {
                for (let x in matrix.data.selection[y]) {
                    if (matrix.data.selection[y][x] == true) {
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
            matrix.deSelectAll()
            matrix.draw()
        }
    }
}

let solvingsPanelActivate = function() {
    let button = document.getElementById("check-solvings-amount")
    let info = document.getElementById("solvings-info")

    button.onclick = function() {
        let valuesCopy = JSON.parse(JSON.stringify(matrix.data.values))
            
        values = ultraGen.fillCandidates(valuesCopy, matrix.data.rows, false)
        matrix.genArray = []
        ultraGen.getFromPattern(values, matrix.data.rows, matrix.genArray, 2)

        if (matrix.genArray.length == 0) {
            info.classList.remove("solvings-info-gray")
            info.classList.remove("solvings-info-green")
            info.classList.remove("solvings-info-red")

            info.classList.add("solvings-info-red")
            info.innerHTML = "0"
        } else if (matrix.genArray.length == 1) {
            info.classList.remove("solvings-info-gray")
            info.classList.remove("solvings-info-green")
            info.classList.remove("solvings-info-red")

            info.classList.add("solvings-info-green")
            info.innerHTML = "1"
        } else if (matrix.genArray.length > 1) {
            info.classList.remove("solvings-info-gray")
            info.classList.remove("solvings-info-green")
            info.classList.remove("solvings-info-red")

            info.classList.add("solvings-info-red")
            info.innerHTML = ">1"
        }
    }
}

let chainPanelActivate = function() {
    let chainInput = document.getElementById('chain-text')
    let chainButton = document.getElementById('chain-button')

    chainButton.onclick = function() {
        let value = chainInput.value
        matrix.data.chains.push(value.split('-'))
        matrix.draw()
    }
}



let blockOutlinePanelActivate = function() {
    let textElem = document.getElementById('block-outline-text')
    let button = document.getElementById('block-outline-button')

    button.onclick = function() {
        let text = textElem.value
        let array = matrix.getSelected()
        let stepsArray = getBlockStepsArray(array)
        let isSelected = false
        matrix.data.blockOutlines.push({text, stepsArray, isSelected})
        matrix.draw()
        printOutlineList()
    }
}

let inequalityPanelActivate = function() {
    let inequalityHidden = document.getElementById("set-inequality-hidden")
    let inequalityLeft = document.getElementById("set-inequality-left")
    let inequalityRight = document.getElementById("set-inequality-right")
    let inequalityUp = document.getElementById("set-inequality-up")
    let inequalityDown = document.getElementById("set-inequality-down")

    let setInequality = function(type) {
        let getDirection = function() {
            let direction = document.querySelector('*[name="inequality-position"]:checked').value
            return direction
        }
        let direction = getDirection()
        //console.log(direction)
        let applyInequality = function(x, y) {
            //console.log("x = " + x + " y = " + y + " direction = " + direction + " type = " + type)
            if (direction == 'left') {
                if (x == 0 || type == 3 || type == 4) {
                    return
                } else {
                    matrix.data.inequals.horizontal[y][x - 1] = type
                }
            } else if (direction == 'right') {
                if (x == matrix.data.columns - 1 || type == 3 || type == 4) {
                    return
                } else {
                    matrix.data.inequals.horizontal[y][x] = type
                }
            } else if (direction == 'up') {
                if (y == 0 || type == 1 || type == 2) {
                    return
                } else {
                    matrix.data.inequals.vertical[y - 1][x] = type
                }
            } else if (direction == 'down') {
                if (y == matrix.data.rows - 1 || type == 1 || type == 2) {
                    return
                } else {
                    matrix.data.inequals.vertical[y][x] = type
                }
            }
        }

        for (let y in matrix.data.selection) {
            for (let x in matrix.data.selection[y]) {
                if (matrix.data.selection[y][x] == true) {
                    applyInequality(+x, +y)
                }
            }
        }
        matrix.draw()
        //console.log(matrix.data.twins)
    }

    inequalityHidden.onclick = function() {
        setInequality(0)
    }
    inequalityLeft.onclick = function() {
        setInequality(1)
    }
    inequalityRight.onclick = function() {
        setInequality(2)
    }
    inequalityUp.onclick = function() {
        setInequality(3)
    }
    inequalityDown.onclick = function() {
        setInequality(4)
    }
}

let metaPanelActivate = function () {
    let downloadJSONbutton = document.getElementById("download-json")
    let writeFile = function(name, value) {
        let download = document.createElement("a");
        download.href = "data:text/plain;content-disposition=attachment;filename=file," + value;
        download.download = name;
        download.style.display = "none";
        download.id = "download"; document.body.appendChild(download);
        document.getElementById("download").click();
        document.body.removeChild(download);
    }
    
    downloadJSONbutton.onclick = function() {
        writeFile("data.json", JSON.stringify(matrix.data));
    }
}



matrix.init()
matrix.draw()

canvasActivate()
numbersPanelActivate()
keyboardEventsActivate()
mouseEventsActivate()

setTimeout(function() {
    matrix.draw()
}, 200)



