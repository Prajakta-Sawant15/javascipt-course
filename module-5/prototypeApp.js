// Object.prototype
// Person.prototype

// person constructor
function Person(firstName, LastName, dob) {
    this.firstName = firstName;
    this.LastName = LastName;
    this.birthday = new Date(dob);
    // this.calculateAge = function () {
    //     const diff = Date.now() - this.birthday.getTime();
    //     const ageDate = new Date(diff);
    //     return Math.abs(ageDate.getUTCFullYear() - 1970);
    // }
}

// calculate age
Person.prototype.calculateAge = function () {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// get full name
Person.prototype.getFullName = function () {
    return `${this.firstName} ${this.LastName}`;
}

// get married
Person.prototype.getMarried = function (newLastName) {
    this.LastName = newLastName;
}

// instantiate person
const john = new Person('John', 'Doe', '11-15-1995');
const mary = new Person('Mary', 'Johnson', '1-March-1995');

mary.getMarried('Smith');
console.log(john.calculateAge());
console.log(mary.getFullName());
console.log(mary.hasOwnProperty('firstName')); //output : true

// prototopal inheritance =================================================================================

function Person1(firstName, LastName) {
    this.firstName = firstName;
    this.LastName = LastName;
}

// inherit person1 prototype methods
Customer.prototype = Object.create(Person1.prototype)

// make Customer.prototype return customer
Customer.prototype.constoctor = Customer

// greeting
Person1.prototype.greeting = function () {
    return `Hello there ${this.firstName} ${this.LastName}`;
}

const pers = new Person1('John', 'Doe');
console.log(pers.greeting())

// customer construtor
function Customer(firstName, LastName, no, member) {
    Person1.call(this, firstName, LastName)
    this.phone = no;
    this.memberShip = member
}

// create customer greeting
Customer.prototype.greeting = function () {
    return `Hello there ${this.firstName} ${this.LastName}
    Welcome to our company`;
}

const cust = new Customer('Tom', 'Smith', '2002', 'Standard');
console.log(cust)
console.log(cust.greeting())