const express = require("express");
const cors = require("cors");
const app = express();
const rootrouter = require("./db/index");
const cookieParser = require('cookie-parser');
// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true, // Allow credentials
    optionsSuccessStatus: 204 // Use a 204 status for successful OPTIONS requests
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", rootrouter);


app.listen(3001, () => {
    console.log("App listening on 3001");
});
