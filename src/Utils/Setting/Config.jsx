let apiRoot = ''


if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:1303/v1'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://team-job-seek-api.onrender.com/v1'
}

export const DOMAIN = apiRoot
export const USER_LOGIN = "USER_LOGIN";
export const TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
