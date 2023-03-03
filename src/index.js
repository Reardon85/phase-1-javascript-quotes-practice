function init() {

    const quoteForm = document.getElementById('new-quote-form')


    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const formObj = {
            quote: quoteForm.quote.value,
            author: quoteForm.author.value,
            likes: []
        }

        renderQuote(formObj)
        quoteForm.reset();

    })


    fetch('http://localhost:3000/quotes?_embed=likes')
        .then((resp) => resp.json())
        .then((quotes) => {

            quotes.forEach(renderQuote);
        })
}

function renderQuote(quoteObj) {

    const quoteList = document.getElementById('quote-list');
    const li = document.createElement('li');
    li.className = 'quote-card';
    //li.id = quoteObj.id;

    //console.log(quoteObj)
    li.innerHTML =
    `<blockquote class="blockquote">
    <p class="mb-0">${quoteObj.quote}</p>
    <footer class="blockquote-footer">${quoteObj.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>`

    const likeBtn = li.children[0].children[3];
    const deleteBtn = li.children[0].children[4];

    quoteList.appendChild(li);


    likeBtn.addEventListener('click', () => {
        
        const likeObj = {
            quoteId: quoteObj.id
            //createdAt: Date.now()
        }
        console.log(likeObj);
        
        fetch('http://localhost:3000/likes', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(likeObj)
        })
        .then((resp) => resp.json())
        .then((data) => {
            likeBtn.children[0].textContent++;
        })
        
    })

    


    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            },
        })
        .then((resp) => {
            li.remove();
        });
    } )




}




document.addEventListener('DOMContentLoaded', init);





































// function init (){

//     const quoteForm = document.getElementById('new-quote-form');

//     //For Submiting New Quote
//     quoteForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const newQuote = {
//                 quote: quoteForm.quote.value,
//                 author: quoteForm.author.value
//         }
//         createQuote(newQuote);
//     })

//     //To Pull Quotes from DB and Render them
//     fetch('http://localhost:3000/quotes?_embed=likes')
//     .then((resp) => resp.json())
//     .then((quotes) => {

//         quotes.forEach(renderQuote)
//     })
// }


// // Function called by Form Event Listener.
// // Accepts an Object that mimics the DB quotes object and who's Key/Value pair is taken from the Form
// // Posts Object into DB and then calls renderQuotes function on Object
// function createQuote(newQuote){

//     fetch('http://localhost:3000/quotes', {
//         method: "POST",
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newQuote) 
//     })
//     .then((resp)=> resp.json())
//     .then((data) => {
//         data.likes = [];
//         renderQuote(data)
//     })

// }


//Accepts an Object as an Argument that mimics the format of DB Objects 
//Appends Obj in an the form of <li> element to the DOM 
//adds Event Listeners to the <li> Buttons that POST or DELETE to the DB and then update the DOM
// function renderQuote(quoteObj){

//     const quoteList = document.getElementById('quote-list');
//     const li = document.createElement('li'); 

//     li.className = 'quote-card';
//     li.id = quoteObj.id;
//     li.innerHTML = 
//         `<blockquote class="blockquote">
//           <p class="mb-0">${quoteObj.quote}</p>
//           <footer class="blockquote-footer">${quoteObj.author}</footer>
//           <br>
//           <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
//           <button class='btn-danger'>Delete</button>
//         </blockquote>`

//     const likeBtn = li.children[0].children[3];
//     const delBtn = li.children[0].children[4];

//     quoteList.appendChild(li);


//     //Sends Post to DB increasing QuoteBlocks likes then updates DOM
//     likeBtn.addEventListener('click', () => {

//         const likeObj = {
//             quoteId: quoteObj.id
//         }

//         fetch('http://localhost:3000/likes', {
//             method: "POST",
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(likeObj)
//         })
//         .then((resp) => resp.json())
//         .then((data) => {
//             //updating DOM like counter
//             likeBtn.children[0].textContent++           
//         })
//     })


//     //Sends DELETE for Obj to DB hen removes it from DOM
//     delBtn.addEventListener('click', () => {

//             fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             })
//             .then((resp) => {
//                 //updating the DOM by removing Quote
//                 li.remove();
//             });

//     })
// }


// document.addEventListener('DOMContentLoaded', init);