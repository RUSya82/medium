export const getRange = (start, end) => {
    const res = [];
    for (let i = start; i <= end; i++){
        res.push(i);
    }
    return res;
}