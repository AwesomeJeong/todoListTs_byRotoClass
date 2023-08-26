const END_POINT = "https://todo-api.roto.codes";

async function request(urls: string, options?: object) {
  const res = await fetch(urls, options);
  if (!res.ok) {
    throw new Error("API 호출 실패");
  }
  return await res.json();
}

export const fetchData = {
  get: function (selectedUser: string) {
    return request(`${END_POINT}/${selectedUser}`);
  },
  post: function (text: string, selectedUser: string) {
    return request(`${END_POINT}/${selectedUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: text,
      }),
    });
  },
  put: function (id: string, selectedUser: string) {
    return request(`${END_POINT}/${selectedUser}/${id}/toggle`, {
      method: "PUT",
    });
  },
  delete: function (id: string, selectedUser: string) {
    return request(`${END_POINT}/${selectedUser}/${id}`, {
      method: "DELETE",
    });
  },
  getUsers: function () {
    return request(`${END_POINT}/users`);
  },
};
