var PRIX_UNITAIRE = 120;
var BADGE_PRICE = 10;
var FLOCK_PRICE = 0;
var quantity = document.getElementById("quantite");
var quantityInit = 1;
var badgeSelector = document.getElementById("badgesSelector");
var badgeCount = 0;
var showTotalPrice = document.getElementById("total");
var total = 0;

var thumbs = document.getElementById("thumbs");
var mainImage = document.getElementById("mainImage");
var flock = document.getElementsByClassName("flock");
var individual = document.getElementById("individual");
var displayNum = document.getElementById("displayNum");
var displayName = document.getElementById("displayName");

function init(){
    badgeSelector.addEventListener("change", badgeChoice);
    quantity.addEventListener("change", quantite);
    thumbs.addEventListener("click", changeMainPhoto);
    for(var i=0; i < flock.length; i++){
        flock[i].addEventListener("click", changeFlock);
    }
    TotalPrice();
}

function badgeChoice(e) {
    if(e.target.checked){
        badgeCount = badgeCount + 1;
    }
    else {
        badgeCount = badgeCount - 1;
    }

    TotalPrice();
}

function quantite(e) {
    quantityInit = e.target.value;
    TotalPrice();
}

function changeMainPhoto(e) {
    mainImage.src = e.target.src;
}

function changeFlock(e) {
    isIndivudual = false;
    if(e.target.innerText === "INDIVIDUAL"){
        e.target.className = "flock selected";
        flock[0].className = "flock";
        FLOCK_PRICE = 10;
        isIndivudual = true;
        TotalPrice();
    } 
    else {
        e.target.className = "flock selected";
        flock[1].className = "flock";
        FLOCK_PRICE = 0;
        isIndivudual = false;
        TotalPrice();
    }

    if(isIndivudual) {
        mainImage.src = "/juvejersey/images/3.jpg";
        initIndividual();
    }
    else {
        mainImage.src = "/juvejersey/images/1.jpg";
        resetIndividual();
        resetDisplayNum();
        resetDisplayName();
    }
}

function initIndividual() {
    if(individual.children.length === 0){
        individual.appendChild(buildIndividual());
    }
}

function buildIndividual() {
    var div = document.createElement("div");
    var num = document.createElement("INPUT");
    num.classList.add("num");
    num.setAttribute("type", "text");
    num.setAttribute("placeholder", "n°");
    num.setAttribute("maxLength", 2);
    var name = document.createElement("INPUT");
    name.setAttribute("type", "text");
    name.setAttribute("placeholder", "name");
    name.classList.add("name");
    div.appendChild(num);
    div.appendChild(name);
 
    num.addEventListener("keyup", displayNumValue);
    name.addEventListener("keyup", displayNameValue);

    return div;
}

function displayNumValue(e) {
    displayNum.innerText = e.target.value;
}

function displayNameValue(e) {
    displayName.innerText = e.target.value;
}

function resetIndividual(){
    individual.innerHTML = "";
}

function resetDisplayNum(){
    displayNum.innerHTML = "";
}

function resetDisplayName(){
    displayName.innerHTML = "";
}

function TotalPrice() {
    total = (PRIX_UNITAIRE * quantityInit) + (BADGE_PRICE * badgeCount) + FLOCK_PRICE;  
    showTotalPrice.innerText = total+'€ ';
}

init();