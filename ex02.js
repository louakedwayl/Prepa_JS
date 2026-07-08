// Exercice 3 — Statistiques des clients
// ------------------------------------
//
// Données de départ :

const commandes = [
  { client: "Alice", produit: "Pizza", quantite: 2, prix: 12 },
  { client: "Bob", produit: "Burger", quantite: 1, prix: 10 },
  { client: "Alice", produit: "Salade", quantite: 3, prix: 7 },
  { client: "Chloé", produit: "Pizza", quantite: 1, prix: 12 },
  { client: "Bob", produit: "Frites", quantite: 4, prix: 3 },
];

//
// Écris une fonction statistiquesClients(commandes)
// qui retourne un objet avec, pour chaque client :
//
// - le montant total dépensé (quantite × prix)
// - le nombre total d'articles achetés
//
// Les clients doivent être créés automatiquement.
//
// Résultat attendu :
//
// {
//   Alice: { total: 45, articles: 5 },
//   Bob: { total: 22, articles: 5 },
//   Chloé: { total: 12, articles: 1 }
// }


function statistiquesClients(commandes)
{
    let retval = {};

    for (let i = 0; i < commandes.length ; i++)
    {
        if (retval[commandes[i].client])
        {
            retval[commandes[i].client].article += commandes[i].quantite;
            retval[commandes[i].client].total += commandes[i].quantite * commandes[i].prix;
        }
        else
        {
            retval[commandes[i].client] = 
            {
                total : commandes[i].quantite * commandes[i].prix,
                article : commandes[i].quantite
            }
        }
    }
    return retval;
}

console.log(statistiquesClients(commandes));