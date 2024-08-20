class ColourPuzzleHelper {
    constructor() {
        this.colours = ["white", "black", "red", "green", "blue", "yellow", "pink", "purple"];
        this.shades = ["#ffffff", "#e9040d", "#00bf3d", "#1291db", "#fbd906", "#f700b1", "#b017b0"]
        this.shapes = ["circle", "triangle", "square", "rectangle"];
    }

    // return [1, 2, 3, 4] in random order
    getRandomOrderArray() {
        const arr = [1, 2, 3, 4];
        return arr.sort(() => Math.random() - 0.5);
    }

    // returns a random array of 4 shapes from the shapes array
    getRandomShapes() {
        return this.getRandomItems(this.shapes, 4);
    }

    // returns a random array of 4 colours from the colours array
    getRandomColours() {
        return this.getRandomItems(this.colours, 4);
    }

    getRandomShades() {
        return this.getRandomItems(this.shades, 4);
    }

    // returns a random array of specified length from the given array
    getRandomItems(arr, length) {
        const result = [];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            result.push(arr[randomIndex]);
        }
        return result;
    }

    // timer for x number of seconds
    startTimer(seconds, callback) {
        let timer = seconds;
        const interval = setInterval(() => {
            console.log(`Time left: ${timer} seconds`);
            if (timer <= 0) {
                clearInterval(interval);
                callback();
            }
            timer--;
        }, 1000);
    }
}

export default ColourPuzzleHelper;
