import axios from 'axios';

/**
 * @typedef {Object} CartCollection
 * @property {CartItem[]} items
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
function getCartIri() {
    return window.cartIri;
}

function setCartIri(cartIri) {
    window.cartIri = cartIri;
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
 * @return {Promise<CartCollection>}
 */
export async function fetchCart() {
    const cartIri = getCartIri();

    if (cartIri === null) {
        return new Promise((resolve) => {
            resolve({
                items: [],
            });
        });
    }

    const response = await axios.get(cartIri);

    return { items: response.data.items };
}

/**
 * Adds an item to the cart and saves it
 *
 * @param {CartCollection} cart
 * @param {CartItem} item
 * @return {Promise}
 */
export async function addItemToCart(cart, item) {
    const cartIri = getCartIri();
    const itemIndex = findItemIndex(cart, item.product, item.color);

    if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += item.quantity;
    } else {
        cart.items.push(item);
    }

    let response = null;
    if (cartIri !== null) {
        response = await axios.put(cartIri, cart);
    } else {
        response = await axios.post('/api/carts', cart);
        setCartIri(response.data['@id']);
    }

    return { items: response.data.items };
}

/**
 * Removes an item from the shopping cart
 *
 * @param {CartCollection} cart
 * @param {string} productId
 * @param {string} colorId
 * @return {Promise}
 */
export async function removeItemFromCart(cart, productId, colorId) {
    cart.items = cart.items.filter(
        (item) => (!(item.product === productId && item.color === colorId)),
    );

    const response = await axios.put(getCartIri(), cart);

    return { items: response.data.items };
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
export async function updateCartItemQuantity(cart, productId, colorId, quantity) {
    const cartItemIndex = findItemIndex(cart, productId, colorId);

    if (cartItemIndex === -1) {
        throw new Error(`Invalid product+color combination: ${productId}, ${colorId}`);
    }

    cart.items[cartItemIndex].quantity = quantity;

    const response = await axios.put(getCartIri(), cart);

    return { items: response.data.items };
}

/**
 * Clears the shopping cart
 *
 * @return {Promise}
 */
export function clearCart() {
    return axios.delete(getCartIri());
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
