const baseUrl = import.meta.env.baseUrl ?? "http://localhost:3999";
const endpointV1 = {
  projects: `${baseUrl}/projects`,
};

export { baseUrl, endpointV1 as endpoints };
