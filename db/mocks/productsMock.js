const { faker } = require("@faker-js/faker");
const companyEnum = require("../../models/companyEnum");

const productFactory = (num) => {
	return [...Array(num).keys()].map(() => {
		return {
			name: faker.commerce.product(),
			price: faker.number.int({ min: 1, max: 100 }) * 100,
			featured: Boolean(Math.round(Math.random())),
			rating: parseFloat(
				faker.number.float({ min: 1, max: 5 }).toFixed(1),
			),
			company:
				companyEnum[Math.floor(Math.random() * companyEnum.length)],
		};
	});
};

module.exports = productFactory;
