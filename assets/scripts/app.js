const startMovieBtn = document.querySelector('header').lastElementChild;
const addModal = document.getElementById('add-modal');
const backdrop = document.querySelector('.backdrop');
const cancelModal  = document.querySelector('.modal-cancel');
const addMovies = document.querySelector('.add-movie');
const userInput = document.querySelectorAll('input');
const entrySection = document.getElementById('entry-text');
const uiUl = document.querySelector('#movie-list');
const deleteModal = document.querySelector('#delete-modal')
const doNotDelete = document.querySelector('.cancel-delete');
const confirmDelete = document.querySelector('.confirm-delete')
let IndexOfMovieToDelete = -1;

const moviesArray = [];

function toggleBackdrop(){
    backdrop.classList.toggle('backdrop-visible');
}

function toggleAddModal(){
    addModal.classList.toggle('add-modal-visible');
}

function toggleDeleteModal(){
    backdrop.classList.toggle('backdrop-visible');
    deleteModal.classList.toggle('delete-modal-visible');
}

function clearInputs(){
    for (const input of userInput){
        input.value = '';
    }
}

function disableEntrySection(){
    if (moviesArray.length ===0){
        entrySection.style.display = "block";
    }else{
        entrySection.style.display = "none";
    }
}

function renderUI(title, url, rating){
    const newMovieLi = document.createElement('li');
    newMovieLi.innerHTML = `
    <div class = "movie-element__image">
        <img src = "${url}" alt = "${title}">
    </div>
    <div class = "movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
        <button type ="button">Delete </button>
    </div>
    `;
    uiUl.append(newMovieLi);
}
 
function confirmDeleteHandler(){
    uiUl.children[IndexOfMovieToDelete].remove();
    moviesArray.splice(IndexOfMovieToDelete, 1);
    toggleDeleteModal();
}

const startMovieBtnHandler = ()=>{
    toggleAddModal();
    toggleBackdrop();
}

const cancelModalHandler = ()=>{
    toggleAddModal();
    toggleBackdrop();
    clearInputs();
}

const backdropHandler = ()=>{
    toggleAddModal();
    toggleBackdrop();
    clearInputs();
}

const addMoviesHandler = ()=>{
    //get userinputs
    const movieTitle = userInput[0].value;
    const imageUrl = userInput[1].value;
    const ratingValue = userInput[2].value;
    
    //trim input values and check for empty values
    if (movieTitle.trim() ==='' || 
        imageUrl.trim() ==='' || 
        ratingValue.trim() ==='' || 
        +ratingValue < 1){
            alert('Please enter Valid Input');
            return;
        }
    
    //update movie Array
    const movie = {
        title : movieTitle,
        image : imageUrl,
        rating : ratingValue
    }
    
    moviesArray.push(movie);
    
    //reomve Modal and backdrop
    toggleAddModal();
    toggleBackdrop();

    //clear Input
    clearInputs();
    
    //remove entry Section
    disableEntrySection();
    renderUI(movieTitle, imageUrl, ratingValue);
}

// get modal to enter new movie
startMovieBtn.addEventListener('click', startMovieBtnHandler);

// remove modal and backdrop
cancelModal.addEventListener('click', cancelModalHandler);

// backdrop handler -- remove modal and backdrop
backdrop.addEventListener('click', backdropHandler);

// add new movie to UI and backend
addMovies.addEventListener('click', addMoviesHandler);

//delete Movies from UI and backend
uiUl.addEventListener('click', (event)=>{    
    if (event.target.nodeName === 'BUTTON'){
        const listOfLis = uiUl.children;
        const currentLi = event.target.parentElement.parentElement;
        
        IndexOfMovieToDelete =Array.prototype.indexOf.call(listOfLis, currentLi);

        toggleDeleteModal();
    }
})

doNotDelete.addEventListener('click', toggleDeleteModal);
confirmDelete.addEventListener('click', confirmDeleteHandler);