let form = document.querySelector('#event-subm')
let input = document.querySelector('#event-search')
let head = document.querySelector('head')

// Retrieve API √
// Store API in a variable for use √
// loop through API data √
// Take user input √
// Make object of key:value pairs for name and id √
// Make data searchable with user input √
// Retrieve ID from user input relevant to event √
// store ID in a variable √

async function getEventList() {
  try {
    const url = 'https://app.ticketmaster.com/discovery/v2/events.json?page=1&size=200&apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi'
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
      for (let i = 0; eventArray.length > i; i++) {
        setTimeout(() => {
          if (eventArray[i][0].toLowerCase().includes(value)) {
            eventId = eventArray[i][1]
            getApiId(eventId)
          }
        }, i * 100)
      }
      let webName = document.querySelector('.name')
      let link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', 'form.css')
      head.appendChild(link)
      webName.remove()
    })
  }
  catch (error) {
    console.log(error);
  }
}

getEventList()

// call second API and insert variable in ID field √
// Store API data from second API √

async function getApiId(eventId) {

  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi`
    const getData = await axios.get(url)
    const idData = getData.data
    let idName = idData.name;
    let idUrl = idData.url;
    let date = idData.dates.start.localDate
    let priceMin = idData.priceRanges[0].min
    let priceMax = idData.priceRanges[0].max
    let image = idData.images[5].url

  }
  catch (error) {
    console.log(error);
  }
}
// Display information onto webpage
// Create divs for each event 

// DONE!

// POST MVP

// async function secondPageApi() {
//   try {
//     let url = 'https://app.ticketmaster.com/discovery/v2/events.json?page=1&size=200&apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi'
//     let getData = await axios.get(url)
//     let page1Data = getData.data._embedded.events
//     console.log(page1Data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// secondPageApi()

