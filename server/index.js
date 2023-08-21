const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/user")
const postRoute = require("./routes/post")
const commentRoute = require("./routes/comment")
const errorMiddleware = require("./middlewares/error-middleware");
const validateMiddleware = require("./middlewares/validate-middleware");

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use("/api/user",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

// app.use(validateMiddleware);
app.use(errorMiddleware);

const start = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=> console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();