class ColourPuzzleHelper {
  constructor() {
    this.colorMap = {
      white: "#ffffff",
      red: "#e9040d",
      green: "#00bf3d",
      blue: "#1291db",
      yellow: "#fbd906",
      pink: "#f700b1",
      purple: "#b017b0",
    };

    this.colours = [
      "white",
      "black",
      "red",
      "green",
      "blue",
      "yellow",
      "pink",
      "purple",
    ];

    this.shades = Object.values(this.colorMap);
    this.shapes = ["circle", "triangle", "square", "rectangle"];
    this.questions = [
      "background-colour",
      "shape-colour",
      "shape-type",
      "shape-text",
      "colour-text",
      "shape-text",
      "shape-text-colour",
      "colour-text-colour",
      "number-colour",
    ];
  }

  /**
   * Returns an array of [1, 2, 3, 4] in random order.
   */
  getRandomOrderArray() {
    return [1, 2, 3, 4].sort(() => Math.random() - 0.5);
  }

  /**
   * Returns a random array of 4 shapes from the shapes array.
   */
  getRandomShapes() {
    return this.getRandomItems(this.shapes, 4);
  }

  /**
   * Returns a random array of 4 colours from the colours array.
   */
  getRandomColours() {
    return this.getRandomItems(this.colours, 4);
  }

  /**
   * Returns a random array of 4 shades from the shades array.
   */
  getRandomShades() {
    return this.getRandomItems(this.shades, 4);
  }

  /**
   * Returns a random array of 2 questions from the questions array.
   */
  getRandomQuestions() {
    return this.getRandomItems(this.questions, 2);
  }

  /**
   * Returns a random array of a specified length from the given array.
   * @param {Array} arr - The array to pick random items from.
   * @param {number} length - The number of items to return.
   * @returns {Array} Randomly selected items.
   */
  getRandomItems(arr, length) {
    const result = [];
    while (result.length < length) {
      const randomItem = arr[Math.floor(Math.random() * arr.length)];
      result.push(randomItem);
    }
    return result;
  }

  /**
   * Finds the color name corresponding to the given hex code.
   * @param {string} hex - The hex code to find the color name for.
   * @returns {string} The color name, or undefined if not found.
   */
  getColorName(hex) {
    return Object.keys(this.colorMap).find(
      (name) => this.colorMap[name] === hex
    );
  }

  /**
   * Starts a countdown timer for a specified number of seconds.
   * @param {number} seconds - The number of seconds for the timer.
   * @param {function} callback - The function to call when time is up.
   */
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
