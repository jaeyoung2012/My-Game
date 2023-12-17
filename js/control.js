document.addEventListener("keydown",(e)=>{
    isMoving = true
    keyCode = e.code;
})
document.addEventListener("keyup",(e)=>{
    isMoving = false
    keyCode = null;
})

// keys = ["KeyW","KeyS","KeyA","KeyD"]
// controls = [document.getElementById("up"),document.getElementById("down"),document.getElementById("left"),document.getElementById("right")]

// controls.map((a,i)=>{
    
//     a.addEventListener("mousedown", ()=>{
        
//         isMoving = true
        
//         keyCode = keys[i]
        
        
//     })
//     a.addEventListener("mouseup",()=>{
//         isMoving = false
//         keyCode = null
//     })
//     // a.addEventListener("mouseleave",()=>{
//     //     isMoving = false
//     //     keyCode = null
//     // })
// })
