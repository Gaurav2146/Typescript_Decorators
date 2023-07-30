import express from 'express';
let app = express();
require("./Decorators/propertyDecorator");

app.listen(3000,(()=>{
    console.log("App is listening on port 3000");
}))