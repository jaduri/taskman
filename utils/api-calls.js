export async function getTasks() {
  let response = await fetch("/api/tasks");
  return response.json();
}

export async function createTask(taskDetails) {
  let response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskDetails)
  });

  return response.json();
}

export async function deleteTask(taskId) {
  let response = await fetch(`/api/tasks?id=${taskId}`, {
    method: "DELETE"
  });

  return response.json();
}

export async function updateTask(taskId, taskUpdates) {
  let response = await fetch(`/api/tasks?id=${taskId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskUpdates)
  });

  return response.json();
}
