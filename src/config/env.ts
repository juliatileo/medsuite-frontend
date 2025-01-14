const env = import.meta.env;

const {
  VITE_BASE_URL: baseUrl,
  VITE_USER_SECRET: userSecret,
  VITE_TOKEN_SECRET: tokenSecret,
} = env;

export { baseUrl, userSecret, tokenSecret };
