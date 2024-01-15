"use strict"
let matrix = {
    elem: {},
    color: '',
    solvingColor: '',
    cellSize: 0,
    padding: 0,
    data: {},
    selection: [],
    isCtrlPressed: false,
    thinLineThickness: 0,
    fatLineThickness: 0,
    init() {
        this.elem = document.getElementById("board-canvas")
        this.color = "#50504e"
        this.solvingColor = "#3369b1"
        let canvas = this.elem
        this.cellSize = 100
        this.padding = 10
        canvas.height = 0
        canvas.width = 0
        matrix.thinLineThickness = 2
        matrix.fatLineThickness = 5

        this.data = JSON.parse(data)
        matrix.selection = matrix.createMatrixSelectionArray(matrix.data.rows, matrix.data.columns)
        this.data.painting = this.createPaintingArray(this.data.rows, this.data.columns)

        this.solvingStack.step()

    },
    createMatrixSelectionArray(rows, columns) {
        let array = []
        for (let y = 0; y < rows; y++) {
            let rowArray = []
            for (let x = 0; x < columns; x++) {
                rowArray.push(false)
            }
            array.push(rowArray)
        }
        return array
    },
    createPaintingArray(rows, columns) {
        let array = []
        for (let y = 0; y < rows; y++) {
            let rowArray = []
            for (let x = 0; x < columns; x++) {
                rowArray.push([])
            }
            array.push(rowArray)
        }
        return array
    },
    solvingStack: {
        array: [],
        maxLength: 50,
        currentIndex: 0,
        maxIndex: 0,
        step() {
            // when user inputs solving
            this.removeTail()
            this.pushSolving()
            let lenght = this.array.length
            if (lenght > this.maxLength) {
                this.array.shift()
            }
            lenght = this.array.length
            this.currentIndex = this.maxIndex = lenght - 1
        },
        back() {
            // when user taps back arrow
            if (this.currentIndex <= 0) {
                return
            }
            //console.log(this)
            this.currentIndex -= 1
            this.useSolving()
            matrix.draw()
        },
        forward() {
            // when user taps forward arrow
            if (this.currentIndex >= this.maxIndex) {
                return
            }
            this.currentIndex += 1
            this.useSolving()
            matrix.draw()
        },
        removeTail() {
            // it removes unwanted (old) solutions
            this.array.splice(this.currentIndex + 1)
        },
        pushSolving() {
            // push new solving state to array
            let solvingState = JSON.parse(JSON.stringify(matrix.data.solving))
            this.array.push(solvingState)
        },
        useSolving() {
            // push solving state to matrix.data
            let solvingState = JSON.parse(JSON.stringify(this.array[this.currentIndex]))
            matrix.data.solving = solvingState
        }
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

        matrix.selection[y][x] = false
        matrix.selection[targetY][targetX] = true
        matrix.draw()
    },
    deSelectAll() {
        for (let y in this.selection) {
            for (let x in this.selection[y]) {
                this.selection[y][x] = false
            }
        }
    },
    selectAll() {
        for (let y in this.selection) {
            for (let x in this.selection[y]) {
                this.selection[y][x] = true
            }
        }
    },
    getSelected() {
        let array = matrix.selection
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
    getCoordsByIndexes(x, y) {
        let padding = matrix.padding
        let cellSize = matrix.cellSize
        let coords = [0, 0]
        coords[0] = padding + x * cellSize
        coords[1] = padding + y * cellSize

        return coords
    },
    draw() {
        let canvas = this.elem
        let cellSize = matrix.cellSize
        let padding = matrix.padding
        //let lineWidth = matrix.lineWidth
        canvas.height = this.data.rows * cellSize + padding * 2
        canvas.width = this.data.columns * cellSize + padding * 2
        let context = canvas.getContext("2d")

        

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
            let drawRect = function(x, y) {
                let canvas = matrix.elem
                let context = canvas.getContext("2d")
                let coords = matrix.getCoordsByIndexes(x, y)
                let canvasX = coords[0]
                let canvasY = coords[1]
                context.fillStyle = "rgba(108, 189, 244, 0.2)"; //(108 189 244 / 65%)
                context.fillRect (canvasX, canvasY, matrix.cellSize, matrix.cellSize);
            }
            let drawFrame = function(x, y, context) {
                let drawSideLine = function(side, context, x, y) {
                    let coords = matrix.getCoordsByIndexes(x, y)
                    let canvasX = coords[0]
                    let canvasY = coords[1]
                    context.globalAlpha = 0.4
                    context.strokeStyle = "rgb(108, 189, 244)"
                    context.lineWidth = 20

                    let points = {
                        // contains canvas coordinates of corners of cell
                        "upLeft": [canvasX, canvasY],
                        "upRight": [canvasX + matrix.cellSize, canvasY],
                        "downLeft": [canvasX, canvasY + matrix.cellSize],
                        "downRight": [canvasX + matrix.cellSize, canvasY + matrix.cellSize]
                    }
                    if (side == "up") {
                        let start = points.upLeft
                        let end = points.upRight
                        context.moveTo(start[0], start[1])
                        context.lineTo(end[0], end[1])
                    }
                    if (side == "down") {
                        let start = points.downLeft
                        let end = points.downRight
                        context.moveTo(start[0], start[1])
                        context.lineTo(end[0], end[1])
                    }
                    if (side == "left") {
                        let start = points.upLeft
                        let end = points.downLeft
                        context.moveTo(start[0], start[1])
                        context.lineTo(end[0], end[1])
                    }
                    if (side == "right") {
                        let start = points.upRight
                        let end = points.downRight
                        context.moveTo(start[0], start[1])
                        context.lineTo(end[0], end[1])
                    }
                }

                let nextCellsSelected = function(x, y) {
                    // returns object of 4 elems (up, down, left, right)
                    // true means that next block in that side is selected
                    let check = function(side, x, y) {
                        if (side == "up") {
                            if (y == 0) {
                                return false
                            }
                            return matrix.selection[y - 1][x]
                        }
                        if (side == "down") {
                            if (y == matrix.data.rows - 1) {
                                return false
                            }
                            //console.log(x, y)
                            return matrix.selection[y + 1][x]
                        }
                        if (side == "left") {
                            if (x == 0) {
                                return false
                            }
                            return matrix.selection[y][x - 1]
                        }
                        if (side == "right") {
                            if (x == matrix.data.rows - 1) {
                                return false
                            }
                            return matrix.selection[y][x + 1]
                        }
                    }
                    return {
                        "up": check("up", x, y), 
                        "down": check("down", x, y),
                        "left": check("left", x, y),
                        "right": check("right", x, y)
                    }
                }

                let falseSides = nextCellsSelected(x, y)
                
                if (!falseSides.up) {drawSideLine("up", context, x, y)}
                if (!falseSides.down) {drawSideLine("down", context, x, y)}
                if (!falseSides.left) {drawSideLine("left", context, x, y)}
                if (!falseSides.right) {drawSideLine("right", context, x, y)}
            }
            let drawRects = function() {
                let selection = matrix.selection
                for (let y in selection) {
                    for (let x in selection[y]) {
                        if (selection[y][x] == true) {
                            drawRect(x, y)
                        }
                    }
                }
            }
            let drawFrames = function() {
                let canvas = matrix.elem
                let context = canvas.getContext("2d")
                context.beginPath()

                let selection = matrix.selection
                for (let y in selection) {
                    for (let x in selection[y]) {
                        if (selection[y][x] == true) {
                            drawFrame(+x, +y, context)
                        }
                    }
                }
                context.lineCap = "round"
                context.stroke()
            }

            drawRects()
            drawFrames()
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
                        let coords = matrix.getCoordsByIndexes(x, y)
                        let xCoord = coords[0] + 28
                        let yCoord = coords[1] + 80
                        let value = matrix.data.values[y][x]
                        if (String(value).length == 1) {
                            xCoord = coords[0] + 28
                            yCoord = coords[1] + 80
                            //context.font = "80px Roboto-Medium-numbers-only"
                            context.font = "80px Roboto-Medium-numbers-only"
                        } else if (String(value).length == 2) {
                            xCoord = coords[0] + 28
                            yCoord = coords[1] + 88
                            //context.font = "36px Roboto-Medium-numbers-only"
                            context.font = "36px Roboto-Medium-numbers-only"
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
                        let coords = matrix.getCoordsByIndexes(x, y)
                        let xCoord = coords[0] + matrix.cellSize / 2
                        let yCoord = coords[1] + 80
                        context.font = "80px Roboto-Medium-numbers-only"
                        context.textAlign = 'center'
                        context.fillStyle = matrix.solvingColor
                        context.fillText(value, xCoord, yCoord)
                    } else {
                        { 
                            // solving-type = central

                            let write = function(
                                mode, context, matrix, value
                            ) {
                                let writeRow = function(
                                    context, fontSize, color, 
                                    value, xCoord, yCoord
                                ) {
                                    context.font = `${fontSize}px Roboto-Medium-numbers-only`
                                    context.textAlign = 'center'
                                    context.fillStyle = color
                                    context.fillText(value, xCoord, yCoord)
                                }
                                
                                let fontSize = 32
                                // delta is shift by y from top of cell
                                let oneRowDelta = 62
                                let twoRowsDelta1 = 45
                                let twoRowsDelta2 = 75
                                let coords = matrix.getCoordsByIndexes(x, y)
                                let xCoord = coords[0] + matrix.cellSize / 2
                                
                                if (mode == "one-row") {
                                    let yCoord = coords[1] + oneRowDelta
                                    writeRow(
                                        context, fontSize, matrix.solvingColor, 
                                        value, xCoord, yCoord
                                    )
                                } else {
                                    let yCoord1 = coords[1] + twoRowsDelta1
                                    let yCoord2 = coords[1] + twoRowsDelta2
                                    let lengthOfString1 = Math.ceil(value.length / 2)
                                    let string1 = value.split('').slice(0, lengthOfString1).join('')
                                    let string2 = value.split('').slice(lengthOfString1).join('')
                                    writeRow(
                                        context, fontSize, matrix.solvingColor, 
                                        string1, xCoord, yCoord1
                                    )
                                    writeRow(
                                        context, fontSize, matrix.solvingColor, 
                                        string2, xCoord, yCoord2
                                    )
                                }

                                
                            }
                            let value = matrix.data.solving[y][x][1].join('')
                            if (value.length != 0) {
                                if (value.length <= 5) {
                                    write(
                                        "one-row", context, matrix, value
                                    )
                                } else {
                                    write(
                                        "two-rows", context, matrix, value
                                    )
                                }
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

                                let coords = matrix.getCoordsByIndexes(x, y)
                                let xCoord = coords[0] + matrix.cellSize / 2 + xDelta
                                let yCoord = coords[1] + matrix.cellSize / 2 + yDelta
                                context.font = '30px Roboto-Medium-numbers-only'
                                context.textAlign = 'center'
                                context.fillStyle = matrix.solvingColor
                                context.fillText(value, xCoord, yCoord)
                            }
                        }
                    }
                }
            }
        }

        /* let drawFakeText = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")
            context.font = "80px Roboto-Medium-numbers-only"
            context.fillStyle = matrix.color;
            context.fillText("123jh1j2h31k2j3h", 10, 10)
            canvas.width = canvas.width
        } */

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
                    let coords = matrix.getCoordsByIndexes(x + 1, y + 1)
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
                    let coords = matrix.getCoordsByIndexes(x + 1, y)
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
                    let coords = matrix.getCoordsByIndexes(x, y + 1)
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

                    let coords1 = matrix.getCoordsByIndexes(startX, startY)
                    let coords2 = matrix.getCoordsByIndexes(finishX, finishY)

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
            context.font = `${fontSize}px Roboto-Medium-numbers-only`
            context.textAlign = 'center'
            context.fillStyle = matrix.color
            context.fillText(text, x + 50, y + 20)
            context.textAlign = 'left'
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

                    let coords1 = correctByPoint(matrix.getCoordsByIndexes(startX, startY), startPoint)
                    let coords2 = correctByPoint(matrix.getCoordsByIndexes(finishX, finishY), finishPoint)

                    drawCrossLine(coords1[0], coords1[1], coords2[0], coords2[1], isSelected)
                }
                if (text != "") {
                    let coords = matrix.getCoordsByIndexes(stepsArray[0][0], stepsArray[0][1])
                    drawBlockLable(coords[0], coords[1], text)
                }
            }
        }

        let drawPainting = function() {
            let canvas = matrix.elem
            let context = canvas.getContext("2d")

            for (let y in matrix.data.painting) {
                for (let x in matrix.data.painting[y]) {

                    let paintingArray = matrix.data.painting[y][x]
                    let length = paintingArray.length
                    if (paintingArray.lenght == 0) {
                        return
                    }

                    let points = painting.getPoints(length)
                    for (let row in points) {
                        let color = painting.colors[paintingArray[row]]
                        context.fillStyle = color;
                        context.beginPath()
                        for (let n in points[row]) {
                            
                            let point = points[row][n]
                            let coords = matrix.getCoordsByIndexes(x, y)
                            let canvasX = coords[0] + point[0] * matrix.cellSize
                            let canvasY = coords[1] + point[1] * matrix.cellSize
                            
                            if (n = 0) {
                                context.moveTo(canvasX, canvasY)
                            } else {
                                context.lineTo(canvasX, canvasY)
                            }
                        }
                        context.fill()
                    }
                }
            }
        }

        drawPainting()
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


let canvasActivate = function(matrix, controls) {

    let getIndexesByCoords = function(x, y, matrix) {
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

    let isCanvasEdge = function(x, y, matrix) {
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

    let getCoordsOfPointOnCanvas = function(event, device, matrix) {
        let canvas = matrix.elem
        let xClient
        let yClient
        let x = 0, y = 0
        if (device == "desktop") {
            xClient = event.offsetX
            yClient = event.offsetY
            
        } else {
            let r = canvas.getBoundingClientRect();
            xClient = event.targetTouches[0].clientX - r.left;
            yClient = event.targetTouches[0].clientY - r.top;
        }
        let clientWidth = canvas.clientWidth
        let clientHeight = canvas.clientHeight
        
        if (xClient != 0) {
            x = Math.round(canvas.width * xClient / clientWidth)
        }
        if (yClient != 0) {
            y = Math.round(canvas.height * yClient / clientHeight)
        }
        return [x, y]
    }

    let paintingSet = new Set

    let paintingSelection = {
        setOfCells: paintingSet,
        activity: false
    }
    

    let canvasMouseDown = function(
        event, paintingSelection, device, isCanvasEdge, matrix, 
        getCoordsOfPointOnCanvas, getIndexesByCoords, controls
    ) {
        event.preventDefault()

        paintingSelection.setOfCells.clear()
        paintingSelection.activity = true
        
        let canvasCoords = getCoordsOfPointOnCanvas(event, device, matrix)
        
        let x = canvasCoords[0]
        let y = canvasCoords[1]

        if (isCanvasEdge(x, y, matrix)) {
            return false
        }
        let indexes = getIndexesByCoords(x, y, matrix)
        let value = matrix.selection[indexes[1]][indexes[0]]
        if (matrix.isCtrlPressed == false && controls.selectMode == "one") {
            matrix.deSelectAll()

        }
        matrix.selection[indexes[1]][indexes[0]] = !value
        matrix.draw()
    }
    let canvasMouseMove = function(
            event, paintingSelection, device, matrix, isCanvasEdge,
            getCoordsOfPointOnCanvas, getIndexesByCoords
    ) {
        event.preventDefault()

        if (!paintingSelection.activity) {
            return
        }
        let canvasCoords = getCoordsOfPointOnCanvas(event, device, matrix)
        let x = canvasCoords[0]
        let y = canvasCoords[1]
        let indexes = getIndexesByCoords(x, y, matrix)
        if (isCanvasEdge(x, y, matrix)) {
            return false
        }

        matrix.selection[indexes[1]][indexes[0]] = true
        matrix.draw()
    }
    let canvasMouseUp = function(paintingSelection) {
        paintingSelection.activity = false
    }
    let canvas = matrix.elem
    let showCanvas = function(matrix) {
        let canvas = matrix.elem
        canvas.style.display = "block"
    }
    
    canvas.onmousedown = (event) => canvasMouseDown(
        event, paintingSelection, "desktop", isCanvasEdge, matrix, 
        getCoordsOfPointOnCanvas, getIndexesByCoords, controls
    )
        
    canvas.addEventListener("touchstart", (event) => canvasMouseDown(
        event, paintingSelection, "mobile", isCanvasEdge, matrix, 
        getCoordsOfPointOnCanvas, getIndexesByCoords, controls
    ), {passive: false})
        
    canvas.onmouseup = canvas.onmouseleave = () => canvasMouseUp(
        paintingSelection
    )

    canvas.addEventListener("touchend", () =>
        canvasMouseUp(paintingSelection)
    )

    canvas.onmousemove = (event) => canvasMouseMove(
        event, paintingSelection, "desktop", matrix, isCanvasEdge,
        getCoordsOfPointOnCanvas, getIndexesByCoords
    )
    
    canvas.addEventListener("touchmove", (event) => canvasMouseMove(
        event, paintingSelection, "mobile", matrix, isCanvasEdge,
        getCoordsOfPointOnCanvas, getIndexesByCoords
    ), {passive: false})
    
    showCanvas(matrix)
}

let numberClick = function(number) {
    let focusElem = document.querySelector("*:focus")
    if (focusElem != undefined && focusElem.tagName == "INPUT") {
        return
    }

    let press = function(number, x, y, antiInvertMode) {
        // if antiInvertMode is true, don't remove data from target
        // already containing this data there
        let writeType = controls.writing.mode
        let insertType = controls.writing.insertMode
        let solvingType = controls.writing.solvingMode

        if (number == 0) {
            //matrix.data.values[y][x] = 0
            if (solvingType == "painting") {
                matrix.data.painting[y][x] = []
            } else {
                matrix.data.solving[y][x] = [0, [], []]
            }
            
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
            if (value != 0 && value.toString().length == 1 && solvingType != "painting") {
                return
            }
            //console.log('123')
            if (solvingType == "number") {
                matrix.data.solving[y][x][0] = number
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
                        if (!antiInvertMode) {
                            matrix.data.solving[y][x][1].splice(indexOfNumber, 1)
                        }
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
                        let sortedArray = matrix.data.solving[y][x][2].sort((a, b) => a - b);
                        matrix.data.solving[y][x][2] = sortedArray
                    } else {
                        if (!antiInvertMode) {
                            matrix.data.solving[y][x][2].splice(indexOfNumber, 1)
                        }
                    }
                }
            } else if (solvingType == "painting") {
                let currentValue = matrix.data.solving[y][x]
                if (currentValue.length == 0) {
                    matrix.data.painting[y][x].push(number)
                } else {
                    let indexOfNumber = matrix.data.painting[y][x].indexOf(number)
                    if (indexOfNumber == -1) {
                        matrix.data.painting[y][x].push(number)
                        let sortedArray = matrix.data.painting[y][x].sort((a, b) => a - b);
                        matrix.data.painting[y][x] = sortedArray
                    } else {
                        if (!antiInvertMode) {
                            matrix.data.painting[y][x].splice(indexOfNumber, 1)
                        }
                    }
                }
            }
        }
    }
    let isNeedAntiInvertMode = function() {
        // it checks that one of target (value of selected cells) contains
        // imputing value but other one doesn't contain. And it returns
        // true if that found and false if not.

        let writeType = controls.writing.mode
        let solvingType = controls.writing.solvingMode

        if (writeType == "insert") {
            return false
            // anti invert mode its for solvers but not for creators
        }
        let anyContains = false
        let anyDoesntContain = false

        for (let y in matrix.selection) {
            for (let x in matrix.selection[y]) {
                
                if (matrix.data.values[y][x] != 0) {
                    continue
                }
                if (matrix.selection[y][x] == true) {
                    if (solvingType == "number") {
                        if (matrix.data.solving[y][x][0] == number) {
                            anyContains = true
                        } else {
                            anyDoesntContain = true
                        }
                    } else if (solvingType == "central") {
                        if (matrix.data.solving[y][x][1].indexOf(number) != -1) {
                            anyContains = true
                        } else {
                            anyDoesntContain = true
                        }
                    } else if (solvingType == "corner") {
                        if (matrix.data.solving[y][x][2].indexOf(number) != -1) {
                            anyContains = true
                        } else {
                            anyDoesntContain = true
                        }
                    } else if (solvingType == "painting") {
                        if (matrix.data.painting[y][x].indexOf(number) != -1) {
                            anyContains = true
                        } else {
                            anyDoesntContain = true
                        }
                    }

                    if (anyContains && anyDoesntContain) {
                        return true
                    }
                }
            }
        }
        return false
    }
    let antiInvertMode = isNeedAntiInvertMode()
    for (let y in matrix.selection) {
        for (let x in matrix.selection[y]) {
            if (matrix.selection[y][x] == true) {
                press(number, x, y, antiInvertMode)
            }
        }
    }
}

let selectAllContainsNumber = function(num) {
    let selectByValues = function() {
        for (let y in matrix.data.values) {
            for (let x in matrix.data.values[y]) {
                if (matrix.data.values[y][x] == num) {
                    matrix.selection[y][x] = true
                }
            }
        }
    }
    let selectBySolving = function() {
        for (let y in matrix.data.solving) {
            for (let x in matrix.data.solving[y]) {
                let solvingValue = matrix.data.solving[y][x]
                let isNumberIsTarget = solvingValue[0] == num ? true : false
                let isCentralContainsTarget = solvingValue[1].indexOf(num) != -1 ? true : false
                let isCornerContainsTarget = solvingValue[2].indexOf(num) != -1 ? true : false
                if (isNumberIsTarget || isCentralContainsTarget || isCornerContainsTarget) {
                    matrix.selection[y][x] = true
                }
            }
        }
    }

    selectByValues()
    selectBySolving()
    matrix.draw()
}

let longPress = function(num) {
    // when user press number button long time.
    matrix.deSelectAll()
    if (num == 999 || num == 0) {
        return
    }
    selectAllContainsNumber(num)
}


let numbersPanelActivate = function(longPress, matrix, numberClick, controls) {
    let numberButtonsActivate = function(buttonsType, longPress, matrix, numberClick) {
        let numButtons
        if (buttonsType == "color") {
            numButtons = document.querySelectorAll("#painting-pad .num")
        } else {
            numButtons = document.querySelectorAll("#numpad .num")
        }
        let longPressOptions = {
            isLongPress: false,
            longPressHappened: false
        }
        for (let numButton of numButtons) {
            let num = +(numButton.getAttribute("data-key"))
    
            let numMouseDown = function(num, event, longPressOptions, buttonsType, longPress) {
                //event.preventDefault()
                longPressOptions.isLongPress = true
                longPressOptions.longPressHappened = false
                setTimeout(function() {
                    if (longPressOptions.isLongPress ==  true && buttonsType != "color") {
                        longPressOptions.longPressHappened = true
                        longPress(num)
                    }
                }, 600)
            }
            let numMouseUp = function(
                matrix, numberClick, num, event, longPressOptions, buttonsType
            ) {
                longPressOptions.isLongPress = false
                if (!longPressOptions.longPressHappened) {
                    numberClick(num)
                    matrix.draw()
                    if (buttonsType != "color") {
                        matrix.solvingStack.step()
                    }
                }
            }
            let numTouchStart = function(event, numMouseDown, num, longPressOptions, buttonsType, longPress) {
                event.preventDefault()
                numMouseDown(num, event, longPressOptions, buttonsType, longPress)
            }

            numButton.onmousedown = (event) =>
                numMouseDown(num, event, longPressOptions, buttonsType, longPress)
            numButton.onmouseup = (event) =>
                numMouseUp(matrix, numberClick, num, event, longPressOptions, buttonsType)
            numButton.addEventListener("touchstart", (event) => 
                numTouchStart(event, numMouseDown, num, longPressOptions, buttonsType, longPress), 
                {passive: false}
            )
            numButton.addEventListener("touchend", (event) => 
                numMouseUp(matrix, numberClick, num, event, longPressOptions, buttonsType))
        }
    }
    let numbersActivate = function(numberButtonsActivate, longPress, matrix, numberClick) {
        numberButtonsActivate("numbers", longPress, matrix, numberClick)
        numberButtonsActivate("color", longPress, matrix, numberClick)
    }

    let controlsActivate = function() {

        let numPad = document.getElementById("numpad")
        let paintingPad = document.getElementById("painting-pad")

        let numbersMode = function(paintingPad, numPad) {
            paintingPad.style.display = "none"
            numPad.style.display = "flex"
        }

        let paintingMode = function(paintingPad, numPad) {
            numPad.style.display = "none"
            paintingPad.style.display = "flex"
        }

        let solvingModeNumber = document.getElementById("solving-mode-number")
        let solvingModeCentral = document.getElementById("solving-mode-central")
        let solvingModeCorner = document.getElementById("solving-mode-corner")
        let solvingModePainting = document.getElementById("solving-mode-painting")

        let solvingModeNumberClick = function(
                numbersMode, paintingPad, numPad, solvingModeCentral,
                solvingModeCorner, solvingModeNumber, solvingModePainting,
                controls
            ) {
            numbersMode(paintingPad, numPad)
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.add("writing-mode-elem-active")
            solvingModePainting.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "number"
        }

        let solvingModeCentralClick = function(
            numbersMode, paintingPad, numPad, solvingModeCentral,
            solvingModeCorner, solvingModeNumber, solvingModePainting,
            controls
        ) {
            numbersMode(paintingPad, numPad)
            solvingModeCentral.classList.add("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")
            solvingModePainting.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "central"
        }
        let solvingModeCornerClick = function(
            numbersMode, paintingPad, numPad, solvingModeCentral,
            solvingModeCorner, solvingModeNumber, solvingModePainting,
            controls
        ) {
            numbersMode(paintingPad, numPad)
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModeCorner.classList.add("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")
            solvingModePainting.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "corner"
        }
        let solvingModePaintingClick = function(
            paintingMode, paintingPad, numPad, solvingModeCentral,
            solvingModeCorner, solvingModeNumber, solvingModePainting,
            controls
        ) {
            paintingMode(paintingPad, numPad)
            solvingModeCentral.classList.remove("writing-mode-elem-active")
            solvingModePainting.classList.add("writing-mode-elem-active")
            solvingModeCorner.classList.remove("writing-mode-elem-active")
            solvingModeNumber.classList.remove("writing-mode-elem-active")

            controls.writing.solvingMode = "painting"
        }

        solvingModeNumber.onclick = () => solvingModeNumberClick(
            numbersMode, paintingPad, numPad, solvingModeCentral,
            solvingModeCorner, solvingModeNumber, solvingModePainting,
            controls
        )
        solvingModeCentral.onclick = () => solvingModeCentralClick(
            numbersMode, paintingPad, numPad, solvingModeCentral,
            solvingModeCorner, solvingModeNumber, solvingModePainting,
            controls
        )
        solvingModeCorner.onclick = () => solvingModeCornerClick(
            numbersMode, paintingPad, numPad, solvingModeCentral,
            solvingModeCorner, solvingModeNumber, solvingModePainting,
            controls
        )
        solvingModePainting.onclick = () => solvingModePaintingClick(
            paintingMode, paintingPad, numPad, solvingModeCentral,
            solvingModeCorner, solvingModeNumber, solvingModePainting,
            controls
        )
    }
    
    numbersActivate(numberButtonsActivate, longPress, matrix, numberClick)
    controlsActivate(controls)
}

let selectModesActivate = function(matrix,controls) {

    let selectModeOne = document.getElementById("select-mode-one")
    let selectModeMulti = document.getElementById("select-mode-multi")
    let selectModeAll = document.getElementById("select-mode-all")
    
    let selectOneClick = function(controls, selectModeOne, selectModeMulti) {
        selectModeMulti.classList.remove("select-mode-elem-active")
        selectModeOne.classList.add("select-mode-elem-active")
        
        controls.selectMode = "one"
    } 
    let selectMultyClick = function(controls, selectModeOne, selectModeMulti) {
        selectModeOne.classList.remove("select-mode-elem-active")
        selectModeMulti.classList.add("select-mode-elem-active")

        controls.selectMode = "multi"
    }
    let selectAllClick = function(matrix) {
        matrix.selectAll()
        matrix.draw()
    }

    selectModeOne.onclick = () => 
        selectOneClick(controls, selectModeOne, selectModeMulti)
    selectModeMulti.onclick = () => selectMultyClick(controls, selectModeOne, selectModeMulti)
    selectModeAll.onclick = () => selectAllClick(matrix)

}

let keyboardEventsActivate = function(matrix, numberClick, document) {
    let bodyKeyUp = function(event, matrix, numberClick) {
        let key = event.key

        if (key == "Control") {
            matrix.isCtrlPressed = false
        }

        let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
        if (numbers.indexOf(key) != -1) {
            numberClick(+key)
            matrix.draw()
            matrix.solvingStack.step()
        }
    }
    let bodyKeyDown = function(key, preventDefault, event, matrix, deSelectAll, draw, numberClick) {

        if (key == "Escape") {
            deSelectAll.call(matrix)
            draw.call(matrix)
            return
        }

        if (key == "Control") {
            matrix.isCtrlPressed = true
            return
        }

        if (key == "Delete" || key == "Backspace") {
            numberClick(0)
            matrix.draw()
            matrix.solvingStack.step()
            return
        }

        if (key == "a") {
            if (matrix.isCtrlPressed == true) {
                matrix.selectAll()
                matrix.draw()
            }
            return
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

                // don't do classic actions sort of slide the page
                preventDefault.call(event);
            }
            return
        }
    }
    
    document.body.onkeydown = (event) => bodyKeyDown(
        event.key, event.preventDefault, event, matrix, 
        matrix.deSelectAll, matrix.draw, numberClick
    )
    
    document.body.onkeyup = (event) => bodyKeyUp(event, matrix, numberClick)
}

let bodyClickActivate = function(matrix, document) {
    let bodyClick = function(target, body, deSelectAll, draw, matrix) {
        // clear
        if (    
            target == body 
            || target.classList.contains("empty") 
            || target.id == "container"
            || target.id == "controls-row-2"
        ) {
            deSelectAll.call(matrix)
            draw.call(matrix)
        }
    }
    
    document.body.onclick = (event) => bodyClick(
        event.target, document.body, matrix.deSelectAll, matrix.draw, matrix
    )
}

let headerActivate = function(matrix) {

    let menuIconElem = document.getElementById("menu-icon")
    let menuElem = document.getElementById("menu")
    let helpIconElem = document.getElementById("help-icon")
    let helpElem = document.getElementById("help")
    let helpOk = document.getElementById("help-ok")

    let menuActivate = function(helpElem, menuIconElem) {
        helpElem.style.display = "none"
        let menuIconElemClick = function(menuElem, helpElem) {
            let menuVisibility = menuElem.style.display
            
            if (menuVisibility == "block") {
                menuElem.style.display = "none"
            } else {
                helpElem.style.display = "none"
                menuElem.style.display = "block"
            }
        }
        menuIconElem.onclick = () => menuIconElemClick(menuElem, helpElem)
    } 

    let helpActivate = function(helpIconElem, helpOk, helpElem, menuElem) {
        let helpIconElemClick = function(helpElem, menuElem) {
            let helpVisibility = helpElem.style.display
            
            if (helpVisibility == "none") {
                helpElem.style.display = "block"
                menuElem.style.display = "none"
            } else {
                helpElem.style.display = "none"
            }
        }

        helpIconElem.onclick = helpOk.onclick = () => helpIconElemClick(
            helpElem, menuElem
        )
    }

    let nameActivate = function(matrix) {
        let nameElem = document.getElementById("puzzle-name")
        nameElem.innerHTML = `#${matrix.data.name}`
    }
    
    menuActivate(helpElem, menuIconElem)
    // nameActivate(matrix)
    helpActivate(helpIconElem, helpOk, helpElem, menuElem)
}

let undoRedoActivate = function(matrix) {
    let undoButton = document.getElementById("undo-button")
    let redoButton = document.getElementById("redo-button")

    undoButton.onclick = () => matrix.solvingStack.back()
    redoButton.onclick = () => matrix.solvingStack.forward()
}

let showContainer = function(document) {
    let container = document.getElementById("container")
    container.style.display = "inline-block"
}

let hideLoading = function(document) {
    let loading = document.getElementById("loading")
    loading.style.display = "none"
}

let start = function(matrix, numberClick, controls, longPress, document) {
    let activateInterface = function(matrix, controls, document) {
        // Ready to use the font in a canvas context
        performance.mark('start');

        matrix.init()
        matrix.draw()
        headerActivate(matrix)
        canvasActivate(matrix, controls)
        numbersPanelActivate(longPress, matrix, numberClick, controls)
        selectModesActivate(matrix,controls)
        undoRedoActivate(matrix)
        keyboardEventsActivate(matrix, numberClick, document)
        bodyClickActivate(matrix, document)
        showContainer(document)
        hideLoading(document)

        performance.mark('end');
        console.log(
            'загрузка интерфейса: ' 
            + performance.measure("time", 'start', 'end').duration 
            + ' мс'
        )
    }

    let font = new FontFace("Roboto-Medium-numbers-only-numbers-only", "url(roboto/Roboto-Medium-numbers-only.ttf)")
    font.load().then(() => activateInterface(matrix, controls, document))
}

window.onload = () => start(matrix, numberClick, controls, longPress, document)