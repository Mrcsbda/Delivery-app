const changePayment = require("./main.jsx");

test('El metodo es igual al click', () => {
    expect(changePayment("master").toBe("master"));
 })