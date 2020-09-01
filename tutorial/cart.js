import axios from 'axios';

/**
 * @typedef {Object} CartCollection
 * @property {CartItem} items
 */

/**
 * @typedef {object} CartItem
 * @property {string} product
 * @property {string|null} color
 * @property {number} quantity
 */

/**
 * Gets the Cart IRI or null if there is none
 *
 * @return {string|null}
 */
function getCartId() {
    return window.cartId;
}

/**
 * Finds an item in the cart by productId and colorId
 *
 * @param {CartCollection} cart
 * @param {string} productId
 * @param {string} colorId
 */
function findItemIndex(cart, productId, colorId) {
    return cart.items.findIndex((cartItem) => (
        cartItem.product === productId && cartItem.color === colorId
    ));
}

/**
 * Gets the current cart or an empty object if no cart is present
 *
 * @return {CartCollection}
 */
export async function getCart() {
    const cartId = getCartId();

    if (cartId === null) {
        return new Promise((resolve) => {
            resolve({
                items: [],
            });
        });
    }

    const response = await axios.get(`/api/carts/${cartId}`);
    return { items: response.data.items };
}

/**
 * Adds an item to the cart and saves it
 *
 * @param {CartCollection} cart
 * @param {CartItem} item
 * @return {Promise}
 */
export function addItemToCart(cart, item) {
    const cartId = getCartId();
    const itemIndex = findItemIndex(cart, item.product, item.color);

    if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += item.quantity;
    } else {
        cart.items.push(item);
    }

    if (cartId !== null) {
        return axios.put(`/api/carts/${cartId}`, cart);
    }

    return axios.post('/api/carts', cart);
}

/**
 * Removes an item from the shopping cart
 *
 * @param {CartCollection} cart
 * @param {string} productId
 * @param {string} colorId
 * @return {Promise}
 */
export function removeItemFromCart(cart, productId, colorId) {
    const cartId = getCartId();

    cart.items = cart.items.filter(
        (item) => (!(item.product === productId && item.color === colorId)),
    );

    return axios.put(`/api/carts/${cartId}`, cart);
}

/**
 * Updates the quantity of a product already in the cart
 *
 * @param {CartCollection} cart
 * @param {string} productId
 * @param {string} colorId
 * @param {number} quantity
 * @return {Promise}
 */
export function updateCartItemQuantity(cart, productId, colorId, quantity) {
    const cartId = getCartId();
    const cartItemIndex = findItemIndex(cart, productId, colorId);

    if (cartItemIndex === -1) {
        throw new Error(`Invalid product+color combination: ${productId}, ${colorId}`);
    }

    cart.items[cartItemIndex].quantity = quantity;

    return axios.put(`/api/carts/${cartId}`, cart);
}

/**
 * Clears the shopping cart
 *
 * @return {Promise}
 */
export function clearCart() {
    return axios.delete(`/api/carts/${getCartId()}`);
}

/**
 * Gets the total number of items in our shopping cart
 *
 * @param {CartCollection} cart
 * @return {number}
 */
export function getCartTotalItems(cart) {
    return cart.items.reduce((acc, item) => (acc + item.quantity), 0);
}
