const generateOTP = () => {
    return Math.floor(10000 + Math.random() * 90000)
}

export default generateOTP