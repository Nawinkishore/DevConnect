// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer, { logout } from "./auth/authSlice";
import profileReducer from "./profile/profilleSlice";
// import other reducers here...

const appReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  // other reducers...
});

// Root reducer that clears state on logout
const rootReducer = (state: any, action: any) => {
  if (action.type === logout.type) {
    state = undefined; // 🔥 clears the whole redux state
    localStorage.removeItem("auth"); // remove persisted auth too
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
