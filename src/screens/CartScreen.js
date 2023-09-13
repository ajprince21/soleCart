import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem'

const CartScreen = () => {
  let product = {
    name:'Nike',
    totalPrice:200,
    quantity:20,
    image: require("../images/shoes_5.jpg"),
  }
  return (
    <View style={styles.container}>
      <CartItem
        product={product}
        name={'Nike'}
        totalPrice={200}
        quantity={20}
        image={require("../images/shoes_5.jpg")}
      />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})