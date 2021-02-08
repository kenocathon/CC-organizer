export const listAssets = async (signal, url) => {
  try {
    let response = await fetch(`http://localhost:8000/api/user${url}/`, {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const searchAssets = async (signal, url) => {
  try {
    let response = await fetch(`http://localhost:8000/api/user/search${url}/`, {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const singleAsset = async (signal, url) => {
  try {
    let response = await fetch(`http://localhost:8000/api/user${url}/`, {
      method: 'GET',
      signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};
