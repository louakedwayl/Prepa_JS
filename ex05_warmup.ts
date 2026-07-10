// Échauffement TypeScript — avant l'ex05
// ----------------------------------------
//
// 4 mini-parties, dans l'ordre. Après chaque partie :
//
//   Vérifier les types :  npx tsc ex05_warmup.ts --noEmit
//   Exécuter :            node ex05_warmup.ts
//
// (--noEmit = vérifie sans générer de fichier .js)
//
// Rappel : TS = ton JS habituel + des annotations de type.
// Une annotation s'écrit  `: letype`  après le nom.

// ------------------------------------------------------------------
// PARTIE 1 — Annoter des variables
// ------------------------------------------------------------------
//
// Ajoute une annotation de type à chacune des 3 variables ci-dessous
// (number, string ou boolean — à toi de choisir la bonne).
//
// Exemple :   let age: number = 25;

let ville : string = "Paris";
let habitants : number = 2100000;
let capitale : boolean = true;

// Quand c'est fait, décommente la ligne suivante et lance npx tsc :
// tu dois avoir une ERREUR. Lis-la, comprends-la, puis recommente.

habitants = 2100000;

// ------------------------------------------------------------------
// PARTIE 2 — Annoter une fonction
// ------------------------------------------------------------------
//
// Écris la fonction prixTotal :
//   - elle prend un prix (number) et une quantite (number)
//   - elle retourne prix * quantite (donc un number)
//
// Annote les DEUX paramètres ET le type de retour.

// TON CODE ICI

console.log(prixTotal(15, 2)); // attendu : 30

// Quand ça marche, décommente, lance npx tsc, lis l'erreur, recommente :

// prixTotal(15, "deux");

// ------------------------------------------------------------------
// PARTIE 3 — Décrire un objet avec une interface
// ------------------------------------------------------------------
//
// Écris une interface Trajet qui décrit l'objet ci-dessous
// (3 champs : depart, arrivee, km).
//
// Puis annote la constante :   const monTrajet: Trajet = { ... }

// TON CODE ICI (l'interface)

const monTrajet = { depart: "Paris", arrivee: "Lyon", km: 465 };

// Quand ça compile, décommente, lance npx tsc, lis l'erreur, recommente :

// console.log(monTrajet.kilometres);

// ------------------------------------------------------------------
// PARTIE 4 — Un tableau d'objets + une fonction dessus
// ------------------------------------------------------------------
//
// 1) Annote le tableau ci-dessous avec ton interface : Trajet[]
//
// 2) Écris la fonction kmTotal avec cette signature :
//
//      function kmTotal(trajets: Trajet[]): number
//
//    Elle retourne la somme des km de tous les trajets.
//    Utilise for...of (comme en JS : let total = 0, on accumule, on retourne).

const trajets = [
  { depart: "Paris", arrivee: "Lyon", km: 465 },
  { depart: "Lyon", arrivee: "Marseille", km: 315 },
  { depart: "Marseille", arrivee: "Nice", km: 200 },
];

// TON CODE ICI (la fonction)

console.log(kmTotal(trajets)); // attendu : 980

// ------------------------------------------------------------------
// Fini ? Alors tu as TOUT pour l'ex05 :
//   - Partie 3 + 4  =  l'interface Reservation et le tableau Reservation[]
//   - Partie 2      =  annoter la fonction
// La seule nouveauté de l'ex05, c'est le type de retour Record<string, number> :
// un objet dont tu ne connais pas les clés d'avance ({ Alice: 30, Bob: 30, ... }),
// donc on dit juste "clés = string, valeurs = number".
// ------------------------------------------------------------------
