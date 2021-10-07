// export async function () {
//
// }

const getToken = () => localStorage.getItem("token");

export async function authenticate(token) {
  let response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });

  return response.json();
}

export async function register(details) {
  let response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });

  return response.json();
}

export async function login(credentials) {
  let response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function logout() {}

export async function getTasks() {
  let response = await fetch("/api/tasks", {
    headers: {
      token: getToken(),
    },
  });
  return response.json();
}

export async function createTask(taskDetails) {
  let response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(taskDetails),
  });

  return response.json();
}

export async function deleteTask(taskId) {
  let response = await fetch(`/api/tasks?id=${taskId}`, {
    method: "DELETE",
    headers: {
      token: getToken(),
    },
  });

  return response.json();
}

export async function updateTask(taskId, taskUpdates) {
  let response = await fetch(`/api/tasks?id=${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      headers: {
        token: getToken(),
      },
    },
    body: JSON.stringify(taskUpdates),
  });

  return response.json();
}
