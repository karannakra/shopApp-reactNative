export const DELETE_PRODUCT="DELETE_PRODUCT";
export const ADD_OR_EDIT_PRO="ADD_OR_EDIT_PRO"
export const deleteProduct=productId=>{
    return {type:DELETE_PRODUCT,pid:productId}
}
export const addOrdEditProd=(product,prodId)=>{
    return {type:ADD_OR_EDIT_PRO,product,prodId}
}
