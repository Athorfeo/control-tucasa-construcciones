export const networkConfig = {
  url: "http://127.0.0.1:5001/tcc-control-system/us-central1/api",
  user: "/user",
  project: "/project",
};

export async function fetchExecutor(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return response.json();
    });
}