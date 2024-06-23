import { getJSON, sendJSON, sendDeleteRequest } from "./config.js";

export const state = {
	staff: [],
};

export const getLoadingStaffResult = async (query) => {
	try {
		const key = query;
		const data = await getJSON(key);
		state.staff = data;
	} catch (err) {
		throw err;
	}
};

// export const createStaff = async (query) => {
// 	const key = query;
// 	try {
// 		const listInputEls = document
// 			.getElementById("formQLNV")
// 			.querySelectorAll(".form-control");

// 		console.log(staffObject);

// 		const staff = {};

// 		listInputEls.forEach((el) => (staff[el.id] = el.value));
// 		const data = await sendJSON(key, staff);
// 		console.log(data);
// 	} catch (err) {
// 		throw err;
// 	}
// };

export const createNewStaff = async (
	query,
	staffObject,
	handleValidate,
	renderError
) => {
	try {
		console.log(staffObject);
		const listInputEls = document
			.getElementById("formQLNV")
			.querySelectorAll(".form-control");
		const staff = {};

		Object.values(staff).forEach((item) => {
			item.touch === true;
		});

		handleValidate();
		renderError();

		if (!Object.values(staffObject).every((item) => item.errMessage === "")) {
			return;
		}
		listInputEls.forEach((el) => (staff[el.id] = staffObject[el.id].value));
		const data = await sendJSON(query, staff);
	} catch (err) {}
};

export const deleteStaff = async (query, id) => {
	try {
		console.log(query);
		const key = query;
		const data = await sendDeleteRequest(key, id);
	} catch (err) {
		throw err;
	}
};
