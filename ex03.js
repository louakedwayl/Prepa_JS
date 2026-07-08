// Exercice 4 — Analyse des ventes par catégorie
// ---------------------------------------------
//
// Données de départ :



//
// Écris une fonction analyseVentes(ventes)
//
// qui retourne un tableau contenant le chiffre d'affaires
// total de chaque catégorie.
//
// Chiffre d'affaires = quantite × prix
//
// Les catégories doivent être créées automatiquement.
//
// Le tableau final doit être trié du plus grand chiffre
// d'affaires au plus petit.
//
// Résultat attendu :
//
// [
//   { categorie: "informatique", total: 5100 },
//   { categorie: "meuble", total: 600 }
// ]
//

const ventes = [
  { produit: "PC", categorie: "informatique", quantite: 3, prix: 800 },
  { produit: "Souris", categorie: "informatique", quantite: 10, prix: 20 },
  { produit: "Table", categorie: "meuble", quantite: 2, prix: 150 },
  { produit: "Chaise", categorie: "meuble", quantite: 6, prix: 50 },
  { produit: "Téléphone", categorie: "informatique", quantite: 5, prix: 500 },
];

function analyseVentes(ventes)
{
    let tmp = {};

    for(let i = 0 ; i < ventes.length; i++)
    {
        if (tmp[ventes[i].categorie])
        {
            tmp[ventes[i].categorie].total += ventes[i].quantite * ventes[i].prix;
        }
        else
        {
            tmp[ventes[i].categorie] = {total : ventes[i].quantite * ventes[i].prix}
        }
    }
    
    return tmp;
}

console.log(analyseVentes(ventes));