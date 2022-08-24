import React from 'react'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function usuarios() {
    return (
        <div>usuarios</div>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {



    return {
        props: {

        }
    }

})