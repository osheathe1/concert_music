var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=222&apikey=sfc1Y0bX3Zgic2mQV35brq7ZrgP0muej';

var responseText = document.getElementById('response-text');
var eventsection = document.getElementById('allevents')
function getApi(request) {
    fetch(requestUrl)
        .then(function (response) {
            // Check the console first to see the response.status
            console.log(response.status);
            // Then write the conditional based on that response.status value

            return response.json()
        })
        .then(function (data) {
            console.log(data);
            cards(data)
        });
}

getApi(requestUrl);

function cards(data) {
    eventsection.innerHTML = ""
    for (var i = 0; i < 8; i++) {
        var randomindex = Math.floor(Math.random() * data._embedded.events.length)
        var randomevents = data._embedded.events[randomindex]
        console.log(randomevents)
        eventsection.innerHTML += `<div class="card col s3">
<div class="card-image waves-effect waves-block waves-light">
  <img class="activator" src="${randomevents.images[0].url}">
</div>
<div class="card-content">
  <span class="card-title activator grey-text text-darken-4">${randomevents.name}<i
      class="material-icons right">more_vert</i></span>
  <p><a href="${randomevents.url}">Go to Ticketmaster</a></p>
</div>
<div class="card-reveal">
  <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
  <p>Here is some more information about this product that is only revealed once clicked on.</p>
</div>
</div>`
    }
}

function doMath(num1, num2) {
    if (num1 < 10) {
        console.log("SOmething!@!!")
    }
    return num1 + num2
}
var one = 1
doMath(12, one)