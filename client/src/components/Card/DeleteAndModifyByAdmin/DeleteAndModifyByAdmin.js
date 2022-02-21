import React from "react";
import styles from "./DeleteAndModifyByAdmin.module.css";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
const DeleteAndModifyByAdmin = ({id,refresh,modifierCreation}) => {

    const handleDelete=()=>{
        axios.delete('/api/creations/'+id)
        .then(e=>console.log(e))
        .then(refresh())
    }
    const handleModify=()=>{
        axios.patch('/products/'+id)
        .then(e=>console.log(e))
        .then(refresh())
    }
	return <div className={styles.adminButtons}>
    <HighlightOffIcon className={styles.icons} onClick={handleDelete} />
    <EditIcon className={styles.icons} onClick={modifierCreation} />

    </div>;
};

export default DeleteAndModifyByAdmin;
