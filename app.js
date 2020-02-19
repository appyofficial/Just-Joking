//selectors
const app = document.getElementById('app');
const joke = document.getElementById('joke');
const nextJokeButton = document.querySelector('.next-joke-btn');
const copied = document.querySelector('.copied');
const darkMode = document.querySelector('.dark-mode-btn');



//emojies
const emojies = ["😀 😂", "😁 🤣", "😂 😄", "🤣 😆", "😃 😄", "😄 😛", "😅 😜", "😆 🤣", "😉 😂", "😛 😉", "😜 😆", "😝 😄"];

//random number genrator
const randomNum = (arr) => {
    return Math.floor(Math.random() * arr.length);
};

//joke json file
const url = 'short-jokes.json';
//displaying jokes in doc
const displayJokes = (data) => {
    nextJokeButton.addEventListener('click', () => {
        let rand = randomNum(data);
        let text = `${data[rand].Joke} ${emojies[randomNum(emojies)]}`;
        joke.classList.add('slide-left');
        joke.innerText = text;
        setTimeout(() => {
            joke.classList.remove('slide-left');
        }, 1000);
    });
}
//fetching data
const getJokes = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
//outputing data
getJokes()
    .then(data => {
        /*loading joke on page load*/
        let rand = randomNum(data);
        let text = `${data[rand].Joke} ${emojies[randomNum(emojies)]}`;
        joke.innerText = text;
        /*changing joke on click */
        displayJokes(data);
    }).catch(err => err);

//copying text

const notificationCopied = () => {
    copied.style.display = 'block';
    //copied.classList.add('slide-bottom')
    setTimeout(() => {
        copied.style.display = 'none';
    }, 2000);
};

const copyJoke = () => {
    let jokeToCopy = joke.innerText;
    //creating a temprory input element
    let tempInput = document.createElement("input");
    tempInput.type = "text";
    //setting the value of input to the joke we want to copy
    tempInput.value = jokeToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("Copy");
    document.body.removeChild(tempInput);
    notificationCopied();
};