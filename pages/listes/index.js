import React from 'react';
import Link from 'next/link';

// dans cette version on a simplifié le tableau listes en rajoutant dans chaque objet une propriété name

export default function listes(props) {

  console.log(props.array);


  // après un map, si j'utilise () alors le return est implicite, si {} il faut mettre return !!
  // pour chaque li je veux avoir un link (pour l'instant on a une erreur, c'est parce qu'on a pas de path pour '/listes/key' => getStaticPaths)

  return (

    <div className='container'>
      <h1 className='my-4'>Les listes de vocabulaire</h1>
      <ul className="list-group">


        {
          props.array.map((englishListObject, index) => (
           
              <li key={englishListObject.name}>
                <Link href={`listes/${englishListObject.name}`}>
                  <a>{englishListObject.name}</a>
                </Link>

              </li>
            

          ))
        }

      </ul>


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