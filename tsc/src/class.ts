class Person
{
    private name;
    constructor(name)
    {
        this.name = name;
    }

    printGreeting():void
    {
        console.log(this.name);
    }
}

var person1 = new Person('JO');
person1.printGreeting();