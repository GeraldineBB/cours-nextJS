import React from 'react'
import Navbar from '../Navbar/Navbar'

// on oublie pas les props pour que notre container ait accès aux autres composants
// sinon on aurait que la navigation
export default function Container(props) {
  return (
    <>
    <Navbar/>
    {props.children}
    </>
  )
}
