const socket=io();
console.log('Le script est chargé !');
let objet = document.getElementById("objet");
let price = document.getElementById("price");
let startButton = document.getElementById("start");
let hammer = document.getElementById("end");


let statusText = document.getElementById("status");

let montantTotal = parseInt(price.value);

// Je place par défaut le bouton onOff disabled
startButton.disabled = true;
hammer.disabled=true;
let startUsed = false;

function objAndPriceNotNull() {
    if (!startUsed && objet.value.trim() !== "" && price.value !== null) {
        startButton.disabled = false;
        console.log("Peut lancer l'enchère");
    } else {
        // L'un des champs est null, une chaîne vide, ou composée uniquement d'espaces, désactiver le bouton
        startButton.disabled = true;
        console.log("Objet ou prix est null, une chaîne vide, ou composée uniquement d'espaces");
    }
}

objet.addEventListener("input", objAndPriceNotNull);
price.addEventListener("input", objAndPriceNotNull);

let on = document.getElementById("on");
let off = document.getElementById("off");

socket.on("welcome", () => {
    console.log(`connected with id ${socket.id}`);
    socket.emit('greatings','auctioneer')
});
socket.on('auctioneerStatus', ({ isAuctioneer }) => {
    if (isAuctioneer) {
        console.log('You are auctioneer');
        on.style.display = 'block';
        off.style.display = 'none';
    } else {
        on.style.display = 'none';
        off.style.display = 'block';
    }
});

socket.on('price', (value, idSocket) => handleAuction(value, idSocket));

startButton.addEventListener("click", () => start());

hammer.addEventListener("click", () => end());

start = () => {
    const objetNom = objet.value;
    const prix = price.value;
    startButton.disabled = true;
    hammer.disabled= false;
    updateStatusText(`L'enchère commence pour ${objetNom} à ${prix} €.`);
    montantTotal += parseInt(prix);
    montant.textContent =`${montantTotal}`;
    document.querySelector('footer a').addEventListener('click', () => {
        socket.emit('endAuction');
    }); 
    socket.emit('start', objetNom, prix); 
    startUsed = true;
}

updateStatusText = (newStatus) => {
    statusText.textContent = newStatus;
}

handleAuction = (value, idSocket) => {
    updateStatusText(`Enchère reçue de ${idSocket} :+ ${value} €. `);
    montantTotal += value;
    montant.textContent =`${montantTotal}`; 
    socket.emit('montant', montantTotal);
}

end = () => {
    updateStatusText("Vous avez arreté l'enchere");    
    socket.emit('end');
    objet.value='';
    price.value='0';
    montantTotal=0;
    montant.textContent = `${montantTotal}`;
    startUsed=false;
    hammer.disabled= true;
} 




