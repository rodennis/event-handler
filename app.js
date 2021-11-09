let form = document.querySelector('#event-subm')
let input = document.querySelector('#event-search')
let head = document.querySelector('head')
let formBreak = document.querySelector('.form-break')
let webName = document.querySelector('.name')
let main = document.querySelector('main')
let link = document.createElement('link')
let h3 = document.createElement('h3')

// Retrieve API √
// Store API in a variable for use √
// loop through API data √
// Take user input √
// Make object of key:value pairs for name and id √
// Make data searchable with user input √
// Retrieve ID from user input relevant to event √
// store ID in a variable √

let eventArray = []

async function getEventList() {

  try {
    for (let i = 0; i < 4; i++) {
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?page=${i}&size=200&apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi`
      const getData = await axios.get(url)
      const data = getData.data._embedded.events
      let eventObj = {}

      for (let i = 0; data.length > i; i++) {
        // let name = data[i].name
        // let id = data[i].id
        // eventObj[name] = id
        let event = [data[i].name, data[i].id]
        eventArray.push(event)
      }
    }

    console.log(eventArray);

  } catch (error) {
    console.log(error);
  }

}

getEventList()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main.innerHTML = ''
  let value = input.value
  let eventId;
  let filteredData = eventArray.filter(event => {
    if (event[0].toLowerCase().includes(value)) {
      return event
    }
  })
  filteredData.forEach((event, index) => {
    setTimeout(() => {
      getApiId(event[1])
    }, index * 300);

  })
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'form.css')
  head.appendChild(link)
  webName.remove()
  formBreak.remove()
  input.value = ''
  console.log(filteredData);
})

// call second API and insert variable in ID field √
// Store API data from second API √

async function getApiId(eventId) {

  try {
    let cors = 'https://boiling-mountain-84087.herokuapp.com/'
    const url = `${cors}https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=psiP2AFkBbKeSzBAKxstCsCzjujE8HMi`
    const getData = await axios.get(url)
    const idData = getData.data
    let idName = idData.name;
    let idUrl = idData.url;
    let date = idData.dates.start.localDate
    let priceMin
    let priceMax
    // let priceMin = (typeof idData.priceRanges[0] === 'undefined') ? 0 : idData.priceRanges[0].min 
    if (Object.hasOwnProperty('priceRanges')) {
      priceMin = idData.priceRanges[0].min
      priceMax = idData.priceRanges[0].max
    } else {
      priceMin = 'Please Check Ticketmaster.com'
      priceMax = 'Please Check Ticketmaster.com'
    }

    let image = idData.images[5].url
    createDomElements(idName, idUrl, date, priceMin, priceMax, image)
    return
  }
  catch (error) {
    console.log(error);
  }
}
// Display information onto webpage √
// Create divs for each event √

function createDomElements(idName, idUrl, date, priceMin, priceMax, image) {
  let div = document.createElement('div')
  let img = document.createElement('img');
  let eventImage = document.createElement('div')
  let eventInfo = document.createElement('div')
  let infoDiv = document.createElement('div')
  let buyTickets = document.createElement('p')
  let eachEventName = document.createElement('p')
  let eachEventDate = document.createElement('p')
  let eventPriceMin = document.createElement('p')
  let eventPriceMax = document.createElement('p')
  eventImage.classList.add('pictures')
  eventInfo.classList.add('info')
  div.classList.add('eventPicture')
  buyTickets.innerHTML = `Buy Tickets: <a href="${idUrl}">Ticketmaster.com</a>`
  img.src = image
  eachEventName.innerText = `Event Name: ${idName}`
  eachEventDate.innerText = `Event Date: ${date}`
  eventPriceMin.innerText = `Minimum Price range: ${priceMin}`
  eventPriceMax.innerText = `maximum Price Range: ${priceMax}`
  main.appendChild(eventImage)
  main.appendChild(eventInfo)
  eventInfo.appendChild(infoDiv)
  div.appendChild(img)
  eventImage.appendChild(div)
  infoDiv.appendChild(eachEventName)
  infoDiv.appendChild(eachEventDate)
  infoDiv.appendChild(eventPriceMin)
  infoDiv.appendChild(eventPriceMax)
  infoDiv.appendChild(buyTickets)
}

// DONE! √

// POST MVP


