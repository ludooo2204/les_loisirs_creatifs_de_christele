import React, { useEffect, useState } from 'react'
import styles from './Style.module.css'
// import styles from './Style.scss'
import DisplayComments from './components/DisplayComments'
import { ActionProvider } from './components/ActionContext'
import SignField from './components/SignField'
import Input from './components/Input'

export const CommentSection = ({
  commentsArray,
  currentUser,
  setComment,
  signinUrl,
  signupUrl,
  customInput,creationId
}) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])
console.log("currentUser")
console.log("currentUser")
console.log("currentUser")
console.log(currentUser)
  return (
    <ActionProvider
      currentUser={currentUser}
      creationId={creationId}
      setComment={setComment}
      comments={comments}
      signinUrl={signinUrl}
      signupUrl={signupUrl}
      customInput={customInput}
    >
      <div className={styles.section}>
        <div className={styles.inputBox}>
          {signupUrl && !currentUser ? <SignField /> : <Input />}
        </div>
        <div className={styles.displayComments}>
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}
