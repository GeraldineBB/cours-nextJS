import React from 'react';
import styles from '../../styles/Home.module.css'
import { useRouter } from "next/router"; 


// je ne connais pas d'avance le nombre de chemins à créer 
// je dois utiliser getStaticProps et getStaticPaths pour faire des chemins dynamiques

export default function liste(props) {
console.log(props); 

const router = useRouter();

  return (

    <div className="container">
    <h1 className={styles.titre}>{router.query.liste.charAt(0).toUpperCase()+ router.query.liste.slice(1)}</h1>
    <table className={styles.tableau}>
      <tbody>
        {props.listeEnCours.map(el => (
          <tr key={el.en}>
            <td>{el.en}</td>
            <td>{el.fr}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

// on envoie les props pour donner des données à cette url listes/words
// context seulement utilisable quand on utilise getStaticPaths, ça sert à retrouver "words" et à avoir la bonne liste de données correspondantes pour words
// en gros context permet d'avoir le nom de la page et faire appel à la bdd pour présenter les info de la page correspondante

export async function getStaticProps (context) {


    // liste correspond au chemin dynamique
    const slug = context.params.liste; // words, verbs ...

    // pour débugger je fais console.log que je vois uniquement dans le terminal!!
    console.log('slug', slug); 

    // on simule l'appel à la bdd
    const data = await import ('/data/listes.json');

    // en fonction du slug on veut afficher les bonnes données
    const listeEnCours = data.englishList.find(list => list.name === slug)

    // on envoie l'objet avec les bonnes données
    return {
        props: {
            listeEnCours: listeEnCours.data
        }
    }

}


// getStaticPaths donne à next le nombre de chemin à créer
export async function getStaticPaths() {

    const data = await import ('/data/listes.json');

    // on retourne un objet avec une propriété path. cette propriété est un tableau et dans ce tableau, on envoie un objet avec la propriété params qui a pour valeur un objet
    // dans params on envoie tout le temps un objet avec une propriété qui a pour nom notre mot dynamique (ici: [liste])
    // on est ensuite obligé de mettre le fallback à false pour permettre d'avoir une page erreur 404
    // si fallback = true, utile si site avec bcp de pages, on peut créer de manière statique que certaines pages (celles avec le plus de vues par ex), la page sera crée si appel au serveur 

    // pour chaque objet du tableau je veux récupérer le slug (propriété name) pour la fournir à params
    const paths = data.englishList.map(item => (
        {
            params: {liste: item.name}
        }
    ))

    return {

        // ici le liste/words sera une page statique
        // liste correspond au chemin dynamique
    
        // paths: [
        //     {params: {liste: "words"}}
        // ],
        paths, 
        fallback: false, 

    }


}
