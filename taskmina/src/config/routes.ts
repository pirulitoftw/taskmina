const API_VERSION = import.meta.env.VITE_API_VERSION;

export const AUTH_ROUTES = {
  LOGIN: `/api/${API_VERSION}/auth/login`,
  REGISTER: `/api/${API_VERSION}/auth/register`,
  VERIFY: `/api/${API_VERSION}/auth/verify`,
  FORGOT_PASSWORD: `/api/${API_VERSION}/auth/forgot-password`,
  RESET_PASSWORD: `/api/${API_VERSION}/auth/reset-password`,
  PROFILE: `/api/${API_VERSION}/auth/profile`,
};

export const TASK_ROUTES = {
  BASE: `/api/${API_VERSION}/tasks`,
  CREATE: `/api/${API_VERSION}/tasks`,
  UPDATE: `/api/${API_VERSION}/tasks/:id`,
  DELETE: `/api/${API_VERSION}/tasks/:id`,
  GET_ALL: `/api/${API_VERSION}/tasks`,
  GET_ONE: `/api/${API_VERSION}/tasks/:id`,
  COMPLETE: `/api/${API_VERSION}/tasks/:id/complete`,
  INCOMPLETE: `/api/${API_VERSION}/tasks/:id/incomplete`,
  BY_PRIORITY: `/api/${API_VERSION}/tasks/priority/:priority`,
  BY_DUE_DATE: `/api/${API_VERSION}/tasks/due/:date`
};