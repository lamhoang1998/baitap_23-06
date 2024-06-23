const API_URL = "https://665f0fd21e9017dc16f2a75c.mockapi.io/api";

export const getJSON = async (query) => {
	try {
		const res = await fetch(`${API_URL}/${query}`);
		const data = await res.json();

		if (!res.ok) {
			throw new Error("There is no data fetched");
		}
		return data;
	} catch (err) {
		throw err;
	}
};

export const sendJSON = async (query, uploadData) => {
	try {
		const res = await fetch(`${API_URL}/${query}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(uploadData),
		});
		const data = await res.json();
		if (!res.ok) throw new Error("something wrong happened");
		return data;
	} catch (err) {
		throw err;
	}
};

export const sendDeleteRequest = async (query, id) => {
	try {
		const res = await fetch(`${API_URL}/${query}/${id}`, {
			method: "DELETE",
		});

		const data = res.json();

		if (!res.ok) throw new Error("something wrong happened");
		return data;
	} catch (err) {
		throw err;
	}
};
