import express from 'express';
let app = express();
//require("./Decorators/propertyDecorator");
//require("./Decorators/parameterDecorator");
// require("./Decorators/methodDecorator");
// require("./Decorators/acessorDecorator");
require("./Decorators/classDecorator");

app.listen(3000, (() => {
    console.log("App is listening on port 3000");
}))