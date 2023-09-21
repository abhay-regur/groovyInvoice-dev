const genrateErrorMessage = (error, pageName) => {
    if (typeof error.response !== 'undefined' && typeof error.response.status !== 'undefined' && typeof error.response.data.message !== 'undefined') {
        return error.response.data.message;
    }
    else {
        console.log(error);
        return 'Internal Error occurred!';
    }
}

export {
    genrateErrorMessage
}

