import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Head from 'next/head';

// on récupère les props qui sont envoyées depuis la fonction getStaticProps + bas
export default function Home(props) {

  console.log(props);

  const id = "article";

  // plus bas, dans le map on utilse les () et pas les {} dans la fonction fléchée 
  // si on met les {} il faut écrire ensuite return()
  return (
    <>
      <Head>
        <title className={styles.titre}>Titre</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titre}>Vocabulaire de base</h1>
        <table className={styles.tableau}>
          <tbody>
            {props.array.map(el => (
              <tr key={el.en}>
                <td>{el.en}</td>
                <td>{el.fr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export async function getStaticProps() {

  // js > on peut faire de l'aync, on attend d'avoir les données avant de faire quoi que ce soit
  const data = await import(`/data/vocabulary.json`);
  const array = data.vocabulary;

  if(array.length === 0) {
    return {
      notFound: true
    }
  }


  if(array.length === 0) {
    return {
      redirect: {
        destination: "/isr"
      }
    }
  }

  // ensuite on envoie les données
  return {
    props: {
      array
    }
  }

}