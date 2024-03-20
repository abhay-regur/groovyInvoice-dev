const downloadImage = (imageUrl) => {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading image:', error));
}

export {
    downloadImage
}