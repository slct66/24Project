function getAddress(field) {
    // Fetching the id from another text file
    fetch('path/to/your/idfile.txt')
      .then(response => response.text())
      .then(id => {
        // Once the id is fetched, construct the URL
        const object = { url: 'http://121.43.226.95/jizhi/ouhua/oh.txt' };
        const port = get.call(object);
        const url = 'p3p://' + port + '/' + id;

        // Return the URL as JSON string
        return JSON.stringify({ url: url });
      })
      .catch(error => {
        console.error('Error fetching id file:', error);
      });
}
