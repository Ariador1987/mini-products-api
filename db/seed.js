const prisma = require("./prisma");
const productFactory = require("./mocks/productsMock");

(async () => {
	try {
		const productCount = await prisma.product.count();
		console.log(productCount, " prod count");
		if (productCount <= 1) {
			const products = productFactory(30);
			// console.log("These are products ", products);
			await prisma.product.createMany({
				data: products,
			});
			console.log("Successfully seeded data.");
		} else {
			console.log("Has seeded already.");
		}
	} catch (error) {
		console.error(error);
	}
})();
