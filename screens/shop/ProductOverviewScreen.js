import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.prodReducer.availableProduct);
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
          onAddToCart={() => {}}
        />
      )}
      data={products}
      keyExtractor={(item, index) => item.id}
    />
  );
};
ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
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
