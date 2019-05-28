document.addEventListener( 'DOMContentLoaded', () => {

    const addCounterToDOM=counterObject=>{
      let counter=document.createElement('div');
      counter.setAttribute("data-id",counterObject._id)
      counter.className="counter"
      counter.innerHTML=`
      <button class="decrementButton" >-</button>
      <span class="count" >${counterObject.count}</span>
      <button class="incrementButton">+</button>`
      document.querySelector(".Counters").appendChild(counter)
      counter.querySelector(".incrementButton").addEventListener('click',event=>{
        fetch(`http://localhost:3001/increment/${counterObject._id}`)
        .then(res=>res.json())
        .then(res=>{
         document.querySelector(`[data-id="${res._id}"] span`).innerHTML=res.count
        })
        .catch(console.log)
      })
      //TODO ADD DECREMENT BUTTON LISTENER
    }
    fetch( `http://localhost:3001/all` )
        .then( res => res.json() )
        .then( res => {
            for (const counter of res) {
              addCounterToDOM(counter)
            }
        } )
        .catch(console.log)

    document.querySelector( '.inputCounter' ).addEventListener( 'keyup', event => {
        if ( event.keyCode === 13 ) {
            if ( event.target.value === "" ) {
                event.target.value = 0;
            }
            fetch( `http://localhost:3001/addCounter/${event.target.value}` )
                .then( res => res.json() ).then( res => {
                  addCounterToDOM(res)
                } )
                .catch(console.log)

            event.target.value = ""

        }
    } )
} );
