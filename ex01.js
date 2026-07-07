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
    const retval = {};

    for (let i = 0; i < reservations.length ; i++)
    {   
        for(let j = 0; j < reservations.length ; j++)
        {
            for(let k = 0; k < Object.keys(retval).length ; k++)
            {
                if (reservations[j].conducteur == retval[j].conducteur)
                {
                    retval[j].total += reservations[j].passagers * reservations[j].prixPlace;
                }
                break;
            }
            break;
        }
        
        retval[reservations[i].conducteur] = { total : reservations[i].passagers * reservations[i].prixPlace};
    }
    return retval;
}


console.log(recettesParConducteur(reservations))