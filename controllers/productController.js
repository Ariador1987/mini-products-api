const { z } = require("zod");
const companyEnum = require("../models/companyEnum");

const productSchema = z.object({
	name: z
		.string()
		.min(1, { message: "The name must have at least one character" }),
	price: z.number().int().default(0),
	featured: z.boolean().default(false),
	rating: z.number().default(0),
	company: z
		.enum(companyEnum)
		.refine((value) => companyEnum.includes(value), {
			message:
				"The company must be either IKEA, LIDDY, CARESSA, or MARCOS",
		}),
});

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
