class ColourPuzzleHelper {
    constructor() {
        this.colorMap = {
            "white": "#ffffff",
            "red": "#e9040d",
            "green": "#00bf3d",
            "blue": "#1291db",
            "yellow": "#fbd906",
            "pink": "#f700b1",
            "purple": "#b017b0"
        };
        this.colours = ["white", "black", "red", "green", "blue", "yellow", "pink", "purple"];
        this.shades = Object.values(this.colorMap);
        this.shapes = ["circle", "triangle", "square", "rectangle"];
        this.questions = ["background-colour", "shape-colour", "shape-type", "shape-text", "colour-text", "shape-text", "shape-text-colour", "colour-text-colour", "number-colour"]
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

    getRandomQuestions(){
        return this.getRandomItems(this.questions, 2);
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

    getColorName(hex) {
        return Object.keys(this.colorMap).find(name => this.colorMap[name] === hex);
    }

    // timer for x number of seconds
    startTimer(seconds, callback) {
        let timer = seconds;
        const interval = setInterval(() => {
            timer--;
            console.log(`Time left: ${timer} seconds`);
            if (timer <= 0) {
                clearInterval(interval);
                callback();
            }
        }, 1000);
    }
}

export default ColourPuzzleHelper;
