import { createStore, combineReducers, applyMiddleware } from "redux";
import bannerReducer from "../reducers/bannerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "../reducers/authReducer";
import servicesReducer from "../reducers/servicesReducer";
import profileReducer from "../reducers/profileReducer";
import balanceReducer from "../reducers/balanceReducer";
import topUpReducer from "../reducers/topUpReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import transactionReducer from "../reducers/transactionReducer";
import registrationReducer from "../reducers/registrasiReducer";
import uploadReducer from "../reducers/uploadReducer";

const rootReducer = combineReducers({
  banner: bannerReducer,
  auth: authReducer,
  services: servicesReducer,
  profile: profileReducer,
  balance: balanceReducer,
  topUp: topUpReducer,
  transaction: transactionReducer,
  registration: registrationReducer,
  upload: uploadReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);

export { store, persistor };
