import { subscribe } from "diagnostics_channel";

export const mailTemplates = {
  auth: {
    registration: './registration',
    forgotPassword: './reset-password',
    newPassword: './new-password',
   
  },
  mailFunction:{
     orderConfirm: './order-confirmation',
     subscribe: './subscribe'
  }
};

export const mailSubject = {
  auth: {
    registration: 'Welcome to TA-TRACK',
    forgotPassword: 'Password Reset',
    newPassword: 'New Password',
  },
  mailFunction:{
    orderConfirm: 'Your Order Has Been Confirmed – Thank You for Shopping with Us!',
    subscribe:'Glad to have you, Deflux! Your shopping journey starts here.'
  }
};

export const assetsHostingUrl = {
  development: process.env.TA_TRACK_DEV_API_HOST_URL,
  production: process.env.TA_TRACK_PROD_API_HOST_URL,
};

export const timeZone = 'America/Denver';
