const listVendors = async (signal) => {
  try {
    let response = await fetch('/api/user/vendors/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const createVendor = async (vendor) => {
  try {
    let response = await fetch('/api/user/vendors/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendor),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//request a single user by id
const readVendor = async (id, credentials, signal) => {
  try {
    let response = await fetch('/api/user/vendor/' + id, {
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

const updateVendor = async (id, credentials, vendor) => {
  try {
    let response = await fetch('/api/user/vendor/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
      body: JSON.stringify(vendor),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeVendor = async (id, credentials) => {
  try {
    let response = await fetch('/api/user/vendor/' + id, {
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

export { listVendors, createVendor, readVendor, updateVendor, removeVendor };
