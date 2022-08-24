import React from 'react'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function clientes() {
  return (
    <div>clientes</div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {



  return {
      props: {

      }
  }

})