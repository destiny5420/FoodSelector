const url = 'https://spreadsheets.google.com/feeds/list/1c33GbQbLi5K-7smmt9wHCeP2FLtonx9PBJ1Y5k_j61Q/1/public/values?alt=json'
const duration = 1000;
let bTaipeiSataus = true;
let bTaichungSataus = false;

$(document).ready(function(){
    $("#taipei").click(function (e) { 
        e.preventDefault();
        $('#taipei').removeAttr('class');
        $('#taichung').removeAttr('class');
        bTaipeiSataus = !bTaipeiSataus;
        bTaichungSataus = !bTaipeiSataus;
        
        let sStateTaipei = bTaipeiSataus == true ? 'on' : 'off';
        let sStateTaichung = bTaipeiSataus == false ? 'on' : 'off';
        $('#taipei').attr('class', sStateTaipei);
        $('#taichung').attr('class', sStateTaichung);

        // console.log('Click taipei button! / TaipeiSataus: ' + bTaipeiSataus + ' / TaichungSataus: ' + bTaichungSataus);
    });

    $("#taichung").click(function (e) { 
        e.preventDefault();
        $('#taipei').removeAttr('class');
        $('#taichung').removeAttr('class');
        bTaichungSataus = !bTaichungSataus;
        bTaipeiSataus = !bTaichungSataus;
        
        let sStateTaipei = bTaipeiSataus == true ? 'on' : 'off';
        let sStateTaichung = bTaipeiSataus == false ? 'on' : 'off';
        $('#taipei').attr('class', sStateTaipei);
        $('#taichung').attr('class', sStateTaichung);

        // console.log('Click taipei button! / TaipeiSataus: ' + bTaipeiSataus + ' / TaichungSataus: ' + bTaichungSataus);
    });
});

function toggleArea(){

}

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
        
        // console.table(taipei);
        // console.table(taichung);

        let ramdomNum;
        let max;
        let min;
        let result;
        
        const map = document.querySelector('.map iframe');

        $('.confirmBtn').click(function (e) { 
            e.preventDefault();
            e.target.classList.add('not-allow');
            chooseShop(bTaipeiSataus == true ? taipei : taichung, map);
        });
    })

function chooseShop(data, map) {

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
    // console.log('Data['+ randomIndex +']: ' + result);
    list[0].innerHTML = result;

    // remove animation
    setTimeout(() => {
        list.forEach(i =>  i.removeAttribute('class'));
        map.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBrluCtjiOp9sIgSyKWngrRTA31u6KriWE&q=' + result;
    }, duration);
}

function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}