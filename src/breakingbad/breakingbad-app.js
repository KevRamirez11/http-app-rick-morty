/**
 * @param {String} id numero de Id a consultar
 * @returns {Promise<Object>} qoute information
 */
const fetchQuote = async(id) => {

    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();
    //console.log(data);

    return data;
}

function* idGenerator() {
    let currentId = 0;
    while (true){
        yield ++currentId;
    }
}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async(element) => {

    const genId = idGenerator();

    document.querySelector('#app-title').innerHTML = 'Breakingbad App';
    element.innerHTML = 'Loading...';
   
    
    const qouteLabel = document.createElement('blockquote');
    const authoLabel = document.createElement('h3');
    const nextQouteButton = document.createElement('button');
    nextQouteButton.innerText = 'Next Qoute';

    const renderQoute = (data) => {
        
         qouteLabel.innerHTML = data.name;
         authoLabel.innerHTML = data.species;
         element.replaceChildren (qouteLabel, authoLabel, nextQouteButton);
    }

    const { value }  = genId.next();


    fetchQuote( value )
    .then(renderQoute);

    nextQouteButton.addEventListener('click', async() => {
        element.innerHTML = 'Loading...';
        const { value }  = genId.next();
        const qoute = await fetchQuote(value);
        
        renderQoute(qoute);
    });
}


