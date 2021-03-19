import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../Store/actions/cartActions";
import * as orderActions from "../../Store/actions/orderActions";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cartReducer.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const transformCartItems = [];
    for (const key in state.cartReducer.items) {
      transformCartItems.push({
        productId: key,
        productTitle: state.cartReducer.items[key].productTitle,
        productPrice: state.cartReducer.items[key].productPrice,
        quantity: state.cartReducer.items[key].quantity,
        sum: state.cartReducer.items[key].sum,
      });
    }
    return transformCartItems.sort((a,b)=>a.productId>b.productId?1:-1);
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          onPress={()=>{
            dispatch(orderActions.addOrder(cartItems,cartTotalAmount))
          }}
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length == 0 ? true : false}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            deletable
            amount={itemData.item.sum.toFixed(2)}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};
CartScreen.navigationOptions={
  headerTitle:"Your cart"
}
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
