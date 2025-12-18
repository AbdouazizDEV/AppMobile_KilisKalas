import Constants from 'expo-constants';

const ENV = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
    apiTimeout: 30000,
    debugMode: true,
  },
  staging: {
    apiBaseUrl: 'https://staging-api.kilis-kalas.com/api',
    apiTimeout: 30000,
    debugMode: true,
  },
  production: {
    apiBaseUrl: 'https://api.kilis-kalas.com/api',
    apiTimeout: 30000,
    debugMode: false,
  },
};

const getEnvVars = () => {
  const env = Constants.expoConfig?.extra?.environment || 'development';
  return ENV[env as keyof typeof ENV] || ENV.development;
};

export default getEnvVars();

