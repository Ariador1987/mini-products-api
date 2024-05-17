require("dotenv").config();
// async errors

const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./errors/error-handler");
const notFoundMiddleware = require("./errors/not-found");

// middleware
app.use(express.json());

// routes
// app.get("/", (req, res) => {
// 	res.send(
// 		"<h1>Store API </h1><a href='/api/v1/products'>Products route</a>",
// 	);
// });

// app.get("/", notFoundMiddleware);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(5173, () => {
	console.log(`App is listening on port 5173`);
});
