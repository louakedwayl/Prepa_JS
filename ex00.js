
// Exercice 1 — Trajets disponibles :
// ----------------------------------

//     Données de départ :
//     -------------------

// const trajets = [
// { id: 1, conducteur: "Alice", places: 3, prix: 5 },
// { id: 2, conducteur: "Bob", places: 0, prix: 4 },
// { id: 3, conducteur: "Chloé", places: 2, prix: 6 },
// { id: 4, conducteur: "David", places: 1, prix: 3 },
// ];

// Écris une fonction trajetsDisponibles(trajets) qui retourne uniquement les trajets
// avec au moins une place libre, triés du moins cher au plus cher


const trajets = [
{ id: 1, conducteur: "Alice", places: 3, prix: 5 },
{ id: 2, conducteur: "Bob", places: 0, prix: 4 },
{ id: 3, conducteur: "Chloé", places: 2, prix: 6 },
{ id: 4, conducteur: "David", places: 1, prix: 3 },
];

function trajetsDisponibles(trajets)
{
    let retval = [];

    retval = trajets.filter((element) => {return element.places > 0});
    retval.sort((a, b ) => {return a.prix - b.prix});
    return (retval);
}

trajetsDisponibles(trajets);