let ultraGen = {
    get(size) {
        let createArray = function(size) {
            let candidates = []
            let array = []

            for (let x = 1; x <= size; x++) {
                candidates.push(x)
            }

            for (let y = 0; y < size; y++) {
                array[y] = []
                for (let x = 0; x < size; x++) {
                    array[y][x] = candidates.slice(0)
                }
            }

            return array
        }

        let array = createArray(size)
        
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
            console.log(array)
            return array
        }
        
    },
    deleteCandidates(array, size) {
        let i = 0
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (array[y][x].length == 1) {
                    let value = array[y][x][0]
                    for (let yy = 0; yy < size; yy++) {
                        for (let xx = 0; xx < size; xx++) {
                            if ((x == xx || y == yy) && !(x == xx & y == yy)) {
                                //console.log( "xx, yy = " + xx + ", " + yy)
                                //console.log("value = " + value)
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
            this.deleteCandidates()
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