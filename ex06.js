"use strict";
// Exercice 6 —  recettes typées
// ------------------------------------------------------
//
// La logique, tu la connais déjà (c'est ton ex02). La nouveauté,
// c'est le TYPAGE. Ici le compilateur est ton correcteur :
//
//   Vérifier les types :  npx tsc
//   Exécuter :            node ex06.ts
//
// npx tsc ne doit rien afficher (= aucune erreur de type).
//
// ------------------------------------------------------------------
// PARTIE 1 — Décris les données
// ------------------------------------------------------------------
//
// Écris une interface Reservation qui décrit les objets ci-dessous.
// Contrainte : le champ `statut` ne peut valoir QUE "confirmee"
// ou "annulee" — pas n'importe quelle string. (Cherche : "union de
// littéraux" / literal union type.)
//
// Puis type le tableau `reservations` avec ton interface.
Object.defineProperty(exports, "__esModule", { value: true });
const reservations = [
    { trajet: "Paris-Lyon", conducteur: "Alice", passagers: 2, prixPlace: 15, statut: "confirmee" },
    { trajet: "Paris-Lille", conducteur: "Bob", passagers: 3, prixPlace: 10, statut: "confirmee" },
    { trajet: "Lyon-Marseille", conducteur: "Alice", passagers: 1, prixPlace: 20, statut: "annulee" },
    { trajet: "Paris-Rennes", conducteur: "Chloé", passagers: 2, prixPlace: 12, statut: "confirmee" },
    { trajet: "Lille-Bruxelles", conducteur: "Bob", passagers: 2, prixPlace: 8, statut: "annulee" },
];
// ------------------------------------------------------------------
// PARTIE 2 — La fonction
// ------------------------------------------------------------------
//
// Écris recettesParConducteur avec cette signature EXACTE :
//
//   function recettesParConducteur(reservations: Reservation[]): Record<string, number>
//
// Elle retourne le total gagné par conducteur (passagers × prixPlace),
// en IGNORANT les réservations annulées.
//
// (Record<string, number> = un objet dont les clés sont des strings
// et les valeurs des numbers. Cherche ce que c'est si besoin.)
//
// Résultat attendu :
//
//   { Alice: 30, Bob: 30, Chloé: 24 }
//
// Contrainte de style : pas de boucle for indexée. Utilise
// for...of ou reduce.
// TON CODE ICI
function recettesParConducteur(reservations) {
    let retval = {};
    for (let element of reservations) {
        if (element.statut == "annulee")
            continue;
        if (retval[element.conducteur]) {
            retval[element.conducteur] = (retval[element.conducteur] ?? 0) + element.passagers * element.prixPlace;
        }
        else {
            retval[element.conducteur] = element.passagers * element.prixPlace;
        }
    }
    return retval;
}
console.log(recettesParConducteur(reservations));
// ------------------------------------------------------------------
// PARTIE 3 — Vois ce que le typage t'apporte
// ------------------------------------------------------------------
//
// Quand tout compile et que le résultat est bon, décommente les
// lignes ci-dessous UNE PAR UNE et lance `npx tsc` à chaque fois.
// Lis bien chaque message d'erreur : c'est exactement le genre de
// bug (comme ton article/articles d'ex03) que TS attrape à ta place.
reservations.push({ trajet: "Nice-Toulon", conducteur: "David", passagers: 2, prixPlace: 9, statut: "confirmee" });
const r = recettesParConducteur(reservations);
if (r.Alice)
    console.log(r.Alice);
if (reservations[0])
    console.log(reservations[0].passagers);
//# sourceMappingURL=ex06.js.map