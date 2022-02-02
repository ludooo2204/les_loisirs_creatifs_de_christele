import React from 'react'
import styles from "./Main.module.css";
import Card from './Card'

const Creations = ({isAdmin}) => {
    return (
        <div className={styles.main}>
            <Card isAdmin={isAdmin}/>
        </div>
    )
}

export default Creations
