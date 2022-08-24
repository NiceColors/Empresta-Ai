import React from 'react'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function emprestimos() {
  return (
    <div>emprestimos</div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {



  return {
      props: {

      }
  }

})