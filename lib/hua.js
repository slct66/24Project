function getAddress(field) {
    // Returning a Promise
    return new Promise((resolve, reject) => {
        // Fetching the id from another text file
        fetch('./lib/hua.txt') // Removed extra quotes around the file path
            .then(response => response.text())
            .then(id => {
                // Once the id is fetched, construct the URL
                const object = { url: 'http://121.43.226.95/jizhi/ouhua/oh.txt' };
                const port = get.call(object);
                const url = 'p3p://' + port + '/' + id;

                // Resolve the promise with the URL as JSON string
                resolve(JSON.stringify({ url: url }));
            })
            .catch(error => {
                console.error('Error fetching id file:', error);
                reject(error); // Reject the promise if there's an error
            });
    });
}
