const baseUrl = import.meta.env.baseUrl ?? "http://localhost:3999";
const endpoint = {
  projects: `${baseUrl}/projects`,
};

export { baseUrl, endpoint as endpoints };
