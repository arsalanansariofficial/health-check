/*
    Contains all the API calls to the backend
    Created By- Arsalan Ansari
 */

let domainName = 'http://localhost:8081';

const Fetch = (method) => {
    const loginUser = async (email, password) => {
        let url = `${domainName}/auth/login`;
        let credentials = btoa(`${email}:${password}`);
        return fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if (response.status === 200)
                    return response.json();
            })
            .then(user => {
                if (user !== undefined) {
                    return user;
                } else {
                    alert("Invalid Email or Password!")
                }
            })
            .catch(() => alert("Network Error Occurred"));
    }
    const logoutUser = (accessToken) => {
        let url = `${domainName}/auth/logout`;
        return fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if (response.status === 200)
                    return response.text();
            })
            .then(textResponse => {
                if (textResponse !== undefined)
                    return textResponse;
            })
            .catch(() => alert("Network Error Occurred"))
    }
    const registerUser = (requestBody) => {
        let url = `${domainName}/users/register`;
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if (response.status === 200)
                    return response.json();
            })
            .then(jsonResponse => {
                if (jsonResponse !== undefined) {
                    return loginUser(requestBody.emailId, requestBody.password);
                } else {
                    alert("Internal Server Error!")
                }
            })
            .catch(() => alert("Network Error Occurred"))
    }
    const getDoctorsList = (filter) => {
        let url = `${domainName}/doctors?speciality=${filter}`;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(jsonDoctorList => {
                return jsonDoctorList;
            })
            .catch(() => alert("Network Error Occurred"));
    }
    const bookAppointment = (requestBody, accessToken) => {
        let url = `${domainName}/appointments`;
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if (response.status === 201)
                    return response.text();
            })
            .then(textResponse => {
                if (textResponse !== undefined)
                    return textResponse;
            })
            .catch(() => alert("Network Error Occurred"))
    }
    const getAppointmentsList = (userId, accessToken) => {
        let url = `${domainName}/users/${userId}/appointments`;
        return fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(appointmentsList => {
                if (appointmentsList !== undefined)
                    return appointmentsList;
            })
            .catch(() => alert("Network Error Occurred"));
    }
    const rateAppointment = (requestBody, accessToken) => {
        let url = `${domainName}/ratings`;
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if (response.status === 200)
                    return response.text();
            })
            .then(textResponse => {
                if (textResponse !== undefined)
                    return textResponse;
            })
            .catch(() => alert("Network Error Occurred"))
    }

    switch (method.methodName) {
        case
        "LoginUser"
        :
            return loginUser(method.email, method.password);
        case
        "LogoutUser"
        :
            return logoutUser(method.accessToken);
        case
        "RegisterUser"
        :
            return registerUser(method.requestBody);
        case
        "GetDoctorsList"
        :
            return getDoctorsList(method.filter);
        case
        "BookAppointment"
        :
            return bookAppointment(method.requestBody, method.accessToken);
        case
        "GetAppointmentsList"
        :
            return getAppointmentsList(method.userId, method.accessToken);
        case
        "RateAppointment"
        :
            return rateAppointment(method.requestBody, method.accessToken);
        default
        :
            return null;
    }
}

export default Fetch;
