export const createAsset = async (asset, url) => {
  try {
    let response = await fetch(`/api/user${url}`, {
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
