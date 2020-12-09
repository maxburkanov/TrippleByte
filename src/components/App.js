import React, {useState} from "react";

import Title from "./Title"


const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    
  },
}


export default () => {
  const arrOfTitles = ["backlog", "Todo", "in-progress", "done", "archive"]

  const [dragged, setDragged] = useState([])
 
  function update(prop, tit) {
    setDragged([...dragged, {prop: [...prop], [tit]: tit}])
    // console.log(dragged)
  }
  console.log("dragged", dragged)
  return (
    <div style={ styles.root }  >
      {
        arrOfTitles.map(i=>{
          return (
            <Title title={i}  dragged={dragged} update={update} />
          )
        })
      }
    </div>
  )
}