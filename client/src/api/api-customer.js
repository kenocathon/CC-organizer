const listCustomers = async (signal) => {
  try {
    let response = await fetch('/api/user/customers/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const searchCustomers = async (signal) => {
  try {
    let response = await fetch('api/user/search/customers', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const createCustomer = async (customer) => {
  try {
    let response = await fetch('/api/user/customers/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

//request a single user by id
const readCustomer = async (id, credentials, signal) => {
  try {
    let response = await fetch('/api/user/customer/' + id, {
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
    console.error(err);
  }
};

const updateCustomer = async (id, credentials, customer) => {
  try {
    let response = await fetch('/api/user/customer/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
      body: JSON.stringify(customer),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const removeCustomer = async (id, credentials) => {
  try {
    let response = await fetch('/api/user/customer/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export {
  listCustomers,
  searchCustomers,
  createCustomer,
  readCustomer,
  updateCustomer,
  removeCustomer,
};
