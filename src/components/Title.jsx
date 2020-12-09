import React, { useState} from "react";


const styles = {
  root: {
    borderRadius: "8px",
    padding: "10px",
    height: "fit-content",
    backgroundColor: "#EBECF0",
    width: "280px",
    margin: "5px"
  },
  single: {
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    margin: "10px",
    padding: "5px",
    boxShadow: "lightgrey 0px 2px 3px 1px"
  },
  button: {
    border: "none",
    padding: "5px",
    backgroundColor:"#EBECF0",
  },
  input: {
    backgroundColor: "white",
    border: "none",
    ':focus': {
      border: 'none'
    }
  } 
}


export default ({title, dragged, update}) => {
  const [tasks, setTasks] = useState([])
  const [singleTask, setSingleTask] = useState("")
  const [addBtn, setAddbtn] = useState(false)
  const allowDrop = (e) => {
    e.preventDefault();
  }

  const [newData, setNewData] = useState([])
 
  const handleKeypress =(e) => {
    if (e.key === "Enter") {
      handleClick(e)
    }
  }

  const handleClick = (e) => {
    if (e.keyCode === 13) {
      console.log("enter")
    }
    setTasks([...tasks, singleTask]);
    setSingleTask("");
    setAddbtn(false)
  }

  const drag = (e) => { 
    e.dataTransfer.setData("Text", e.target.innerText );
    setTimeout(()=>{e.target.style.display = "none"}, 0)
  }

  const drop = (e) => {
    var data = e.dataTransfer.getData("Text");
    setNewData([...newData, data])
    console.log("NEW DATA", newData)  
  }

  const handleMouseEnter =(e) => {
  }

  return (
    <div 
      style={styles.root} 
      className="wrapper" 
      onDragOver={(e)=> allowDrop(e)}
      onDrop={(e)=> drop(e)}
      onMouseEnter={(e)=>{ handleMouseEnter(e) }}
      id={title} 
    >
      <div className="title">
        {title}
      </div>
      <div className="tasks"  >
        <div>{
          newData && newData.map((i,idx)=>{
            return (
              <div
              draggable="true" 
              id={idx} 
              onDragStart={(e)=>drag(e)} 
              style={styles.single} 
              > {i} </div>
            )
          })
        }</div>
        {
        tasks && tasks.map((i,idx) => {
            return (
              <div 
                draggable="true" 
                id={idx} 
                onDragStart={(e)=>drag(e)} 
                style={styles.single} 
              >
                {i}
              </div>
            )
          })
        }
      </div>
      <div>
      {
        !addBtn ? <button style={styles.button} onClick={()=>setAddbtn(true)}>+ add another card</button> : 
        <div>
           <input style={styles.input} type="textarea" autoFocus value={singleTask} onChange={(e)=>{setSingleTask(e.target.value)}} onKeyPress={handleKeypress} />
           <button 
            onClick={ handleClick } 
           >
             Add</button>
           <button onClick={()=> {setAddbtn(false); setSingleTask("")} }> X </button>
        </div> 
      }
    </div>
  </div>
  )
}