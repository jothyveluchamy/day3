var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.printGreeting = function () {
        console.log(this.name);
    };
    return Person;
}());
var person1 = new Person('JO');
person1.printGreeting();
