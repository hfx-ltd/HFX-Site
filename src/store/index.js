import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/auth';
import lifeCycleReducer from './reducer/lifeCycle';
import companyReducer from './reducer/company';
import settingReducer from './reducer/settings';
import miscReducer from "./reducer/misc"
import requestReducer from "./reducer/request"
import transactionReducer from './reducer/transaction';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lifeCycle: lifeCycleReducer,
    company: companyReducer,
    setting: settingReducer,
    misc: miscReducer,
    request: requestReducer,
    transaction: transactionReducer
  },
});
