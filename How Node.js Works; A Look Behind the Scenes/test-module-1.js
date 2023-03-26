class Calculator {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return a / b;
    }
}

module.exports = Calculator; // This is the same as module.exports = new Calculator();