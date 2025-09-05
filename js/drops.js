let dropsData = [];

function getDrops() {
    fetch('https://burgdalin.wiki/json/drops.json')
        .then(function (response) {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }).then(function (data) {
            dropsData = data;
            console.log("Loaded", dropsData.length, "drops");
            getDrop();
        }).catch(error => {
            console.error('Fetch error:', error);
        });
}

function getDrop() {
    if (dropsData.length === 0) {
        console.log("Data not loaded");
        return;
    }

    let rn = Math.floor(Math.random() * dropsData.length);
    while (dropsData[rn].body[0] === "<p></p>" 
        || dropsData[rn].body[0] === "" 
        || dropsData[rn].body[0] === "<p>spell</p>" 
        || dropsData[rn].body[0] === "<p>unfinished</p>" 
        || dropsData[rn].body[0] === "<p>wow such empty</p>"
        || dropsData[rn].title   === "<p>wow such empty</p>") 
    {
        console.log("Empty drop, rerolling");
        rn = Math.floor(Math.random() * dropsData.length);
    }

    document.querySelector(".title").innerHTML = dropsData[rn].title;
    document.querySelector("#main").innerHTML = dropsData[rn].body.join("");
}

getDrops();

document.querySelector("#newDrop").onclick = getDrop;
