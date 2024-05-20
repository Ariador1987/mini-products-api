const operatorsMap = new Map([
	[">", "gt"],
	[">=", "gte"],
	["=", "eq"],
	["<", "lt"],
	["<=", "lte"],
]);

function normalizeFilter(operator) {
	const regEx = /\b(<|>|>=|=|<|<=)\b/g;
	const clean = operator.replace(
		regEx,
		(match) => `-${operatorsMap.get(match)}-`,
	);
	return clean;
}

module.exports = normalizeFilter;
