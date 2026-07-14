// Exercice 8 — Bilan hebdo covoiturage (RÉVISION GÉNÉRALE)
// ----------------------------------------------------------
//
// Rien de nouveau ici : tout a déjà été vu entre l'ex00 et l'ex07.
// Test blanc de consolidation : interfaces, unions de littéraux,
// Record, agrégation, tri, immutabilité, async/await + Promise.all.
//
//   Vérifier :  npx tsc        (silencieux = OK)
//   Exécuter :  node ex08.ts   (compare avec les valeurs attendues)
//
// Au premier npx tsc : des « Cannot find name ... », normal — les
// fausses API et les tests utilisent des types et des fonctions que
// tu n'as pas encore écrits. Google autorisé, comme en vrai.
//
// Contexte : tableau de bord hebdomadaire d'une communauté de
// covoiturage domicile-travail. La métrique clé : les « km
// covoiturés » = km du trajet × nombre de passagers transportés
// (les kilomètres de voiture-solo évités cette semaine-là).
//
// ------------------------------------------------------------------
// DONNÉES
// ------------------------------------------------------------------

interface Trajet {
  id : number;
  conducteur : string;
  depart : string;
  arrivee : string;
  date : string;
  km : number;
  prix : number;
  passagers : string[];
  statut : "annule" | "termine";
}

const trajets : Trajet[] = [
  { id: 1,  conducteur: "Alice", depart: "Nanterre",   arrivee: "La Défense", date: "2026-07-06", km: 6, prix: 2,   passagers: ["Karim", "Léa"],         statut: "termine" },
  { id: 2,  conducteur: "Bob",   depart: "Rueil",      arrivee: "La Défense", date: "2026-07-06", km: 8, prix: 2.5, passagers: ["Marc"],                 statut: "termine" },
  { id: 3,  conducteur: "Alice", depart: "La Défense", arrivee: "Nanterre",   date: "2026-07-06", km: 6, prix: 2,   passagers: ["Karim"],                statut: "termine" },
  { id: 4,  conducteur: "Chloé", depart: "Suresnes",   arrivee: "La Défense", date: "2026-07-07", km: 5, prix: 1.5, passagers: ["Nina", "Omar", "Paul"], statut: "termine" },
  { id: 5,  conducteur: "Bob",   depart: "Rueil",      arrivee: "La Défense", date: "2026-07-07", km: 8, prix: 2.5, passagers: ["Marc", "Léa"],          statut: "annule" },
  { id: 6,  conducteur: "Alice", depart: "Nanterre",   arrivee: "La Défense", date: "2026-07-08", km: 6, prix: 2,   passagers: ["Karim", "Léa"],         statut: "termine" },
  { id: 7,  conducteur: "Emma",  depart: "Nanterre",   arrivee: "Rueil",      date: "2026-07-08", km: 4, prix: 1.5, passagers: ["Sam"],                  statut: "annule" },
  { id: 8,  conducteur: "Chloé", depart: "La Défense", arrivee: "Suresnes",   date: "2026-07-09", km: 5, prix: 1.5, passagers: ["Nina"],                 statut: "annule" },
  { id: 9,  conducteur: "Bob",   depart: "Rueil",      arrivee: "La Défense", date: "2026-07-10", km: 8, prix: 2.5, passagers: ["Marc", "Léa"],          statut: "termine" },
  { id: 10, conducteur: "David", depart: "Puteaux",    arrivee: "Nanterre",   date: "2026-07-10", km: 9, prix: 3,   passagers: [],                       statut: "termine" },
];

interface Bilan {
  kmCovoitures: number;
  annulations: number;
}

function ft_kmCovoitures(trajet :Trajet) : number
{
  if (trajet.statut === "annule")
    return 0;
  
  return trajet.km * trajet.passagers.length;
}

function ft_annulation(trajet : Trajet) : number
{
  if (trajet.statut === "annule")
    return 1;
  else
    return 0;
}

function bilanParConducteur(trajets: Trajet[]): Record<string, Bilan>
{
  const retval: Record<string, Bilan> = {};

  for (let element of trajets)
  {
    let bilan = retval[element.conducteur];

    if (bilan)
    {
      bilan.kmCovoitures += ft_kmCovoitures(element);
      bilan.annulations += ft_annulation(element);
    }
    else
    {
      retval[element.conducteur] = { kmCovoitures : ft_kmCovoitures(element), annulations : ft_annulation(element)}
    }
  }
  return retval;
}

function classementConducteurs(trajets: Trajet[]): string[]
{
  let tmp = Object.entries(bilanParConducteur(trajets));
  tmp.sort((a, b ) => {
    if (a[1].kmCovoitures === b[1].kmCovoitures)
    {
      return a[0].localeCompare(b[0]);
    }
    else
    {
      return b[1].kmCovoitures - a[1].kmCovoitures
    }
  })
  let retval : string [] = tmp.map((element) => element[0])
  return retval;
}

function annulerTrajet(trajets: Trajet[], id: number): Trajet[]
{
  const target = trajets.find((element) => element.id === id);
  if (!target)
    throw new Error("Trajet introuvable");
  if (target.statut === "annule")
    throw new Error ("Trajet déjà annulé");
  return trajets.map((element) => 
    {
      if (id === element.id)
        return {...element, statut : "annule"}
      else
        return {...element}
    })
}

interface Rapport { semaine: string; kmCovoitures: number; objectifAtteint: boolean}

async function rapportHebdo(semaine: string): Promise<Rapport | null>
{
  try
  {
      const [trajet, objectif] = await Promise.all (
    [
      apiTrajets(semaine),
      apiObjectifKm(semaine)
    ])
  
  let kmCovoituresTotal = 0;

  for (let element of trajet)
  {
    kmCovoituresTotal += ft_kmCovoitures(element);
  }

  let objectifA : boolean ;

  if (kmCovoituresTotal >= objectif)
    objectifA = true;
  else
    objectifA = false;

  const rapport : Rapport = { semaine : semaine , kmCovoitures : kmCovoituresTotal, objectifAtteint: objectifA};
    return rapport;
  }
  catch(e)
  {
    return null;
  }

    
}

async function test () {
  console.log(await apiTrajets("2026-S28"));
}

test();

 // 5. Une interface Rapport { semaine: string; kmCovoitures: number;
//    objectifAtteint: boolean } et la fonction ASYNCHRONE :
//
//      rapportHebdo(semaine: string): Promise<Rapport | null>
//
//    (Promise<X> = type de retour d'une fonction async qui, une fois
//    await-ée, donne un X.)
//
//    → récupère les trajets ET l'objectif de la semaine via les deux
//      fausses API, EN PARALLÈLE (pas l'un après l'autre),
//    → kmCovoitures = total des km covoiturés de la semaine (mêmes
//      règles qu'à la question 2),
//    → objectifAtteint = true si kmCovoitures ≥ objectif,
//    → si une des deux API rejette, retourne null (sans rien laisser
//      planter).


// ------------------------------------------------------------------
// FAUSSES API — NE PAS MODIFIER
// ------------------------------------------------------------------
// Elles simulent le backend (délai réseau). Utilisées à la question 5.

const historiqueParSemaine: Record<string, Trajet[]> = {
  "2026-S28": trajets,
};

const objectifsKm: Record<string, number> = {
  "2026-S28": 60,
};

function apiTrajets(semaine: string): Promise<Trajet[]> {
  return new Promise<Trajet[]>((resolve, reject) => {
    setTimeout(() => {
      const t = historiqueParSemaine[semaine];
      if (t) resolve(t);
      else reject(new Error(`Semaine ${semaine} inconnue`));
    }, 100);
  });
}

function apiObjectifKm(semaine: string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const objectif = objectifsKm[semaine];
      if (objectif !== undefined) resolve(objectif);
      else reject(new Error(`Semaine ${semaine} inconnue`));
    }, 100);
  });
}

// ------------------------------------------------------------------
// À FAIRE
// ------------------------------------------------------------------
//
// 1. Une interface Trajet qui décrit les objets ci-dessus, et type
//    le tableau `trajets` avec. Contrainte : `statut` ne peut valoir
//    QUE "termine" ou "annule" — pas n'importe quelle string.
//
// 2. Une interface Bilan { kmCovoitures: number; annulations: number }
//    et la fonction :
//
//      bilanParConducteur(trajets: Trajet[]): Record<string, Bilan>
//
//    → pour chaque conducteur :
//        kmCovoitures = somme des (km × nombre de passagers) de ses
//                       trajets TERMINÉS,
//        annulations  = nombre de ses trajets ANNULÉS.
//    → tout conducteur présent dans les données apparaît dans le
//      résultat, même s'il n'a que des trajets annulés.
//
// 3. classementConducteurs(trajets: Trajet[]): string[]
//    → les noms des conducteurs, triés du plus grand kmCovoitures
//      au plus petit ; à égalité, ordre alphabétique.
//
// 4. annulerTrajet(trajets: Trajet[], id: number): Trajet[]
//    → retourne une NOUVELLE liste où le trajet `id` passe au statut
//      "annule",
//    → si l'id n'existe pas :   throw new Error("Trajet introuvable")
//    → s'il est déjà annulé :   throw new Error("Trajet déjà annulé")
//    → IMMUTABILITÉ STRICTE : ni `trajets` ni ses objets ne bougent —
//      les tests le vérifient.
//      (Rappel ex07 : structuredClone marche ; la version spread d'un
//      objet — { ...t, champ: nouvelleValeur } — mérite d'être connue
//      aussi, c'est celle qu'on écrit en React.)
//
// 5. Une interface Rapport { semaine: string; kmCovoitures: number;
//    objectifAtteint: boolean } et la fonction ASYNCHRONE :
//
//      rapportHebdo(semaine: string): Promise<Rapport | null>
//
//    (Promise<X> = type de retour d'une fonction async qui, une fois
//    await-ée, donne un X.)
//
//    → récupère les trajets ET l'objectif de la semaine via les deux
//      fausses API, EN PARALLÈLE (pas l'un après l'autre),
//    → kmCovoitures = total des km covoiturés de la semaine (mêmes
//      règles qu'à la question 2),
//    → objectifAtteint = true si kmCovoitures ≥ objectif,
//    → si une des deux API rejette, retourne null (sans rien laisser
//      planter).

// TON CODE ICI

// ------------------------------------------------------------------
// TESTS (fournis — ne pas modifier)
// ------------------------------------------------------------------

console.log(bilanParConducteur(trajets));
// attendu :
// {
//   Alice: { kmCovoitures: 30, annulations: 0 },
//   Bob: { kmCovoitures: 24, annulations: 1 },
//   'Chloé': { kmCovoitures: 15, annulations: 1 },
//   Emma: { kmCovoitures: 0, annulations: 1 },
//   David: { kmCovoitures: 0, annulations: 0 }
// }

console.log(classementConducteurs(trajets));
// attendu : [ 'Alice', 'Bob', 'Chloé', 'David', 'Emma' ]
// (David et Emma sont à 0 km tous les deux → ordre alphabétique)

const apres = annulerTrajet(trajets, 4);
console.log(apres.find((t) => t.id === 4)?.statut);
// attendu : annule

console.log(trajets.find((t) => t.id === 4)?.statut);
// attendu : termine   (l'original n'a PAS bougé)

console.log(apres.length, trajets.length);
// attendu : 10 10   (annuler n'est pas supprimer)

try {
  annulerTrajet(trajets, 7);
} catch (e) {
  console.log(String(e));
}
// attendu : Error: Trajet déjà annulé

try {
  annulerTrajet(trajets, 99);
} catch (e) {
  console.log(String(e));
}
// attendu : Error: Trajet introuvable

(async () => {
  console.log(await rapportHebdo("2026-S28"));
  // attendu : { semaine: '2026-S28', kmCovoitures: 69, objectifAtteint: true }

  console.log(await rapportHebdo("2026-S99"));
  // attendu : null
})();
