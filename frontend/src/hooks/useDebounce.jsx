import { useEffect, useState } from "react"

export function  useDebounce(inp,time){

 const[db,setdb]=useState(inp);

 useEffect(()=>{

  let val=setTimeout(()=>{
    console.log("trigeer")
    setdb(inp)
  },time)

   return ()=>{
    clearTimeout(val);
   }

 },[inp])

return db;

}