const generatePassword = () => {
    const length = Math.floor(Math.random() * 9) + 8; // Generates a random length between 8 and 16
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[randomIndex];
    }

    return (generatedPassword);
};

export {
    generatePassword
}