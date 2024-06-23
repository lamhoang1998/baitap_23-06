class Validator {
	touch = false;
	value = "";
	__errMessage = "";

	isRequire(message = "Bắt buộc nhập vào.") {
		if (this.__errMessage) return this;

		if (this.value.length === 0) {
			this.__errMessage = message;
		}

		return this;
	}

	isOnlyString() {
		if (this.__errMessage) return this;

		const REGEX_STRING = /^[a-zA-Z]+$/g;
		if (!REGEX_STRING.test(this.value)) {
			this.__errMessage = "Chỉ được nhập vào ký tự chữ";
		}

		return this;
	}

	isNumber() {
		if (this.__errMessage) return this;

		if (Number.isNaN(+this.value)) {
			this.__errMessage = "Bắt buộc nhập vào ký tự số.";
		}

		this.value = Number(this.value);

		return this;
	}

	min(value) {
		if (this.__errMessage) return this;

		if (typeof this.value === "string") {
			if (this.value.length < value) {
				this.__errMessage = `Không được nhập ít hơn ${value} ký tự.`;
			}
		}

		if (typeof this.value === "number") {
			if (this.value < value) {
				this.__errMessage = `Không được nhập nhỏ hơn số ${value}`;
			}
		}

		return this;
	}

	max(value) {
		if (this.__errMessage) return this;

		if (typeof this.value === "string") {
			if (this.value.length > value) {
				this.__errMessage = `Không được nhập nhiều hơn ${value} ký tự.`;
			}
		}

		if (typeof this.value === "number") {
			if (this.value > value) {
				this.__errMessage = `Không được nhập lớn hơn số ${value}`;
			}
		}

		return this;
	}

	validateName() {
		return this.isRequire().isOnlyString().errMessage;
	}

	validateStaffId() {
		return this.isRequire().isNumber().errMessage;
	}

	validatePosition() {
		return this.isRequire().errMessage;
	}

	validateSalary() {
		return this.isRequire().isNumber().min(1000000).max(20000000).errMessage;
	}

	validateWorkingTime() {
		return this.isRequire().isNumber().min(50).max(150).errMessage;
	}

	get errMessage() {
		return this.__errMessage;
	}

	set errMessage(err) {
		this.__errMessage = err;
	}
}

export const staff = {
	mnv: new Validator(),
	name: new Validator(),
	position: new Validator(),
	generalSalary: new Validator(),
	workingTime: new Validator(),
};

// const testName = new Validator();
// console.log(testName.validateName());

// const testNumber = new Validator();
// testNumber.value = "200";
// console.log(testNumber.validateWorkingHour());
