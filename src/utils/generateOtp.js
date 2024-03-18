

export const generateOtp = ()=> {
    return Math.random().toString().slice(2, 8);
}