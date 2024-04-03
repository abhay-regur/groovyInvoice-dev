const genrateErrorMessage = (error, pageName, setToastList) => {
    if (typeof error.response !== 'undefined' && typeof error.response.status !== 'undefined' && typeof error.response.data.message !== 'undefined') {
        const { statusCode } = error.response.data
        if (statusCode === 401) {
            window.location.replace('/login?session="expired"');
        } else {
            return error.response.data.message;
        }
    } else {
        window.location.replace('/login?session="expired"');
        return 'Internal Error occurred!';
    }
}

export {
    genrateErrorMessage
}

