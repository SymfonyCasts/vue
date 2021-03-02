export default (price) => (
    (price / 100)
        .toLocaleString('en-US', { minimumFractionDigits: 2 })
);
