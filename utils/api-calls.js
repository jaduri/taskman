
// const baseUrl = "http://127.0.0.1:8000";
const baseUrl = "";

const getToken = () => localStorage.getItem("token");

export async function authenticate() {
  let response = await fetch(baseUrl + "/api/auth/refresh", {
    method: "POST",
    credentials: 'include',
  });

  return response.json();
}

export async function register(details) {
  let response = await fetch(baseUrl + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
    credentials: 'include',
  });

  return response.json();
}

export async function login(credentials) {
  let response = await fetch(baseUrl + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  return response.json();
}

export async function logout() {}

export async function getTasks() {
  try {
    let response = await fetch(baseUrl + "/api/tasks", {
      headers: {
        token: getToken(),
      },
      credentials: 'include',
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
  
}

export async function createTask(taskDetails) {
  let response = await fetch(baseUrl + "/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    credentials: 'include',
    body: JSON.stringify(taskDetails),
  });

  return response.json();
}

export async function deleteTask(taskId) {
  let response = await fetch(baseUrl + `/api/tasks?id=${taskId}`, {
    method: "DELETE",
    headers: {
      token: getToken(),
    },
    credentials: 'include',
  });

  return response.json();
}

export async function updateTask(taskId, taskUpdates) {
  let response = await fetch(baseUrl + `/api/tasks?id=${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    credentials: 'include',
    body: JSON.stringify(taskUpdates),
  });

  return response.json();
}
