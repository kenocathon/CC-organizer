const login = async (user) => {
  try {
    let response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    console.log(response);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const hasCorrectRole = async (userId, role) => {
  try {
    let response = await fetch('/api/admin/roles', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, role }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const findId = () => {
  const token = JSON.parse(localStorage.getItem('jwt'));
  const id = token.user._id;
  return id;
};

const findUserRole = () => {
  const token = JSON.parse(localStorage.getItem('jwt'));
  const role = token.user.role;
  return role;
};

export { login, hasCorrectRole, findId, findUserRole };
