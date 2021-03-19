import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { useDispatch } from "react-redux";
import CustomHeaderButton from "../../components/UI/Header";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as cartActions from "../../Store/actions/cartActions";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.prodReducer.availableProduct);
  const dispatch = useDispatch();
  return (
    <FlatList
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetails={() =>
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              product: itemData.item,
            })
          }
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
      data={products}
      keyExtractor={(item, index) => item.id}
    />
  );
};
ProductOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS == "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS == "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  listContainer: {
    borderColor: "#000000",
    padding: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
});
export default ProductOverviewScreen;
