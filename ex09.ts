// Exercice 9 — Porte-monnaie de fin de mois (RÉVISION)
// ----------------------------------------------------------
//
// Rien de nouveau ici : tout a déjà été vu entre l'ex00 et l'ex08.
// Mêmes acquis, logique neuve : interface, union de littéraux,
// Record, agrégation, tri avec égalité, immutabilité, async/await
// + Promise.all.
//
//   Vérifier :  npx tsc        (silencieux = OK)
//   Exécuter :  node ex09.ts   (compare avec les valeurs attendues)
//
// Au premier npx tsc : des « Cannot find name ... », normal — les
// fausses API et les tests utilisent des types et des fonctions que
// tu n'as pas encore écrits. Google autorisé, comme en vrai.
//
// Contexte : sur une appli de covoiturage domicile-travail, chacun
// est tantôt conducteur, tantôt passager. À la fin du mois, la
// plateforme calcule le porte-monnaie de chaque membre :
//
//   Trajet TERMINÉ : le conducteur ENCAISSE prix × (nb de passagers),
//                    chaque passager PAIE prix.
//   Trajet ANNULÉ  : aucun mouvement d'argent pour personne.
//
// ------------------------------------------------------------------
// DONNÉES
// ------------------------------------------------------------------

interface Trajet {
  id : number;
  conducteur: string;
  depart : string;
  arrivee : string;
  date : string;
  prix : number;
  passagers : string[];
  statut : "termine" | "annule"
}

const trajets : Trajet [] = [
  { id: 1,  conducteur: "Bob",   depart: "Rueil",      arrivee: "La Défense", date: "2026-06-01", prix: 2,   passagers: [],                  statut: "termine" },
  { id: 2,  conducteur: "Alice", depart: "Nanterre",   arrivee: "La Défense", date: "2026-06-02", prix: 2,   passagers: ["Bob"],             statut: "termine" },
  { id: 3,  conducteur: "Alice", depart: "La Défense", arrivee: "Nanterre",   date: "2026-06-02", prix: 2,   passagers: ["Chloé"],           statut: "termine" },
  { id: 4,  conducteur: "Chloé", depart: "Suresnes",   arrivee: "La Défense", date: "2026-06-04", prix: 2,   passagers: ["David"],           statut: "termine" },
  { id: 5,  conducteur: "Emma",  depart: "Nanterre",   arrivee: "Rueil",      date: "2026-06-08", prix: 3,   passagers: ["Bob"],             statut: "annule" },
  { id: 6,  conducteur: "Alice", depart: "Puteaux",    arrivee: "Nanterre",   date: "2026-06-10", prix: 2.5, passagers: ["Gaëlle", "David"], statut: "termine" },
  { id: 7,  conducteur: "Alice", depart: "Nanterre",   arrivee: "La Défense", date: "2026-06-15", prix: 1.5, passagers: ["Bob", "Farid"],    statut: "termine" },
  { id: 8,  conducteur: "Alice", depart: "La Défense", arrivee: "Nanterre",   date: "2026-06-18", prix: 1,   passagers: ["Farid"],           statut: "termine" },
  { id: 9,  conducteur: "Chloé", depart: "Suresnes",   arrivee: "La Défense", date: "2026-06-23", prix: 2.5, passagers: ["Emma"],            statut: "annule" },
  { id: 10, conducteur: "Bob",   depart: "Rueil",      arrivee: "La Défense", date: "2026-06-29", prix: 2,   passagers: ["Alice"],           statut: "termine" },
];

function soldes(trajets: Trajet[]): Record<string, number>
{
  const porteMonnaie : Record<string, number> = {};

  for (let t of trajets)
  {
    let target = porteMonnaie[t.conducteur];

    if (target !== undefined)
    {
      if (t.statut === "termine")
      {
        target += t.prix * t.passagers.length;
        porteMonnaie[t.conducteur] = target;
      }
    }
    else
    {
      if (t.statut === "termine")
      {
        target = t.prix * t.passagers.length;
        porteMonnaie[t.conducteur] = target;
      }
    }
  }
  
  for (let t of trajets )
  {
    for (let i = 0 ; i < t.passagers.length; i++)
    {
      let target = t.passagers[i];

      if (target !== undefined)
      {
        let porteTarget = porteMonnaie[target]

        if (target !== undefined && porteTarget !== undefined && porteMonnaie[target] !== undefined)
        {
          if (t.statut === "termine")
          {
          porteMonnaie[target] -= t.prix;
          }
        }
        else
        {
          if (t.statut === "termine")
          {
            porteMonnaie[target] = 0 - t.prix;
          }
          if (t.statut === "annule")
          {
            porteMonnaie[target] = 0;
          }
        }
      }
    }
  }
  return porteMonnaie;
}

function retirerPassager(trajets: Trajet[], id: number, nom: string): Trajet[]
{
  let retval = structuredClone(trajets);

  let targetTrajet = retval.find((element) => element.id === id)
  if (targetTrajet)
  {
    let targetPassager = targetTrajet.passagers.find((element) => element === nom)
    if (!targetPassager)
      throw new Error("Passager introuvable");  
    targetTrajet.passagers = targetTrajet.passagers.filter((element) =>  element != nom);
 }
  else
  {
    throw new Error("Trajet introuvable");
  }
  return retval;
}

// 5. Une interface Releve { nom: string; mois: string; solde: number;
//    crediteur: boolean } et la fonction ASYNCHRONE :
//
//      soldeFinal(nom: string, mois: string): Promise<Releve | null>
//
//    → récupère EN PARALLÈLE (pas l'un après l'autre) le report du
//      mois précédent via apiSoldeInitial(nom) ET les trajets du
//      mois via apiTrajetsMois(mois),
//    → solde = report + mouvement du mois (règles de la question 2 ;
//      si la personne n'apparaît dans aucun trajet du mois, son
//      mouvement vaut 0),
//    → crediteur = true si solde ≥ 0,
//    → si une des deux API rejette, retourne null (sans rien
//      laisser planter).

interface Releve { nom: string; mois: string; solde: number; crediteur: boolean }

async function soldeFinal(nom: string , mois: string):  Promise<Releve | null> {
  
  try {
    
    const [reportMois, trajetsMois] = await Promise.all(
      [apiSoldeInitial(nom), apiTrajetsMois(mois)]
    ) 
    const releve = { nom : nom , mois :  mois, solde : reportMois, crediteur : false};
    console.log("\n\n-1-")
    const tmp = soldes(trajetsMois);
    for (let e in tmp)
    {
      if (e === nom)
      {
        if (tmp[e] != undefined)
        {
          releve.solde += tmp[e];
          if (releve.solde >= 0)
          {
              releve.crediteur = true;
          }
          else
            releve.crediteur = false;
        }
      }
    }
    console.log("\n\n--1")

    return releve;
 
  }
  catch(error)
  {
    return null;
  }

}

(async () =>
{
  const test = await soldeFinal("Bob", "2026-06");
  console.log("\n\n--")
  console.log(test);
  console.log("--\n\n")

})()




function debiteurs(trajets: Trajet[]): string[]
{
  let tmp = Object.entries(soldes(trajets));
  
  tmp.sort((a , b) => {
    if (a[1] != b[1])
      return a[1] - b[1]
    else 
      return a[0].localeCompare(b[0])
  })
  tmp = tmp.filter((e) => 
    e[1] < 0);
  let retval = tmp.map((e) => {return e[0]})
  return retval;
}

debiteurs(trajets);

const soldesInitiaux: Record<string, number> = {
  Alice: 3,
  Bob: -1,
  "Chloé": -2,
  David: 1,
  Emma: 4,
  Farid: 0,
  "Gaëlle": 2.5,
  Hugo: -3,
};

const historiqueParMois: Record<string, Trajet[]> = {
  "2026-06": trajets,
};

function apiSoldeInitial(nom: string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const solde = soldesInitiaux[nom];
      if (solde !== undefined) resolve(solde);
      else reject(new Error(`Personne ${nom} inconnue`));
    }, 100);
  });
}

function apiTrajetsMois(mois: string): Promise<Trajet[]> {
  return new Promise<Trajet[]>((resolve, reject) => {
    setTimeout(() => {
      const t = historiqueParMois[mois];
      if (t) resolve(t);
      else reject(new Error(`Mois ${mois} inconnu`));
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
// 2. soldes(trajets: Trajet[]): Record<string, number>
//    → le porte-monnaie de chaque personne rencontrée dans les
//      données (conducteur OU passager), après application des
//      règles du contexte à tous les trajets,
//    → toute personne présente dans les données apparaît dans le
//      résultat, même si elle n'apparaît que dans des trajets
//      annulés (solde 0).
//
// 3. debiteurs(trajets: Trajet[]): string[]
//    → les noms des personnes au solde STRICTEMENT négatif, triés
//      du solde le plus bas au plus haut ; à égalité de solde,
//      ordre alphabétique.
//
// 4. retirerPassager(trajets: Trajet[], id: number, nom: string): Trajet[]
//    → retourne une NOUVELLE liste où `nom` ne figure plus parmi
//      les passagers du trajet `id`,
//    → si l'id n'existe pas :          throw new Error("Trajet introuvable")
//    → si `nom` n'y est pas passager : throw new Error("Passager introuvable")
//    → IMMUTABILITÉ STRICTE : ni `trajets`, ni ses objets, ni leurs
//      tableaux `passagers` ne bougent — les tests le vérifient.
//
// 5. Une interface Releve { nom: string; mois: string; solde: number;
//    crediteur: boolean } et la fonction ASYNCHRONE :
//
//      soldeFinal(nom: string, mois: string): Promise<Releve | null>
//
//    → récupère EN PARALLÈLE (pas l'un après l'autre) le report du
//      mois précédent via apiSoldeInitial(nom) ET les trajets du
//      mois via apiTrajetsMois(mois),
//    → solde = report + mouvement du mois (règles de la question 2 ;
//      si la personne n'apparaît dans aucun trajet du mois, son
//      mouvement vaut 0),
//    → crediteur = true si solde ≥ 0,
//    → si une des deux API rejette, retourne null (sans rien
//      laisser planter).

// TON CODE ICI

// ------------------------------------------------------------------
// TESTS (fournis — ne pas modifier)
// ------------------------------------------------------------------

console.log(soldes(trajets));
// attendu :
// {
//   Bob: -1.5,
//   Alice: 11,
//   'Chloé': 0,
//   David: -4.5,
//   Emma: 0,
//   'Gaëlle': -2.5,
//   Farid: -2.5
// }
// (si tes clés sortent dans un autre ordre, pas grave : ce sont les
//  couples nom → solde qui comptent. Emma n'a que des trajets annulés
//  mais doit apparaître ; Bob a conduit à vide le 1er — ça ne
//  rapporte rien ; Chloé a encaissé 2 et payé 2.)

console.log(debiteurs(trajets));
// attendu : [ 'David', 'Farid', 'Gaëlle', 'Bob' ]
// (Chloé et Emma sont à 0 → pas débitrices ; Farid et Gaëlle à
//  égalité → ordre alphabétique)

const apres = retirerPassager(trajets, 6, "David");
console.log(apres.find((t) => t.id === 6)?.passagers);
// attendu : [ 'Gaëlle' ]

console.log(trajets.find((t) => t.id === 6)?.passagers);
// attendu : [ 'Gaëlle', 'David' ]   (l'original n'a PAS bougé)

console.log(apres.length, trajets.length);
// attendu : 10 10   (retirer un passager ne supprime pas le trajet)

try {
  retirerPassager(trajets, 99, "Bob");
} catch (e) {
  console.log(String(e));
}
// attendu : Error: Trajet introuvable

try {
  retirerPassager(trajets, 3, "Bob");
} catch (e) {
  console.log(String(e));
}
// attendu : Error: Passager introuvable   (Bob n'est pas dans le trajet 3)

// (async () => {
//   console.log(await soldeFinal("Alice", "2026-06"));
//   // attendu : { nom: 'Alice', mois: '2026-06', solde: 14, crediteur: true }
//   // (3 de report + 11 sur juin)

//   console.log(await soldeFinal("Gaëlle", "2026-06"));
//   // attendu : { nom: 'Gaëlle', mois: '2026-06', solde: 0, crediteur: true }
//   // (2.5 de report − 2.5 sur juin : tout juste à flot)

//   console.log(await soldeFinal("Hugo", "2026-06"));
//   // attendu : { nom: 'Hugo', mois: '2026-06', solde: -3, crediteur: false }
//   // (aucun trajet en juin : juste son report)

//   console.log(await soldeFinal("Alice", "2026-02"));
//   // attendu : null

//   console.log(await soldeFinal("Zoé", "2026-06"));
//   // attendu : null
// })();
