import React from 'react'
import { Can } from '../components/Can'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function emprestimos() {
  return (
    <Can permissions={[]} role={'MANAGER'}>
      <div>emprestimos</div>
    </Can>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }

})