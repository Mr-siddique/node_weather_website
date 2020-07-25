
const weatherForm=document.querySelector("form")
const error=document.querySelector("#error")
const Data=document.querySelector("#data")
const search=document.querySelector("input")
weatherForm.addEventListener("submit",(e)=>{
    Data.textContent="Loading..."
    e.preventDefault()
    const searchValue=search.value
    fetch(`http://localhost:3000/weather?address=${searchValue}`).then(response=>response.json()).then(data=>{
        if(data.error){
            error.textContent=data.error
            Data.textContent=""
        }else{
            error.textContent=`Location:${data.location}`
            Data.textContent=`forecast:${data.description}`
                }
    })
})