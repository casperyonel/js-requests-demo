console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'
// This is so we DRY for our axios requests

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllChars() {
  clearCharacters()
  // ClearCharacters() takes that container and gets rid of all that text, then we can load up the new ones

  axios.get(`${baseURL}/characters`)
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        // This iterates through the data, because it's given in an array, and pull out the information. 
        createCharacterCard(response.data[i])
        // Response is an object, data is an array (which we use dotnation becase we access it through the object of reponse), and we use brakcet notation ON that array data. 
        // *** esponse = { data: [1, 2, 3, 4], key2: value3, key3: value3 }***
        // *** 1 object, then we have keys in that object, but we always use the data key, which is structured as an ARRAY!***
        // This function doesnt take paramenter because it just boots up al lthe info, vs. the one below that requires AN EVENT, like a clikc)

        // Data COULD be an object or an array, depending on backend. Let characters in server.js is tryign to replicate a database. We made it an array for this exercise, but in future example of below function, 
        // they already pulled out the index out of the array. Backend can manipulate the data however they want. 
      }
    })
    .catch(error => {
    console.log(error) 
  })    
  }


function getOneChar(event) {
  clearCharacters()

  axios.get(`${baseURL}/character/${event.target.id}`)
    .then((res) => {
      createCharacterCard(res.data)
      // Backend is in control of what we get back
      // YOU CAN CONSOLE.LOG into the console on Chrome the res.data!!)
  })
      // Since we're targeting a specific user, we don't need a [i]. 
      // In the backend, they decided to sned us an object for data, could've been an array too if they wanted
}


// were trying to pull the specific ID form the target of that event. like the button is the target


getAllBtn.addEventListener('click', getAllChars)
// Just adding an event listener to the even trigger, which is the get all button, that calls the function getAllChar() which pulls each key value par stored in our data array
// transmitted through JSON, requested via axios .get, via our reponse / promise object, identified via dot notation to acess the data key, that has an array as a value. 

for (let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneChar)
}
// Whenever you see .length, it's referencing an array, which was from querySelectorAll (which returns an array!) Charbtns (which is the top buttons, we're just adding event listeners to those to all our function)
// we're going to addaevent listeners to al lof these buttons