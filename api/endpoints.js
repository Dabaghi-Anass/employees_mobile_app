const BASE_URL = "http://172.17.32.1:9000"
const API_DOMAIN = `${BASE_URL}/api/employees`;
const MEDIA_DOMAIN = `${BASE_URL}/media`;
export const getEmployeesEndpoint = (offset , limit) =>`${API_DOMAIN}?offset=${offset}&limit=${limit}`;
export const getCitiesEndpoint = () =>  API_DOMAIN + "/cities";
export const getEmployeesByCityEndpoint = (city) => `${API_DOMAIN}?city=${city}`;
export const getEmployeeByNameEndpoint = (name) => `${API_DOMAIN}?name=${name}`;
export const getEmployeeByIdEndpoint = (id) => `${API_DOMAIN}/${id}`;
export const putEmployeeByIdEndpoint = (id) => `${API_DOMAIN}/${id}`;
export const createEmployeeEndpoint = () => `${API_DOMAIN}`;
export const deleteEmployeeByIdEndPoint = (id) => `${API_DOMAIN}/${id}`;
export const getMediaUploadEndPoint = () => `${MEDIA_DOMAIN}/upload`;
