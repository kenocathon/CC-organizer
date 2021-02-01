const listEmployees = async (signal) => {
  try {
    let response = await fetch('/api/user/employees/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const createEmployee = async (employee) => {
  try {
    let response = await fetch('/api/user/employees/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//request a single user by id
const readEmployee = async (id, credentials, signal) => {
  try {
    let response = await fetch('/api/user/employee/' + id, {
      method: 'GET',
      signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateEmployee = async (id, credentials, employee) => {
  try {
    let response = await fetch('/api/user/employee/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
      body: JSON.stringify(employee),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeEmployee = async (id, credentials) => {
  try {
    let response = await fetch('/api/user/employee/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  listEmployees,
  createEmployee,
  readEmployee,
  updateEmployee,
  removeEmployee,
};
