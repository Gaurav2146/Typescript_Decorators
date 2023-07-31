
class Greeter {

    @ModifyMessage("GFG")
    first_message: string;
    second_message: string;

    constructor(first_message: string, second_message: string) {
        this.first_message = first_message;
        this.second_message = second_message;
    }
}


//Decorator factory
function ModifyMessage(sender: string) {

    return function (target: Greeter, propertyKey: string) {

        let modifiedMessage: string;

        // Return modifiedMessage whenever the message is asked
        const getter = function () {
            return modifiedMessage + " this message is fethed from getter";
        };

        // Set the modifiedMessage value
        const setter = function (message: string) {
            if (message) {
                modifiedMessage = message + " This message is set inside setter";
            }
        };

        // adding getter and setter for the property
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });

        //Adding value to the property and making value redable.
        //So, If you try to set the value then it will throw an error even in constructor.
        // Object.defineProperty(target, propertyKey, {
        //     value: "This is custom value",
        //     writable: false
        // });
    }
}

let greeter: Greeter = new Greeter("Hello", "How are you");

console.log(greeter.first_message);
greeter.first_message = "Hello from Gaurav";
console.log(greeter.first_message);