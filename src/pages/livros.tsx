import React from 'react'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function livros() {
  return (
    <div>livros</div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {



  return {
      props: {

      }
  }

})