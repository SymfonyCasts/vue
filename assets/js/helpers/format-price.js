/**
 * Formats the product price adding a dot in the correct decimal places
 *
 * @param {number} price
 * @returns {string}
 */
const formatPrice = (price) => {
    const strPrice = price.toString();
    return `${strPrice.substr(0, strPrice.length - 2)}.${strPrice.substr(-2)}`;
};

export default formatPrice;
