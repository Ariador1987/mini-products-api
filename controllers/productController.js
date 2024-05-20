const prisma = require("../db/prisma");
const {
	handleSortOrder,
	handleSelect,
	handleNumericFilters,
} = require("../util/queryParamsUtil");

const getAllProductsStatic = async (req, res) => {
	let filters = {
		...(req.query.name && {
			name: {
				contains: req.query.name,
				mode: "insensitive",
			},
		}),
		...(req.query.featured && { featured: req.query.featured }),
		...(req.query.checking && { checking: req.query.checking }),
		...(req.query.price && {
			price: req.query.price && { lte: +req.query.price },
		}),
		...(req.query.company && { company: req.query.company.toUpperCase() }),
	};

	const page = +req.query.page || 1;
	const take = +req.query.limit || 10;
	const skip = (page - 1) * take;

	const filtersMap =
		req.query.numericFilters &&
		handleNumericFilters(req.query.numericFilters);

	if (filtersMap?.size > 0) {
		const filterKvps = Object.fromEntries(filtersMap.entries());
		console.log(filterKvps, " filter KvPs");
		filters = { ...filters, AND: filterKvps };
	}

	const products = await prisma.product.findMany({
		where: filters,
		...(req?.query?.sort
			? { orderBy: handleSortOrder(req.query.sort) }
			: { orderBy: { createdAt: "desc" } }),
		...(req?.query?.fields && {
			select: handleSelect(req.query.fields),
		}),
		take,
		skip,
	});

	return res.status(200).json({
		products,
		nbOfHits: products.length,
	});
};
const getAllProducts = (req, res) => {
	console.log(req.query, " query");
	return res.status(200).json({ msg: "Products rounte" });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
