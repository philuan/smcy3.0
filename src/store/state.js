let defaultCartList = []
try {
  if (localStorage.cartList) {
    defaultCartList = localStorage.cartList
  }
} catch (e) {}

export default {
  shoppingCartList: defaultCartList
}
