
class Greeter {

	@ModifyMessage("GFG")
	first_message: string;
	second_message: string;

    constructor(first_message:string,second_message:string)
    {   this.first_message = first_message;
        this.second_message = second_message;
    }
}


//Decorator factory
function ModifyMessage(sender: string) {
  
    return function(target: any, propertyKey: string) {
      
        let modifiedMessage : string;
          
        // Return modifiedMessage whenever the message is asked
        const getter = function() {
            return modifiedMessage + " this message in fethed from getter";
        };
          
        // Set the modifiedMessage value
        const setter = function(message:string) {
            if(message)
            {
                modifiedMessage = message + " This message id set inside setter"; 
            }
        }; 
  
        // Overwrite the original message with
        // modifiedMessage we just created
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}

let greeter:Greeter = new Greeter("Hello","How are you");

console.log(greeter.first_message);
greeter.first_message="Hello from Gaurav";
console.log(greeter.first_message);