

const Timeout = (timeInMilliSeconds) => {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMilliSeconds));
}

export default Timeout;
