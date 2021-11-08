let form = document.querySelector('#event-subm')
let input = document.querySelector('#event-search')

// Retrieve API √
async function getEventList() {
  try {
    const url = 'https://app.ticketmaster.com/discovery/v2/events.json?size=200&apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi'
    const getData = await axios.get(url)
    const data = getData.data._embedded.events
    let eventObj = {}
    for (let i = 0; data.length > i; i++) {
      let name = data[i].name
      let id = data[i].id
      eventObj[name] = id
    }

    let eventArray = Object.entries(eventObj)


    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let value = input.value
      let eventId;
      eventArray.forEach(e => {
        if (e[0].toLowerCase().includes(value)) {
          eventId = e[1];
          console.log(eventId);
        }
      })

      getApiId(eventId)
    })

  } catch (error) {
    console.log(error);
  }
}

getEventList()

// Store API in a variable for use √
// loop through API data √
// Take user input √
// Make object of key:value pairs for name and id √
// Make data searchable with user input
async function getApiId(eventId) {

  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi`
    const getData = await axios.get(url)
    const data = getData.data
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  // Retrieve ID from user input relevant to event

  // store ID in a variable
  // call second API and insert variable in ID field
  // Store API data from second API
}
// Display information onto webpage
// DONE!