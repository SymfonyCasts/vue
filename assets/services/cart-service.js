import axios from 'axios';
<<<<<<< HEAD
import { getColors } from '@/services/colors-service';
import { getProductsById } from '@/services/products-service';
=======
>>>>>>> vue-2-final

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
<<<<<<< HEAD
function getCartId() {
    return window.cartId;
=======
function getCartIri() {
    return window.cartIri;
}

function setCartIri(cartIri) {
    window.cartIri = cartIri;
>>>>>>> vue-2-final
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
<<<<<<< HEAD
 * @return {CartCollection}
 */
export async function getCart() {
    const cartId = getCartId();

    if (cartId === null) {
=======
 * @return {Promise<CartCollection>}
 */
export async function fetchCart() {
    const cartIri = getCartIri();

    if (cartIri === null) {
>>>>>>> vue-2-final
        return new Promise((resolve) => {
            resolve({
                items: [],
            });
        });
    }

<<<<<<< HEAD
    const response = await axios.get(`/api/carts/${cartId}`);
=======
    const response = await axios.get(cartIri);

>>>>>>> vue-2-final
    return { items: response.data.items };
}

/**
 * Adds an item to the cart and saves it
 *
 * @param {CartCollection} cart
 * @param {CartItem} item
 * @return {Promise}
 */
<<<<<<< HEAD
export function addItemToCart(cart, item) {
    const cartId = getCartId();
=======
export async function addItemToCart(cart, item) {
    const cartIri = getCartIri();
>>>>>>> vue-2-final
    const itemIndex = findItemIndex(cart, item.product, item.color);

    if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += item.quantity;
    } else {
        cart.items.push(item);
    }

<<<<<<< HEAD
    if (cartId !== null) {
        return axios.put(`/api/carts/${cartId}`, cart);
    }

    return axios.post('/api/carts', cart);
=======
    let response = null;
    if (cartIri !== null) {
        response = await axios.put(cartIri, cart);
    } else {
        response = await axios.post('/api/carts', cart);
        setCartIri(response.data['@id']);
    }

    return { items: response.data.items };
>>>>>>> vue-2-final
}

/**
 * Removes an item from the shopping cart
 *
 * @param {CartCollection} cart
 * @param {string} productId
 * @param {string} colorId
 * @return {Promise}
 */
<<<<<<< HEAD
export function removeItemFromCart(cart, productId, colorId) {
    const cartId = getCartId();

=======
export async function removeItemFromCart(cart, productId, colorId) {
>>>>>>> vue-2-final
    cart.items = cart.items.filter(
        (item) => (!(item.product === productId && item.color === colorId)),
    );

<<<<<<< HEAD
    return axios.put(`/api/carts/${cartId}`, cart);
=======
    const response = await axios.put(getCartIri(), cart);

    return { items: response.data.items };
>>>>>>> vue-2-final
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
<<<<<<< HEAD
export function updateCartItemQuantity(cart, productId, colorId, quantity) {
    const cartId = getCartId();
=======
export async function updateCartItemQuantity(cart, productId, colorId, quantity) {
>>>>>>> vue-2-final
    const cartItemIndex = findItemIndex(cart, productId, colorId);

    if (cartItemIndex === -1) {
        throw new Error(`Invalid product+color combination: ${productId}, ${colorId}`);
    }

    cart.items[cartItemIndex].quantity = quantity;

<<<<<<< HEAD
    return axios.put(`/api/carts/${cartId}`, cart);
=======
    const response = await axios.put(getCartIri(), cart);

    return { items: response.data.items };
>>>>>>> vue-2-final
}

/**
 * Clears the shopping cart
 *
 * @return {Promise}
 */
export function clearCart() {
<<<<<<< HEAD
    return axios.delete(`/api/carts/${getCartId()}`);
=======
    return axios.delete(getCartIri());
>>>>>>> vue-2-final
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
<<<<<<< HEAD

/**
 * Gets the full info on the shopping cart
 *
 * @param {CartCollection} cart
 * @returns {Array}
 */
export async function getFullShoppingCart(cart) {
    const productIds = cart.items.map((item) => item.product);
    let colorsResponse = null;
    let productsResponse = null;

    try {
        [colorsResponse, productsResponse] = await Promise.all([
            getColors(),
            getProductsById(productIds),
        ]);
    } catch (e) {
        return [];
    }

    const mappedColors = {};

    // Map all colors to our object dictionary by @id
    colorsResponse.data['hydra:member'].forEach((color) => {
        mappedColors[color['@id']] = color;
    });

    // Assign our returned products to our products array,
    // applying the proper colorId, hexColor and qty values
    return productsResponse.data['hydra:member'].map((product) => {
        const productInCart = cart.items.find(
            (item) => (item.product === product['@id']),
        );

        return {
            ...product,
            colorId: productInCart.color,
            hexColor: productInCart.color
                ? mappedColors[productInCart.color].hexColor
                : 'fff',
            qty: productInCart.quantity,
        };
    });
}
=======
>>>>>>> vue-2-final
