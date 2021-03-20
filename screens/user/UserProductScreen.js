import React from "react";
import { FlatList, Button } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/Header";
import Colors from "../../constants/Colors";
import * as productActions from "../../Store/actions/productAction";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.prodReducer.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id,product) => {
    props.navigation.navigate({
      routeName:"EditProduct",
      params:{
        productId:id,
        product
      }
    });
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id,itemData.item);
          }}
        >
          <Button
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id,itemData.item);
            }}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(itemData.item.id));
            }}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};
UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="add"
          iconName={Platform.OS == "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
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
export default UserProductsScreen;
