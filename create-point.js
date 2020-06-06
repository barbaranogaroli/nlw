function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    //pegamos as informações do link e transformamos a resposta que recebemos em json (formatamos-a)
    //cada "then" ou "catch" corresponde a uma "promessa"
    //equivalente a .then((res) => { return res.json() })
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( state of states ) {
                //id e nome estão dentro do arquivo do ibge
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )    
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    //trocando o input hidden
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //fazemos essas duas linhas para que as opções sejam "zeradas" caso alguem queira mudar os estados que selecionou
    //se não fizermos isso, quando a pessoa selecionar um segundo estado, aparecerão cidades dos dois estados
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    // funcionalidade que sempre ouve qualquer evento que ocorra no progrmaa
    // () => {} arrow function, mesma coisa que função anonima 
    //nesse caso, irá ouvir qualquer mudança que ocorra na página
    .addEventListener("change",getCities)


//items de coleta, queremos pegar todos de uma vez
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//creating an array
//let is a variable, so the value can be updated
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    //add or remove class called "selected" with js:
    //toggle adds or removes, you can also say "add" or "remove"
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    //check if there are selected items, if yes select them
    //const alreadySelected = selectedItems.findIndex( item => item == itemId)
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId //será true or false
        return itemFound
    })
    
    //if already selected, remove from selection
    //if alreadySelected >= 0, it's inside the array, or != -1
    if(alreadySelected != -1) {
        //filteredItems = new arraw
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent //return false
        })

        selectedItems = filteredItems
    } else {
        //if not yet selected, add to selection
        selectedItems.push(itemId)
    }

    //update hidden input field with selected items
    collectedItems.value = selectedItems
}
    