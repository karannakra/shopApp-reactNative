import React, { useState } from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productReducers from "./Store/reducers/productReducer";
import ShopNavigator from "./navigation/ShopNavigation";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {LogBox} from 'react-native'
import cartReducer from "./Store/reducers/cartReducer";
import orderReducer from "./Store/reducers/orderReducers";
import { composeWithDevTools } from "redux-devtools-extension";
LogBox.ignoreAllLogs()
const rootReducers = combineReducers({
  prodReducer: productReducers,
  cartReducer: cartReducer,
  ordersReducer:orderReducer
});
const store = createStore(rootReducers);

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading onError={(err) => console.log(err)} />;
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
