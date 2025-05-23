export const mailTemplates = {
  auth: {
    registration: './registration',
    forgotPassword: './reset-password',
    newPassword: './new-password',
  },
};

export const mailSubject = {
  auth: {
    registration: 'Welcome to TA-TRACK',
    forgotPassword: 'Password Reset',
    newPassword: 'New Password',
  },
};

export const assetsHostingUrl = {
  development: process.env.TA_TRACK_DEV_API_HOST_URL,
  production: process.env.TA_TRACK_PROD_API_HOST_URL,
};

export const timeZone = 'America/Denver';
