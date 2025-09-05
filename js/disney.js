fetch('https://api.disneyapi.dev/character').then(function (response) {
    if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }).then(function (data){
        console.log(data);
    }).catch(function (error) {
        console.error('Fetch error:', error);
});     