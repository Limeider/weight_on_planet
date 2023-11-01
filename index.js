// Get DOM elements
const getElement = (selector) => document.querySelector(selector)

const inputElement = getElement('input')
const selectElement = getElement('select')
const buttonElement = getElement('.btn')
const flexContainer = getElement('.flex-container')
const imageContainer = getElement('.image-container')
const descriptionParagraph = getElement('.p-description')
const valueContainer = getElement('.value-container')
const valueSpan = getElement('.value-span')

// Map of gravity values on different planets
const gravityValuesMap = new Map([
    ['mercury', 3.59],
    ['venus', 8.87],
    ['earth', 9.81],
    ['moon', 1.62],
    ['mars', 3.77],
    ['jupiter', 25.95],
    ['saturn', 11.08],
    ['uranus', 10.67],
    ['neptune', 14.07],
    ['pluto', 0.42]
])

// Initial class setup
flexContainer.classList.add('invisible')
valueContainer.classList.add('invisible')

// Event listener
buttonElement.addEventListener('click', function (event) {
    flexContainer.classList.remove('invisible')

    const enteredText = inputElement.value
    const selectedIndex = selectElement.selectedIndex
    const selectedPlanet = selectElement.options[selectedIndex].value

    if (enteredText === '') {
        clearValueElements()
        descriptionParagraph.textContent = 'Mass is required!'
    } else if (isNaN(enteredText)) {
        clearValueElements()
        descriptionParagraph.textContent = 'Only numbers can be entered!'
    } else if (selectedIndex === 0) {
        clearValueElements()
        descriptionParagraph.textContent = 'Select a planet!'
    } else if (enteredText.length >= 20) {
        clearValueElements()
        descriptionParagraph.textContent = 'Value must be under 20 digits!'
    } else {
        valueContainer.classList.remove('invisible')

        const currentWeight = getWeightOnPlanet(enteredText, selectedPlanet)

        descriptionParagraph.textContent = `The weight of object on the ${selectedPlanet}`
        valueSpan.textContent = `${currentWeight} N`

        const planetImage = createPlanetImage(selectedPlanet)
        updatePlanetImage(planetImage)

    }
})

// Function to get weight
function getWeightOnPlanet(mass, planet) {
    const planetGravityValue = gravityValuesMap.get(planet)
    return (mass * planetGravityValue).toFixed(2)
}

// Image handling functions

function createPlanetImage(planet) {
    const planetImage = document.createElement('img')
    planetImage.src = `images/${planet}.png`
    return planetImage
}

function updatePlanetImage(newPlanetImage) {
    const previousImage = imageContainer.querySelector('img')
    if (previousImage) {
        imageContainer.removeChild(previousImage)
    }
    imageContainer.appendChild(newPlanetImage)
}

// clears elements when needed i.e error occurs
function clearValueElements() {
    descriptionParagraph.textContent = ''
    valueSpan.textContent = ''
    const previousImage = imageContainer.querySelector('img')
    if (previousImage) {
        imageContainer.removeChild(previousImage)
    }
}

// Function to play audio when the page is in focus
function playAudioOnFocus() {
    const audio = document.getElementById('backgroundAudio')

    function playAudio() {
        if (!audio.paused) return; // Don't play if already playing
        audio.play().catch(error => {
            // Handle errors, if any
            console.error("Audio playback error:", error)
        })
    }
    playAudio()
}

document.addEventListener('click', playAudioOnFocus)