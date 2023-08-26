const END_POINT = "https://todo-api.roto.codes";
const userName = "wonjun";

async function request(urls: string, options?: object) {
  const res = await fetch(urls, options);
  if (!res.ok) {
    throw new Error("API 호출 실패");
  }
  return await res.json();
}

export const fetchData = {
  get: function () {
    return request(`${END_POINT}/${userName}`);
  },
  post: function (text: string) {
    return request(`${END_POINT}/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: text,
      }),
    });
  },
  put: function (id: string) {
    return request(`${END_POINT}/${userName}/${id}/toggle`, {
      method: "PUT",
    });
  },
};
