// vite.config.js or a separate config file
const devConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5002",
};

const prodConfig = {
  baseURL: "Your production url",
};

export const config = import.meta.env.PROD ? prodConfig : devConfig;
