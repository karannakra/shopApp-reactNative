import React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import Colors from "../../constants/Colors";
import { useSelector,useDispatch } from "react-redux";
import * as cartActions from '../../Store/actions/cartActions'
const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.prodReducer.availableProduct.find((prod) => prod.id == productId)
  );
  const dispatch=useDispatch()
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.action}>
        <Button color={Colors.primary} title="Add to Cart" onPress={()=>{
          dispatch(cartActions.addToCart(selectedProduct))
        }} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};
ProductDetailScreen.navigationOptions = (navigationData) => {
  const selectedProduct = navigationData.navigation.getParam("product");
  return {
    headerTitle: selectedProduct.title,
  };
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
});
export default ProductDetailScreen;
