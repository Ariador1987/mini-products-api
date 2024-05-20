const normalizeFilter = require("./normalizeFilter");

function handleSortOrder(sortParams) {
	const allParams = sortParams.split(",").map((arg) => {
		return arg.startsWith("-")
			? {
					[arg.slice(1)]: "desc",
			  }
			: {
					[arg]: "asc",
			  };
	});

	return allParams.length > 1 ? allParams : Object.assign({}, ...allParams);
}

function handleSelect(fields) {
	if (!fields) return;

	return fields.split(",").reduce((acc, currVal) => {
		return { ...acc, [currVal]: true };
	}, {});
}

function handleNumericFilters(numFilters) {
	const filtersMap = new Map();
	const shouldArrayify = numFilters.includes(",");

	const dirtyValue = !shouldArrayify ? numFilters : numFilters.split(",");

	const normalizedValue = !Array.isArray(dirtyValue)
		? normalizeFilter(dirtyValue)
		: dirtyValue.map((val) => normalizeFilter(val));

	if (!Array.isArray(normalizedValue)) {
		loadFiltersMap(normalizedValue.split("-"), filtersMap);
	} else {
		normalizedValue.map((val) =>
			loadFiltersMap(val.split("-"), filtersMap),
		);
	}

	return filtersMap;
}

function loadFiltersMap(arrEntry, filtersMap) {
	if (arrEntry.length !== 5 && arrEntry.length !== 3) {
		console.log("Invalid number of entry parts");
		return null;
	}

	if (arrEntry.length === 5) {
		const [key, op, value, op2, value2] = arrEntry;
		if (Number.isFinite(+value) && Number.isFinite(+value2)) {
			filtersMap.set(key, { [op]: +value, [op2]: +value2 });
		}
	}

	if (arrEntry.length === 3) {
		const [key, op, value] = arrEntry;
		if (Number.isFinite(+value)) {
			filtersMap.set(key, { [op]: +value });
		}
	}
}

module.exports = {
	handleSelect,
	handleSortOrder,
	handleNumericFilters,
};
