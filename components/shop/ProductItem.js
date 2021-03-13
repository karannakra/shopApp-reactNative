import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
export default productItem = (props) => {
  let MyComponent = TouchableOpacity;
  if (Platform.OS == "android") {
    MyComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.products}>
      <MyComponent onPress={props.onViewDetails} useForeground>
        <View>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.detail}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            <Button
              title="View Details"
              onPress={props.onViewDetails}
              color={Colors.primary}
            />
            <Button
              title="To Cart"
              onPress={props.onAddToCart}
              color={Colors.primary}
            />
          </View>
        </View>
      </MyComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  products: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    fontFamily: "open-sans-bold",
    color: "#888888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
  detail: {
    alignItems: "center",
    height: "15%",
    fontFamily: "open-sans",
    padding: 10,
  },
});
