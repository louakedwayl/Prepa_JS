// Exercice 10 — FizzBuzz (échauffement)
// ----------------------------------------------------------
//
// Petit exo classique, sans lien avec le covoiturage : juste pour
// voir des types plus fins (union de littéraux en sortie) et un
// enchaînement de conditions propre.
//
//   Vérifier :  npx tsc        (silencieux = OK)
//   Exécuter :  node ex10.ts   (compare avec les valeurs attendues)
//
// ------------------------------------------------------------------
// À FAIRE
// ------------------------------------------------------------------
//
// 1. fizzBuzz(n: number): (string | number)[]
//    → retourne un tableau des valeurs de 1 à n inclus, où chaque
//      élément est :
//        - "FizzBuzz" si multiple de 3 ET de 5,
//        - "Fizz"     si multiple de 3 (mais pas de 5),
//        - "Buzz"     si multiple de 5 (mais pas de 3),
//        - le nombre lui-même sinon.
//    → si n <= 0 : throw new Error("n doit être positif")
//    → n n'est pas forcément entier : si n n'est pas un entier,
//      throw new Error("n doit être un entier")
//
// 2. compteFizzBuzz(n: number): Record<"Fizz" | "Buzz" | "FizzBuzz" | "Autre", number>
//    → sur le résultat de fizzBuzz(n), compte combien de valeurs
//      tombent dans chacune des 4 catégories ("Autre" = un nombre
//      brut, ni Fizz ni Buzz ni FizzBuzz).
//
// TON CODE ICI

// ------------------------------------------------------------------
// TESTS (fournis — ne pas modifier)
// ------------------------------------------------------------------

console.log(fizzBuzz(15));
// attendu :
// [
//   1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz',
//   11, 'Fizz', 13, 14, 'FizzBuzz'
// ]

console.log(fizzBuzz(1));
// attendu : [ 1 ]

try {
  fizzBuzz(0);
} catch (e) {
  console.log(String(e));
}
// attendu : Error: n doit être positif

try {
  fizzBuzz(-5);
} catch (e) {
  console.log(String(e));
}
// attendu : Error: n doit être positif

try {
  fizzBuzz(3.5);
} catch (e) {
  console.log(String(e));
}
// attendu : Error: n doit être un entier

console.log(compteFizzBuzz(15));
// attendu : { Fizz: 3, Buzz: 2, FizzBuzz: 1, Autre: 9 }

console.log(compteFizzBuzz(1));
// attendu : { Fizz: 0, Buzz: 0, FizzBuzz: 0, Autre: 1 }
