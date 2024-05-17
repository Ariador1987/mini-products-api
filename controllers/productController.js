const getAllProductsStatic = (req, res) => {
	return res.status(200).json({ msg: "Products testing rounte" });
};
const getAllProducts = (req, res) => {
	return res.status(200).json({ msg: "Products rounte" });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
