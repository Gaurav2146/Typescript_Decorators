// TypeScript - Parameter Decorator
// [Last Updated: Aug 11, 2020]

// A parameter decorator is applied on a method / constructor parameter declaration

// The parameter decorator function is called with the following two arguments:

// Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// The name of the member(method).
// The ordinal index of the parameter in the function's parameter list.
// Just like Property Decorators, a Property Descriptor is not provided as an argument to a parameter decorator function.

// The return value from the decorator function is ignored.

// A parameter decorator can only be used to observe that a parameter has been declared on a method.

// Example
// In following example we will use parameter decorator '@notNull' to register the target
// parameter for not - null validation, but as this decorator is only called during 
// loading time(not during when method is called) we will also need method decorator 
// '@validate' which will intercept method call and will perform required validation.


function notNull(target: any, propertyKey: string, parameterIndex: number) {
    console.log("param decorator notNull function invoked ");
    Validator.registerNotNull(target, propertyKey, parameterIndex);
}

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("method decorator validate function invoked ");
    let originalMethod = descriptor.value;
    //wrapping the original method
    descriptor.value = function (...args: any[]) {//wrapper function
        if (!Validator.performValidation(target, propertyKey, args)) {
            console.log("validation failed, method call aborted: " + propertyKey);
            return;
        }
        let result = originalMethod.apply(this, args);
        return result;
    }
}

class Validator {
    private static notNullValidatorMap: Map<any, Map<string, number[]>> = new Map();

    //todo add more validator maps
    static registerNotNull(target: any, methodName: string, paramIndex: number): void {
        let paramMap: Map<string, number[]> | undefined = this.notNullValidatorMap.get(target);
        if (!paramMap) {
            paramMap = new Map();
            this.notNullValidatorMap.set(target, paramMap);
        }
        let paramIndexes: number[] | undefined = paramMap.get(methodName);
        if (!paramIndexes) {
            paramIndexes = [];
            paramMap.set(methodName, paramIndexes);
        }
        paramIndexes.push(paramIndex);
    }

    static performValidation(target: any, methodName: string, paramValues: any[]): boolean {
        let notNullMethodMap: Map<string, number[]> | undefined = this.notNullValidatorMap.get(target);
        if (!notNullMethodMap) {
            return true;
        }
        let paramIndexes: number[] | undefined = notNullMethodMap.get(methodName);
        if (!paramIndexes) {
            return true;
        }
        let hasErrors: boolean = false;
        for (const [index, paramValue] of paramValues.entries()) {
            if (paramIndexes.indexOf(index) != -1) {
                if (!paramValue) {
                    console.error("method param at index " + index + " cannot be null");
                    hasErrors = true;
                }
            }
        }
        return !hasErrors;
    }
}

class Task {
    @validate
    run(@notNull name: string | null): void {
        console.log("running task, name: " + name);
    }
}

console.log("-- creating instance --");
let task: Task = new Task();
console.log("-- calling Task#run(null) --");
task.run(null);
console.log("----------------");
console.log("-- calling Task#run('test') --");
task.run("test");

// param decorator notNull function invoked
// method decorator validate function invoked
// --creating instance--
// --calling Task#run(null)--
// method param at index 0 cannot be null
// validation failed, method call aborted: run
// ----------------
// --calling Task#run('test')--
// running task, name: test