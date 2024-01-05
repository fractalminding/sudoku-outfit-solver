
let matrix = {
    init() {
        this.elem = document.getElementById("board-canvas")
        this.color = "#50504e"
        this.solvingColor = "#3369b1"
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
                            //context.font = "80px Roboto-Medium"
                            context.font = "80px Roboto-Medium"
                        } else if (String(value).length == 2) {
                            xCoord = coords[0] + 28
                            yCoord = coords[1] + 88
                            //context.font = "36px Roboto-Medium"
                            context.font = "36px Roboto-Medium"
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
                        context.font = "80px Roboto-Medium"
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
                                context.font = `${fontSize}px Roboto-Medium`
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
                                context.font = '30px Roboto-Medium'
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
                        context.font = "36px Roboto-Medium"
                    } */

                    
                    
                }
            }
        }

        let drawFakeText = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            context.font = "80px Roboto-Medium"
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
            context.font = `${fontSize}px Roboto-Medium`
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

let controls = {
    writing: {
        mode: "solving",
        insertMode: "number",
        solvingMode: "number"
    },
    selectMode: "one"
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
        if (matrix.isCtrlPressed == false && controls.selectMode == "one") {
            matrix.deSelectAll()
            //console.log(matrix.data.selection)
        }
        matrix.data.selection[indexes[1]][indexes[0]] = !value
        matrix.draw()
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
            //matrix.data.values[y][x] = 0
            matrix.data.solving[y][x] = [0, [], []]
            return
        }

        if (number == 999) {
            //write all candidates
            let value = matrix.data.values[y][x]
            if (value != 0) {
                return
            }
            let candidatesArray = []
            for (let i = 1; i <= matrix.data.rows && i <= 9; i++) {
                candidatesArray.push(i)
            }
            matrix.data.solving[y][x][1] = candidatesArray


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

        let numPad = document.getElementById("numpad")
        let paintingPad = document.getElementById("painting-pad")

        let numbersMode = function() {
            paintingPad.style.display = "none"
            numPad.style.display = "table"
        }

        let paintingMode = function() {
            numPad.style.display = "none"
            paintingPad.style.display = "table"
        }

        let solvingModeNumber = document.getElementById("solving-mode-number")
        let solvingModeCentral = document.getElementById("solving-mode-central")
        let solvingModeCorner = document.getElementById("solving-mode-corner")
        let solvingModePainting = document.getElementById("solving-mode-painting")

        solvingModeNumber.onclick = function() {
            numbersMode()
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.add("writing-mode-elem-active")
            solvingModePainting.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "number"
        }

        solvingModeCentral.onclick = function() {
            numbersMode()
            solvingModeCentral.classList.add("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")
            solvingModePainting.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "central"
        }

        solvingModeCorner.onclick = function() {
            numbersMode()
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModeCorner.classList.add("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")
            solvingModePainting.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "corner"
        }

        solvingModePainting.onclick = function() {
            paintingMode()
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModePainting.classList.add("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "painting"
        }

    }
    
    numbersActivate()
    controlsActivate()
}

let selectModesActivate = function() {

    let selectModeOne = document.getElementById("select-mode-one")
    let selectModeMulti = document.getElementById("select-mode-multi")
    let selectModeAll = document.getElementById("select-mode-all")

    selectModeOne.onclick = function() {
        selectModeMulti.classList.remove("select-mode-elem-active")
        selectModeOne.classList.add("select-mode-elem-active")
        
        controls.selectMode = "one"
    }

    selectModeMulti.onclick = function() {
        selectModeOne.classList.remove("select-mode-elem-active")
        selectModeMulti.classList.add("select-mode-elem-active")

        controls.selectMode = "multi"
    }

    selectModeAll.onclick = function() {
        matrix.selectAll()
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
        if (event.target == document.body) {
            matrix.deSelectAll()
            matrix.draw()
        }
    }
}

let headerActivate = function() {

    let menuIconElem = document.getElementById("menu-icon")
    let menuElem = document.getElementById("menu")
    let helpIconElem = document.getElementById("help-icon")
    let helpElem = document.getElementById("help")
    let helpOk = document.getElementById("help-ok")

    let menuActivate = function() {
        menuIconElem.onclick = function() {
            
            let menuVisibility = menuElem.style.display
            
            if (menuVisibility == "block") {
                menuElem.style.display = "none"
            } else {
                helpElem.style.display = "none"
                menuElem.style.display = "block"
            }
        }
    } 

    

    let helpActivate = function() {
        helpIconElem.onclick = helpOk.onclick = function() {
            
            let helpVisibility = helpElem.style.display
            
            if (helpVisibility == "none") {
                helpElem.style.display = "block"
                menuElem.style.display = "none"
            } else {
                helpElem.style.display = "none"
            }
        }
    }

    let nameActivate = function() {
        let nameElem = document.getElementById("puzzle-name")
        nameElem.innerHTML = `#${matrix.data.name}`
    }
    
    menuActivate()
    nameActivate()
    helpActivate()
}

let font = new FontFace("Roboto-Medium", "url(roboto/Roboto-Medium.ttf)");
            
font.load().then(function () {
    // Ready to use the font in a canvas context
    matrix.init()
    matrix.draw()

    headerActivate()
    canvasActivate()
    numbersPanelActivate()
    selectModesActivate()
    keyboardEventsActivate()
    mouseEventsActivate()
});

/* setTimeout(function() {
    matrix.draw()
}, 200) */