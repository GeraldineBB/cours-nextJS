import React from 'react';
import Link from 'next/link';

// ici c'est avec une première version du fichier listes.json 
export default function listes(props) {

  console.log(props.array);

  // ici on débug
  // on va itérer d'abord sur chaque objet de l'array (objet 1, objet 2..)
  // ensuite au sein de l'objet on a un tableau avec 1 clé (mais on pourrait en avoir plusieurs)
  // on va itérer sur les clés avec Object.keys.map
  props.array.map((englishListObject, index) => (
    Object.keys(englishListObject).map((key, index2) => {
      console.log("-->", key)
      console.log("==>", englishListObject[key])
    }
    )
  ))

  // après un map, si j'utilise () alors le return est implicite, si {} il faut mettre return !!
  // pour chaque li je veux avoir un link (pour l'instant on a une erreur, c'est parce qu'on a pas de path pour '/listes/key' => getStaticPaths)

  return (

    <div className='container'>
      <h1 className='my-4'>Les listes de vocabulaire</h1>
      <ul className="list-group">


        {
          props.array.map((englishListObject, index) => (
            Object.keys(englishListObject).map((key, index2) =>

              <li key={key}>
                <Link href={key}>
                  <a>{key}</a>
                </Link>

              </li>
            )

          ))
        }

      </ul>

      {
        // en dessous on itère sur le contenu du sous tableau pour avoir la sous liste
      }



      {/* <h1>Les listes de vocabulaire</h1>
      {
        props.array.map((englishListObject, index) => (
          Object.keys(englishListObject).map((key, index2) => 
          (
            <li>{key}
              <ul>
                {englishListObject[key].map((elements, index3) => <li>{elements.fr}</li>)}
              </ul>
            </li>
          ))
        ))
      } */}

      {/* <table className={styles.tableau}>
        <tbody>
          {props.array.map(el => (
            <tr key={el.en}>
              <td>{el.en}</td>
              <td>{el.fr}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>


  )
}

export async function getStaticProps() {

  // js > on peut faire de l'aync, on attend d'avoir les données avant de faire quoi que ce soit
  const data = await import(`/data/listes.json`);
  const array = data.englishList;

  // if(array.length === 0) {
  //   return {
  //     notFound: true
  //   }
  // }


  // if(array.length === 0) {
  //   return {
  //     redirect: {
  //       destination: "/isr"
  //     }
  //   }
  // }

  // ensuite on envoie les données
  return {
    props: {
      array
    }
  }

}