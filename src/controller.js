import * as model from "./model.js";
import staffView from "./view/staffView.js";
import createStaff from "./addStaff.js";
import { staff } from "./validator.js";

import "./validator.js";

const controlLoadStaff = async () => {
	try {
		//1 get staff
		const query = "Staff";
		await model.getLoadingStaffResult(query);
		//2 render staff
		staffView.render(model.state.staff);
	} catch (err) {
		staffView.renderError(err);
	}
};

const controlValidator = async () => {
	try {
	} catch (err) {}
};

const controlDeleteStaff = async (id) => {
	try {
		const query = "Staff";
		await model.deleteStaff(query, id);
	} catch (err) {
	} finally {
		await controlLoadStaff();
	}
};

const controlInputFocusIn = (id) => {
	staff[id].touch = true;

	console.log(staff);
};

const handleValidate = () => {
	const filterStaff = Object.entries(staff).filter(([key, value]) => {
		return value.touch === true;
	});
	console.log(filterStaff);
	filterStaff.forEach(([key, value]) => {
		switch (key) {
			case "mnv":
				if (staff[key].errMessage) staff[key].errMessage = "";
				staff[key].errMessage = value.validateStaffId();
				break;
			case "name":
				if (staff[key].errMessage) staff[key].errMessage = "";
				staff[key].errMessage = value.validateName();
				break;
			case "position":
				if (staff[key].errMessage) staff[key].errMessage = "";
				staff[key].errMessage = value.validatePosition();
				break;
			case "generalSalary":
				if (staff[key].errMessage) staff[key].errMessage = "";
				staff[key].errMessage = value.validateSalary();
				break;
			case "workingTime":
				if (staff[key].errMessage) staff[key].errMessage = "";
				staff[key].errMessage = value.validateWorkingTime();
				break;
			default:
				break;
		}
	});
};

const renderError = () => {
	const listEleErrs = document.querySelectorAll(
		"#formQLNV input + span, #formQLNV select + span"
	);
	listEleErrs.forEach((el) => {
		const id = el.dataset.id;
		// console.log(el.dataset.id);

		if (staff[id].touch) {
			el.innerHTML = staff[id].errMessage;
		}
	});
};

// const isValid = () => {
// 	return Object.values(staff).every((item) => item.errMessage === "");
// };

// const forceValidate = () => {
// 	Object.values(staff).forEach((item) => {
// 		item.touch === true;
// 	});
// 	handleValidate();
// 	renderForm();
// };

const controlInputFocusOut = (id, value) => {
	console.log("focus out");
	staff[id].value = value;
	// console.log(staff);
	handleValidate();
	renderError();
	console.log(staff);
};

const controlCreateStaff = async () => {
	try {
		const query = "Staff";
		console.log(query);
		await model.createNewStaff(query, staff, handleValidate, renderError);
	} catch (err) {
	} finally {
		await controlLoadStaff();
	}
};

const init = () => {
	staffView.addHandlerRenderStaff(controlLoadStaff);
	staffView.addHandlerDeleteStaff(controlDeleteStaff);
	createStaff.addHandlerCreateStaff(controlCreateStaff);
	createStaff.addHandlerFocusIn(controlInputFocusIn);
	createStaff.addHandlerFocusOut(controlInputFocusOut);
};

init();
