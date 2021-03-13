import React, { useState } from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productReducers from "./Store/reducers/productReducer";
import ShopNavigator from "./navigation/ShopNavigation";
import { AppLoading } from "expo";
import * as Font from "expo-font";

const rootReducers = combineReducers({
  prodReducer: productReducers,
});
const store = createStore(rootReducers);
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
