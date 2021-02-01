const listMaterials = async (signal) => {
  try {
    let response = await fetch('/api/user/materials/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const createMaterialItem = async (material) => {
  try {
    let response = await fetch('/api/user/materials/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//request a single user by id
const readMaterialItem = async (id, credentials, signal) => {
  try {
    let response = await fetch('/api/user/material/' + id, {
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

const updateMaterialItem = async (id, credentials, user) => {
  try {
    let response = await fetch('/api/user/material/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeMaterialItem = async (id, credentials) => {
  try {
    let response = await fetch('/api/user/material/' + id, {
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
  listMaterials,
  createMaterialItem,
  readMaterialItem,
  updateMaterialItem,
  removeMaterialItem,
};
