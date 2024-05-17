const errorHandlerMiddleware = async (err, req, res, next) => {
	console.log(err, " err from middleware handler.");
	return res.status(500).json({ msg: "Something went wrong" });
};

module.exports = errorHandlerMiddleware;
