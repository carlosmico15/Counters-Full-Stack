document.addEventListener( 'DOMContentLoaded', () => {
    document.querySelector('.inputCounter').addEventListener('keyup',event=>{
      if(event.keyCode===13){
        if(event.target.value===""){
           event.target.value=0;
          }
        let counter=document.createElement('div');
        counter.className="counter"
        counter.innerHTML=`
        <button class="decrementButton">-</button>
        <span class="count">${event.target.value}</span>
        <button class="incrementButton">+</button>`
        document.querySelector(".Counters").appendChild(counter)
        let url=`http://localhost:3001/addCounter/${event.target.value}`
        fetch(url)
        .then(res=>res.json()).then(console.log)
        
        event.target.value=""


        counter.querySelector(".decrementButton").addEventListener('click',event=>{
        
        })
      }
    })
} );
