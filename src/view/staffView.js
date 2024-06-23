class StaffView {
	_parentElement = document.getElementById("tbodyNhanVien");
	_data;
	_message = "We have not add any staffs yet";

	addHandlerRenderStaff(handler) {
		window.addEventListener("load", handler);
	}

	addHandlerDeleteStaff(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const deleteButton = e.target.closest(".btn-danger");
			if (!deleteButton) return;
			const dataId = deleteButton.dataset.id;
			handler(dataId);
		});
	}

	render(staffs) {
		if (!staffs.length) return this.renderMessage();
		this._data = staffs;
		const markUp = this._data
			.map((staff) => this._generateMarkup(staff))
			.join("");
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markUp);
	}

	renderError(error) {
		const markup = `<p>${error}</p>`;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderMessage() {
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", this._message);
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}

	_calculateTotalSalary(position, generalSalary) {
		if (position === "Giám đốc") {
			return generalSalary * 3;
		}
		if (position === "Trưởng phòng") {
			return generalSalary * 2;
		}
		if (position === "Nhân viên") {
			return generalSalary;
		}
	}

	_ranking(workingTime) {
		if (workingTime > 120) {
			return "Nhân viên xuất sắc";
		}
		if (workingTime > 100) {
			return "Nhân viên giỏi";
		}
		if (workingTime > 80) {
			return "Nhân viên khá";
		}
		if (workingTime > 50) {
			return "Nhân viên trung bình";
		}
	}

	_generateMarkup(staff) {
		return `
        <tr>
            <td>${staff.mnv}</td>
            <td>${staff.name}</td>
            <td>${staff.position}</td>
            <td>${staff.generalSalary}</td>
            <td>${this._calculateTotalSalary(
							staff.position,
							staff.generalSalary
						)}</td>
            <td>${staff.workingTime}</td>
            <td>${this._ranking(staff.workingTime)}</td>
            <td>
              <button class="btn btn-danger" data-id=${staff.id} >Xóa</button>
            </td>
        </tr>
    `;
	}
}

export default new StaffView();
