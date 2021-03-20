import React, { useEffect, useState,useCallback } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector ,useDispatch} from "react-redux";
import * as productActions from '../../Store/actions/productAction';
import CustomHeaderButton from "../../components/UI/Header";
const EditProductScreen = (props) => {
  const[inEdit,setInEdit]=useState(false)
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  
  const dispatch=useDispatch()
  
  const dispatchActionHandler=useCallback(()=>{
    let editedOrNewProduct={};
      editedOrNewProduct['title']=title
      editedOrNewProduct['imageUrl']=imageUrl
      editedOrNewProduct['price']=Price
      editedOrNewProduct['description']=Description
      editedOrNewProduct['id']=inEdit?props.navigation.getParam('product').id:'p7'
      dispatch(productActions.addOrdEditProd(editedOrNewProduct,editedOrNewProduct['id']))
  },[dispatch])

  const prodId = props.navigation.getParam("productId");
  

  const titleChangeHandler = (title) => {
    setTitle(title);
  };

  const imageUrlChangeHandler = (imageUrl) => {
    setImageUrl(imageUrl);
  };
  const priceChangeHandler = (price) => {
    setPrice(price);
  };
  const descriptionChangeHandler = (description) => {
    setDescription(description);
  };
  useEffect(() => {
    if (props.navigation.getParam("productId")) {
      const product = props.navigation.getParam("product");
      setTitle(product.title);
      setInEdit(true)
      setImageUrl(product.imageUrl);
      setPrice(product.price.toString());
      setDescription(product.description);
    }
    props.navigation.setParams({'dispatch':dispatchActionHandler})
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={imageUrlChangeHandler}
          />
        </View>
        {!inEdit && <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={Price}
            keyboardType="numeric"
            onChangeText={priceChangeHandler}
          />
        </View>}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={Description}
            onChangeText={descriptionChangeHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const headerTitle = navData.navigation.getParam("productId")
    ? "Edit Product"
    : "Add Product";
  return {
    headerTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS == "android" ? "md-checkmark" : "ios-checkmark"}
          iconSize={23}
          onPress={navData.navigation.getParam('dispatch')}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
export default EditProductScreen;
