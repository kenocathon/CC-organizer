export const listAssets = async (signal) => {
  try {
    let response = await fetch(`api/user/employees`, {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const searchAssets = async (signal, {url}) => {
  try {
    let response = await fetch(`api/user/search${url}`, {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const singleAsset = async (id, credentials, signal, url) => {
  try {
    let response = await fetch(`/api/user${url}/` + id, {
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