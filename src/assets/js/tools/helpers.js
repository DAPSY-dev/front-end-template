export function debounce(callback, delay = 250) {
    let timeout = null;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => void callback(...args), delay);
    };
};

export function throttle(callback, delay = 250) {
    let shouldWait = false;
    let waitingArgs = null;

    const timeoutFunc = () => {
        if (waitingArgs === null) {
            shouldWait = false;
            return null;
        }

        callback(...waitingArgs);
        setTimeout(timeoutFunc, delay);
        waitingArgs = null;
    };

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return null;
        }

        callback(...args);
        setTimeout(timeoutFunc, delay);
        shouldWait = true;
    };
};
