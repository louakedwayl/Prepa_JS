// Exercice 5 — Récapitulatif de trajet (asynchrone)
// -------------------------------------------------
//
// Contexte : tu disposes de deux "fausses API" (elles simulent un
// appel réseau avec un délai). NE LES MODIFIE PAS.
//
// getTrajet(id)      → résout avec le trajet, ou rejette si l'id n'existe pas
// getPassagers(id)   → résout avec la liste des passagers du trajet
//
// Écris une fonction ASYNCHRONE recapTrajet(id) qui :
//
// 1. Récupère le trajet ET ses passagers (les deux appels ne dépendent
//    pas l'un de l'autre : lance-les EN PARALLÈLE, pas l'un après l'autre)
//
// 2. Retourne un objet de la forme :
//    {
//      conducteur: "Alice",
//      depart: "Paris",
//      arrivee: "Lyon",
//      nbPassagers: 2,
//      recette: 30            // nombre de passagers × prix de la place
//    }
//
// 3. Si le trajet n'existe pas, la fonction doit retourner null
//    (et ne PAS faire planter le programme)
//
// Résultat attendu :
//
// await recapTrajet(1)  →  { conducteur: "Alice", depart: "Paris",
//                            arrivee: "Lyon", nbPassagers: 2, recette: 30 }
// await recapTrajet(99) →  null
//
// ------------------------------------------------------------------
// FAUSSES API — NE PAS MODIFIER
// ------------------------------------------------------------------

const trajets = [
  { id: 1, conducteur: "Alice", depart: "Paris", arrivee: "Lyon", prixPlace: 15 },
  { id: 2, conducteur: "Bob", depart: "Lille", arrivee: "Bruxelles", prixPlace: 8 },
];

const passagers = {
  1: ["Chloé", "David"],
  2: ["Emma", "Farid", "Gaël"],
};

function getTrajet(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const trajet = trajets.find((t) => t.id === id);
      if (trajet) resolve(trajet);
      else reject(new Error(`Trajet ${id} introuvable`));
    }, 100);
  });
}

function getPassagers(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(passagers[id] ?? []);
    }, 100);
  });
}

// ------------------------------------------------------------------
// TON CODE ICI
// ------------------------------------------------------------------


async function recapTrajet(id)
{
  try 
  {
      const passagers = getPassagers(id);
      const trajets = getTrajet(id);

      const p = await passagers;
      const t = await trajets;

      const retval=  
        {
          conducteur : t.conducteur,
          depart : t.depart,
          arrivee : t.arrivee,
          nbPassagers : p.length,
          recette : p.length * t.prixPlace
        };


      return retval;
  }
  catch (all)
  {
    return null;
  }
}

recapTrajet(3).then(console.log);


// Tests (décommente quand tu es prêt) :
// recapTrajet(1).then(console.log);   // → l'objet attendu
// recapTrajet(99).then(console.log);  // → null
