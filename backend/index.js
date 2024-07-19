const express = require("express");
const cors = require("cors");
const app = express();
const rootrouter = require("./db/index");
const cookieParser = require('cookie-parser');
// Configure CORS
const corsOptions = {
    origin: 'https://codeforge-khaki.vercel.app',
    credentials: true, 
  
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", rootrouter);


app.listen(3001, () => {
    console.log("App listening on 3001");
});
