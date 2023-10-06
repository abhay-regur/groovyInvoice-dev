const genrateErrorMessage = (error, pageName, setToastList) => {
    if (typeof error.response !== 'undefined' && typeof error.response.status !== 'undefined' && typeof error.response.data.message !== 'undefined') {
        const { statusCode } = error.response.data
        if (statusCode === 401) {
            console.log('Session Expired!')
            if (setToastList != null) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Login Expired',
                    description: 'The Login session has expired, Please login again!',
                }]);
            }
            return "Session Expired!";
        } else {
            return error.response.data.message;
        }
    } else {
        console.log(error);
        return 'Internal Error occurred!';
    }
}

export {
    genrateErrorMessage
}

