function getAddress(field) {
    let idList;
    if (field.url.endsWith('.txt')) {
        idList = getIdListFromTxt('./lib/test.txt'); // Adjust the path accordingly
    } else {
        // Fetch ID from JSON configuration
        // Placeholder example: Replace with logic to fetch IDs from JSON
        idList = [{ filename: 'hua', id: 'example_id' }];
    }

    const object = { url: 'http://121.43.226.95/jizhi/ouhua/oh.txt' };
    const port = get.call(object); // Assuming this retrieves the port number

    const urls = idList.map(item => {
        return 'p3p://' + port + '/' + item.id;
    });

    return JSON.stringify({ urls: urls });
}

