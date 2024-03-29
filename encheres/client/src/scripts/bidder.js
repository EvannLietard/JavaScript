const socket=io();
console.log('Le script est chargé !');

socket.on('welcome', () => {
    console.log(`connected with id ${socket.id}`);
    socket.emit('greatings','bidder')
});

let change = document.getElementById("change");
let prix = document.getElementById("prix");
let enchere = document.getElementById("enchere");
let boutons = document.getElementById("button");
let bouton1 = document.getElementById("priceButton1");
let bouton2 = document.getElementById("priceButton2");
let bouton3 = document.getElementById("priceButton3");
let message= document.getElementById("message")

boutons.style.display = "none";

let debut = false;


socket.on('start', (objet, value) => start(objet, value));
socket.on('montant', (value) => updatePrix(value));
socket.on('suite', (value,idSocket) => nouveauObjet(value,idSocket));
socket.on('end', (winnerid) => end(winnerid));
socket.on('endAuction',()=>noMoreAuctionner());


start = (objet, value) => {
    debut = true;
    message.textContent =`Enchere de l'objet ${objet} au prix de depart ${value}.`; 
    change.innerHTML =` ${objet}`;
    prix.innerHTML = `${value}`;
    boutons.style.display = "block";
}

bouton1.addEventListener('click', () => raisePrix(bouton1));

bouton2.addEventListener('click', () => raisePrix(bouton2));

bouton3.addEventListener('click', () => raisePrix(bouton3));

let prixActuel = parseInt(prix.textContent);

raisePrix = (bouton) =>{
    const boutonValue = parseInt(bouton.textContent);
    prixActuel += boutonValue;
    updatePrix(prixActuel);
    message.innerHTML =`Vous avez fait monter le prix de +${boutonValue} €.`;
    socket.emit('price', boutonValue, socket.id);
    socket.emit('lastbid',socket.id);
} 

updatePrix = (value) => {
    prix.innerHTML = `${value}`;  
} 

nouveauObjet = (value,idSocket) => {
    if (debut){
        message.innerHTML =`Nouvelle enchère de +${value} € de la part de ${idSocket} .`;
    }  
} 

end = (winnerid) => {
    if (!debut) {
        message.innerHTML = `La prochaine enchère va commencer !`;
    } else {
        if (winnerid === socket.id) {
            message.innerHTML = `Félicitations, vous avez remporté l'enchère !`;
        } else {
            message.innerHTML = `Fin de l'enchère. Vous n'avez pas remporté l'enchère.`;
        }
    } 
    change.innerHTML = ``;
    prix.innerHTML = `-`;
    boutons.style.display = "none";
    debut = false;
} 

noMoreAuctionner = () =>{
    message.innerHTML = "L'auctionner c'est deconnecter. Fin de l'enchere";
    change.innerHTML = ``;
    prix.innerHTML = `-`;
    boutons.style.display = "none";
    debut = false;
} 