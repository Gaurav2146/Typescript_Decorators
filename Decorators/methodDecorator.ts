// TypeScript - Method Decorator

// A method decorator is applied to a method declaration.

// Method decorator without arguments
// If a method decorator has no arguments e.g. @aDecorator, then the decorator function should be declared as:

// function aDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) { }
// where:

// target: Either the constructor function of the class for a static method, or the prototype of the class for an instance method.
//     propertyKey: The name of the method.
//         descriptor: The Property Descriptor for the method.
// The PropertyDescriptor in TypeScript is defined as:

interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}


// Example: In following example the decorator function
//  makes the target method enumerable so that it can be available in 
//  a loop(e.g.in for-in loop):

function Enumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("-- target --");
    console.log(target);
    console.log("-- proertyKey --");
    console.log(propertyKey);
    console.log("-- descriptor --");
    console.log(descriptor);
    //make the method enumerable
    descriptor.enumerable = true;
}

class Car {
    @Enumerable
    run() {
        console.log("inside run method...");
    }
}
console.log("-- creating instance --");
let car = new Car();
console.log("-- looping --");
for (let key in car) {
    console.log("key: " + key);
}

// Output
// --target --
//     Car { }
// --proertyKey --
//     run
// --descriptor --
//     {
//         value: [Function: run],
//         writable: true,
//         enumerable: false,
//         configurable: true
//     }
// --creating instance--
// --looping --
//     key: run