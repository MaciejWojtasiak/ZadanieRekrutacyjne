const fetchedUrls = [];
const imagesContainer = document.querySelector('.images');

let index;
let lastToDisplay;

async function getData() {
    const listUrl = 'https://picsum.photos/v2/list';

    const response = await fetch(listUrl);
    if (response.ok) {
        return response.json();
    } else {
        console.log('Error');
    }
};

async function init() {
    index = 0;
    const data = await getData();

    data.forEach(element => getPath(element));
    displayImages();
};

function getPath(element) {
    const photoUrl = element.url;
    const path = photoUrl.slice(28, photoUrl.length);

    fetchedUrls.push(path);
};

init();

function displayImages() {
    imagesContainer.innerHTML = '';
    lastToDisplay = index + 3;

    if (lastToDisplay > fetchedUrls.length) {
        index = 0;
        lastToDisplay = index + 3;
    }

    for (index; index < lastToDisplay; index++) {
        const imgUrl = fetchedUrls[index];
        renderImage(imgUrl);
    }
};

const nextButton = document.querySelector('.btn');
nextButton.addEventListener('click', displayImages);

function renderImage(imgUrl) {
    const renderUrl = 'https://source.unsplash.com/';

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    const image = document.createElement('img');
    image.setAttribute('src', `${renderUrl}${imgUrl}`);
    imageDiv.appendChild(image);
    imagesContainer.appendChild(imageDiv);
}

