// Retrieve API √
async function getEventList() {
  try {
    const url = 'https://app.ticketmaster.com/discovery/v2/events.json?size=200&apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi'
    const getData = await axios.get(url)
    const data = getData.data._embedded.events
    let dataObj = {}
    for (let i = 0; data.length > i; i++) {
      let name = data[i].name
      let id = data[i].id
      dataObj[name] = id
      console.log(name)
    }

    console.log(dataObj);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getEventList()

// Store API in a variable for use √
// loop through API data √
// Take user input √
let form = document.querySelector('#event-subm')
let input = document.querySelector('#event-search')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let value = input.value
  alert(value);
})

// Make object of key:value pairs for name and id
// Make data searchable with user input
// Retrieve ID from user input relevant to event
// store ID in a variable
// call second API and insert variable in ID field
// Store API data from second API
// Display information onto webpage
// DONE!