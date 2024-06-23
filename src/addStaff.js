class CreateStaff {
	_parentElement = document.getElementById("formQLNV");
	_data;

	addHandlerFocusIn(handler) {
		this._parentElement.addEventListener("focusin", function (e) {
			const el = e.target.closest(".form-control");
			if (!el) return;

			handler(el.id);
		});
	}

	addHandlerFocusOut(handler) {
		this._parentElement.addEventListener("focusout", function (e) {
			const el = e.target.closest(".form-control");
			if (!el) return;
			handler(el.id, el.value);
		});
	}

	addHandlerCreateStaff(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new CreateStaff();
