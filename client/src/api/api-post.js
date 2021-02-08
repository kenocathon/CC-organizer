export const createAsset = async (asset, url) => {
  try {
    let response = await fetch(`http://localhost:8000/api/user${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(asset),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
