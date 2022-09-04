import React from 'react'
import { withSSRGuest } from '../utils/withSSRGuest'

const Home = () => {
    return (
        <div></div>
    )
}


export default Home

export const getServerSideProps = withSSRGuest(async (ctx) => {

    return {
        props: {

        }
    }
})