
//傳 Date.parse() 回傳的 mini-second
export const parseDate = (ms) => {

    const date = new Date(ms);

    return (
        {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            dayNight: (6<=date.getHours() && date.getHours()<18) ? "day" : "night",
        }
    );
};

export const to2Digit_string = (digitString) => {

    return digitString.length === 1 ? "0" + digitString : digitString;
}