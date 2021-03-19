import React from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../../components/UI/Header";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import OrderItem from "../../components/shop/OrderItem";
const OrderScreen = (props) => {
  const orders = useSelector((state) => state.ordersReducer.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData)=><OrderItem items={itemData.item.items} amount={itemData.item.totalAmounts} date={itemData.item.readableDate}/>}
    />
  );
};
OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Order Screen",
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
export default OrderScreen;
