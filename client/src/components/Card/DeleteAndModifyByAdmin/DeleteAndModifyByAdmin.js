import React from "react";
import styles from "./DeleteAndModifyByAdmin.module.css";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
const DeleteAndModifyByAdmin = () => {
	return <div className={styles.adminButtons}>
    <HighlightOffIcon className={styles.icons}  />
    <EditIcon className={styles.icons} />
    </div>;
};

export default DeleteAndModifyByAdmin;
