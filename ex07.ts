// Exercice 7 — Recherche et réservation (conditions réelles)
// -----------------------------------------------------------
//
// Format test technique : un énoncé, des données, des tests déjà
// écrits en bas de fichier. Pas de code à trous, rien à décommenter.
// Tu écris TOUT : les types et les fonctions.
//
//   Vérifier :  npx tsc        (silencieux = OK)
//   Exécuter :  node ex07.ts   (compare avec les valeurs attendues)
//
// Au premier npx tsc, il râlera « Cannot find name ... » : normal,
// les tests appellent des fonctions que tu n'as pas encore écrites.
// Google autorisé, comme en vrai.
//
// Contexte : moteur de recherche de covoiturage domicile-travail.
//
// ------------------------------------------------------------------
// DONNÉES
// ------------------------------------------------------------------

const trajets = [
  { id: 1, conducteur: "Alice", depart: "Nanterre", arrivee: "La Défense", heure: "08:30", prix: 2,   placesTotal: 3, passagers: ["Karim"] },
  { id: 2, conducteur: "Bob",   depart: "Nanterre", arrivee: "La Défense", heure: "07:45", prix: 1.5, placesTotal: 2, passagers: ["Léa", "Marc"] },
  { id: 3, conducteur: "Chloé", depart: "Rueil",    arrivee: "La Défense", heure: "08:15", prix: 3,   placesTotal: 3, passagers: [] },
  { id: 4, conducteur: "David", depart: "Nanterre", arrivee: "La Défense", heure: "07:50", prix: 2,   placesTotal: 4, passagers: ["Nina"] },
  { id: 5, conducteur: "Emma",  depart: "Nanterre", arrivee: "Rueil",      heure: "09:00", prix: 1.5, placesTotal: 2, passagers: [] },
];

// ------------------------------------------------------------------
// À FAIRE
// ------------------------------------------------------------------
//
// 1. Une interface Trajet qui décrit les objets ci-dessus,
//    et type le tableau `trajets` avec.
//
// 2. placesRestantes(trajet: Trajet): number
//    → le nombre de places encore libres.
//
// 3. rechercher(trajets: Trajet[], depart: string, arrivee: string): Trajet[]
//    → les trajets qui font CE départ → CETTE arrivée ET où il reste
//      au moins une place,
//    → triés du moins cher au plus cher ; à prix égal, le départ le
//      plus tôt d'abord,
//    → sans modifier le tableau d'origine (ni son ordre).
//
// 4. reserver(trajets: Trajet[], id: number, passager: string): Trajet[]
//    → retourne une NOUVELLE liste où `passager` a été ajouté aux
//      passagers du trajet `id`,
//    → si l'id n'existe pas :       throw new Error("Trajet introuvable")
//    → s'il ne reste aucune place : throw new Error("Trajet complet")
//    → IMMUTABILITÉ STRICTE : ni `trajets` ni les objets qu'il
//      contient ne doivent être modifiés — les tests le vérifient.
//      (Si tu ne connais pas la syntaxe `...` (spread), cherche-la :
//      c'est LA syntaxe de l'immutabilité, indispensable en React.)

// TON CODE ICI

// ------------------------------------------------------------------
// TESTS (fournis — ne pas modifier)
// ------------------------------------------------------------------

for (const t of trajets) console.log(t.id, placesRestantes(t));
// attendu : 1 2 / 2 0 / 3 3 / 4 3 / 5 2

console.log(rechercher(trajets, "Nanterre", "La Défense").map((t) => t.id));
// attendu : [ 4, 1 ]   (le 2 est complet ; à 2 €, le 4 part avant le 1)

console.log(rechercher(trajets, "Paris", "Lyon"));
// attendu : []

console.log(trajets.map((t) => t.id));
// attendu : [ 1, 2, 3, 4, 5 ]   (rechercher n'a pas réordonné l'original)

const apres = reserver(trajets, 3, "Wayl");
console.log(apres.find((t) => t.id === 3)?.passagers);
// attendu : [ 'Wayl' ]

console.log(trajets.find((t) => t.id === 3)?.passagers);
// attendu : []   (l'original n'a PAS bougé)

try {
  reserver(trajets, 2, "Wayl");
} catch (e) {
  console.log(String(e));
}
// attendu : Error: Trajet complet

try {
  reserver(trajets, 99, "Wayl");
} catch (e) {
  console.log(String(e));
}
// attendu : Error: Trajet introuvable
