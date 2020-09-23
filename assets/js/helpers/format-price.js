export default (price) => {
    return (price / 100)
        .toLocaleString('en-US', { minimumFractionDigits: 2 });
};
