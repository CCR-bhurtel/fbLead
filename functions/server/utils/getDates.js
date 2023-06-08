exports.oneMonthAgo = () => {
    const today = new Date(); // Current date
    let month = today.getMonth(); // Get current month

    // Check if the current month is January
    if (month === 0) {
        // Adjust the month to December of the previous year
        month = 11; // December is represented as 11 in JavaScript Date object
    } else {
        // Subtract 1 from the current month
        month--;
    }

    const oneMonthAgo = new Date(today.getFullYear(), month, today.getDate());
    return oneMonthAgo;
};

exports.twoWeeksAgo = () => {
    const today = new Date(); // Current date
    const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
    return twoWeeksAgo;
};

exports.oneWeekAgo = () => {
    const today = new Date(); // Current date
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return oneWeekAgo;
};
