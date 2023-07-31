function Logging() {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class Logger extends constructor {
            constructor(...args: any[]) {
                super();
                console.log(constructor.name + " Instantiated");
            }
        }
    }
}

@Logging()
class User {
    constructor() { }
}

new User();
new User();
new User();