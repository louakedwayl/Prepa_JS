
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


let trajets = [
{ id: 1, conducteur: "Alice", places: 3, prix: 5 },
{ id: 2, conducteur: "Bob", places: 0, prix: 4 },
{ id: 3, conducteur: "Chloé", places: 2, prix: 6 },
{ id: 4, conducteur: "David", places: 1, prix: 3 },
];

trajets = trajets.filter((element) => element.places > 0);
trajets.sort((a, b) =>{return a.prix - b.prix})


console.log(trajets);