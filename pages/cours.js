import React from 'react'

// ici tout va être crée côté serveur donc pas besoin de connaitre le nombre de pages statiques à créer ...
// c'est pas que les pages seront déjà prêtes côté serveur
// c'est que les pages vont être crées puis envoyées
// ça permet aux utilisateurs d'être à la source de vérité (ex: prix du bitcoin)

export default function cours(props) {

    console.log(props); 
  return (
    <div>
        <h1>le BTC est à : {props.results.bpi.EUR.rate}</h1>
    </div>
  )
}

export async function getServerSideProps(context){

    console.log(context); // renvoie un objet avec le rendu de notre requête dans le terminal uniquement !

    const data = await fetch ("https://api.coindesk.com/v1/bpi/currentprice.json");

    const results = await data.json();

    return {
        props: {
            results
        }
    }

}

// https://api.coindesk.com/v1/bpi/currentprice.json