const url = 'https://spreadsheets.google.com/feeds/list/1c33GbQbLi5K-7smmt9wHCeP2FLtonx9PBJ1Y5k_j61Q/1/public/values?alt=json'
const duration = 1000;

fetch(url)
    .then(res => res.json())
    .then(data => {

        let taipei = []
        let taichung = []
        const d = data.feed.entry
        const length = d.length

        for (let i = 0; i < length; i++) {
            d[i].gsx$area.$t === 'taipei' ? taipei.push(d[i].gsx$name.$t) : taichung.push(d[i].gsx$name.$t);
        }
        
        console.table(taipei);
        console.table(taichung);

        let ramdomNum;
        let max;
        let min;
        let result;

        $('.confirmBtn').click(function (e) { 

            e.preventDefault();
            e.target.classList.add('not-allow');
            chooseShop(taichung);

        });
    })

function chooseShop(data) {

    // clear & insert
    let inputSlot = document.querySelector('.wrap');
    inputSlot.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        inputSlot.insertAdjacentHTML('beforeend', '<span>' + data[i] + '</span>');
    }

    // Avoid touch button
    
    // add animation class
    const list = document.querySelectorAll('.wrap > span');
    list.forEach(i => i.classList.add('span-' + (data.length - 1)));

    let randomIndex = randomNum((data.length - 1), 0);
    let result = data[randomIndex];
    console.log('Data['+ randomIndex +']: ' + result);
    list[0].innerHTML = result;

    // remove animation
    setTimeout(() => {
        list.forEach(i =>  i.removeAttribute('class'));
        console.log('Complete animation.');
    }, duration);
}

function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}