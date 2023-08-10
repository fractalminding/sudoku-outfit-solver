let ultraGen = {
    get(size) {
        let array = this.createArray(size)
        //console.log(array)
        bigLoop: for (let i = 0;; i++) {
            loop: for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    if (array[y][x].length > 1) {
                        let max = array[y][x].length
                        let randomIndex = Math.floor(Math.random() * max) + 0
                        let value = array[y][x][randomIndex]
                        array[y][x] = [value]
                        this.deleteCandidates(array, size)
                        break loop
                    }
                    if (x == size - 1 && y == size - 1) {
                        break bigLoop
                    }
                }
            }
        }
        for (let y in array) {
            for (let x in array[y]) {
                array[y][x] = String(array[y][x][0])
            }
        }

        if (this.test(array) != true) {
            array = this.get(size)
        } else {
            return array
        }
        
    },
    check(array) {
        for (let row of array) {
            for (let elem of row) {
                if (elem.length != 1) {
                    return false
                }
            }
        }
        return true
    },
    toNormalArray(array) {
        //console.log(array)
        for (let y in array) {
            for (let x in array[y]) {
                array[y][x] = +(array[y][x][0])
                //console.log(array[y][x][0])
            }
        }
        return array
    },
    getFromPattern(arr, size, genArray, max) {
        let array = JSON.parse(JSON.stringify(arr))
        //console.log(array)
        array = this.deleteCandidates(array, size)
        //console.log(array)
        
        //console.log(array)

        bigLoop: for (let y in array) {
            for (let x in array[y]) {
                for (let candIndex in array[y][x]) {
                    //console.log("x, y, cand = " + `${x}, ${y}, ${array[y][x][candIndex]} `)
                    if (array[y][x].length > 1) {
                        
                        // let max = array[y][x].length
                        // let randomIndex = Math.floor(Math.random() * max) + 0
                        // let badCandidates = array[y][x].slice(0).splice(randomIndex, 1)
                        // let value = array[y][x][randomIndex]
                        // array[y][x] = [value]

                        let array2 = JSON.parse(JSON.stringify(array))
                        array2[y][x] = [array2[y][x][candIndex]]
                        if (genArray.length == max) {
                            return
                        }
                        this.getFromPattern(array2, size, genArray, max)
                        
                        //break bigLoop
                    }
                }
            }
        }
        if (this.check(array)) {
            //return array
            let newArray = JSON.parse(JSON.stringify(array))
            newArray = this.toNormalArray(newArray)
            genArray.push(newArray)
        }
        
        
    },
    shuffle(array) {
        let m = array.length, t, i;
      
        // Пока есть элементы для перемешивания
        while (m) {
            
            // Взять оставшийся элемент
            i = Math.floor(Math.random() * m--);
        
            // И поменять его местами с текущим элементом
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
      
        return array;
    },
    createArray(size) {
        let candidates = []
        let array = []

        for (let x = 1; x <= size; x++) {
            candidates.push(x)
        }

        for (let y = 0; y < size; y++) {
            array[y] = []
            for (let x = 0; x < size; x++) {
                array[y][x] = candidates.slice(0)
                //array[y][x] = this.shuffle(candidates.slice(0))
                //console.log(array[y][x])
            }
        }
        //console.log(array)
        return array
    },
    fillCandidates(array, size, isRandom) {
        let candidates = []

        for (let x = 1; x <= size; x++) {
            candidates.push(x)
        }

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (array[y][x] == 0) {
                    let candidatesArray = candidates.slice(0)
                    if (isRandom) {
                        candidatesArray = this.shuffle(candidatesArray)
                    }
                    array[y][x] = candidatesArray
                } else {
                    array[y][x] = [array[y][x]]
                }
                
            }
        }
        //console.log(array)
        return array
    },
    deleteCandidates(arr, size) {
        //console.log(arr)
        let array = JSON.parse(JSON.stringify(arr))
        
        let i = 0
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (array[y][x].length == 1) {
                    let value = array[y][x][0]
                    for (let yy = 0; yy < size; yy++) {
                        for (let xx = 0; xx < size; xx++) {
                            if ((x == xx || y == yy) && !(x == xx & y == yy)) {
                                //console.log( "xx, yy = " + xx + ", " + yy)
                                //console.log(array)
                                let index = array[yy][xx].indexOf(value)
                                if (index != -1) {
                                    //console.log("array[yy][xx]  " + array[yy][xx])
                                    array[yy][xx].splice(index, 1)
                                    i++
                                }
                                //console.log(array[yy][xx])
                            }
                        } 
                    }
                }
            } 
        }
        //console.log(i)
        if (i > 0) {
            return(this.deleteCandidates(array, size))
        } else {
            return array
        }
    },
    test(array) {
        for (let arrayY of array) {
            for (let elem of arrayY) {
                if (elem == 'undefined') {
                    return false
                }
            }
        }
        return true
    }
}