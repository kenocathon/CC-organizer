const listJobs = async (signal) => {
  try {
    let response = await fetch('/api/user/jobs/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listTodaysJobs = async (signal, jobId) => {
  try {
    const today = Date.now;
    let response = await fetch('/api/user/jobs/' + today, {
      method: 'GET',
      signal: signal,
    });
  } catch (err) {
    console.log(err);
  }
};

const createJob = async (job) => {
  try {
    let response = await fetch('/api/user/jobs/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//request a job user by id
const readJob = async (id, credentials, signal) => {
  try {
    let response = await fetch('/api/user/job/' + id, {
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

const updateJob = async (id, credentials, job) => {
  try {
    let response = await fetch('/api/user/job/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
      body: JSON.stringify(job),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeJob = async (id, credentials) => {
  try {
    let response = await fetch('/api/user/job/' + id, {
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

export { listTodaysJobs, listJobs, createJob, readJob, updateJob, removeJob };
