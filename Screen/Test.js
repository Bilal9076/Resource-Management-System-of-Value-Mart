
const functions = {
    fetchData :() => {
       return async (dispatch) => {
               const response = await fetch('https://resource-management-syst-f1733-default-rtdb.firebaseio.com/PurchesProduct.json');
       }
}
}
module.exports = functions;