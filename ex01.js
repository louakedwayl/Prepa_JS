// Exercice 2 — Recettes par conducteur
// Données de départ :
// const reservations = [
// { trajet: "Paris-Lyon", conducteur: "Alice", passagers: 2, prixPlace: 15 },
// { trajet: "Paris-Lille", conducteur: "Bob", passagers: 3, prixPlace: 10 },
// { trajet: "Lyon-Marseille", conducteur: "Alice", passagers: 1, prixPlace: 20 },
// { trajet: "Paris-Rennes", conducteur: "Chloé", passagers: 2, prixPlace: 12 },
// { trajet: "Lille-Bruxelles", conducteur: "Bob", passagers: 2, prixPlace: 8 },
// ];

// Écris une fonction recettesParConducteur(reservations) qui retourne un objet avec, pour chaque
// conducteur, le total gagné (passagers × prixPlace, additionné sur tous ses trajets).

const reservations = [
{ trajet: "Paris-Lyon", conducteur: "Alice", passagers: 2, prixPlace: 15 },
{ trajet: "Paris-Lille", conducteur: "Bob", passagers: 3, prixPlace: 10 },
{ trajet: "Lyon-Marseille", conducteur: "Alice", passagers: 1, prixPlace: 20 },
{ trajet: "Paris-Rennes", conducteur: "Chloé", passagers: 2, prixPlace: 12 },
{ trajet: "Lille-Bruxelles", conducteur: "Bob", passagers: 2, prixPlace: 8 },
];

function recettesParConducteur(reservations)
{
    let retval = {};

    for (let i = 0; i < reservations.length ; i++)
    {
        if (retval[reservations[i].conducteur])
        {
            retval[reservations[i].conducteur].total += reservations[i].passagers * reservations[i].prixPlace;
        }
        else
        {
            retval[reservations[i].conducteur] = {total : reservations[i].passagers * reservations[i].prixPlace}    
        }
    }
    return retval;
}

console.log (recettesParConducteur(reservations));