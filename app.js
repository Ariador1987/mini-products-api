const env = require("dotenv").config();
const productRoutes = require("./routes/products");
// async errors

const express = require("express");
const prisma = require("./db/prisma");
const app = express();

const errorHandlerMiddleware = require("./errors/error-handler");
const notFoundMiddleware = require("./errors/not-found");

// middleware
app.use(express.json());
const port = process.env.PORT || 5173;

//// TEST
// app.get("/api/v1/products", async (req, res) => {
// 	const products = await prisma.product.findMany();
// 	console.log(products, " products");
// 	return res.status(200).json({ msg: "ok" });
// });

// app.get("/", (req, res) => {
// 	res.send(
// 		"<h1>Store API </h1><a href='/api/v1/products'>Products route</a>",
// 	);
// });

// routes
app.use("/api/v1/products", productRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function start() {
	try {
		app.listen(port, () => {});
	} catch (error) {
		console.log("error on initialization of the app: ", error);
	}
}

start();
