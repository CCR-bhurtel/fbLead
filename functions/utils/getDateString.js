const getDateString = (date) => {
    const currentDate = new Date(date);
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
};

export default getDateString;
