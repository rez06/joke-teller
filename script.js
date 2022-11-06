const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing joke variable to VoiceRSS API src
function tellMe(joke) {
    VoiceRSS.speech({
      key: 'd118a2d67d984d2bbd1d6c4b61e2ca41',
      src: joke,
      hl: 'en-us',
      v: 'Linda',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
    });
  
  }

// GET JOKES from API
async function getJokes() {
  //add variable for joke json data
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke
    }
    //Text-to-Speech
    tellMe(joke); // will pass the tellMe function here to convert jokes to speech
//Disable Button
    toggleButton();
  } catch (error) {
    //Catch errors
    console.log('whoops', error)
  }
}

//When you click the button, the getJokes function will run
button.addEventListener('click', getJokes);
//prevent the user to click the button 
audioElement.addEventListener('ended', toggleButton);