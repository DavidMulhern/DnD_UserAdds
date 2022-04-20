// Using axios to retrieve API data
import axios from 'axios';
import config from '../Components/config/config'

const getImages = async () => {
  const page = Math.floor(Math.random() * 20 + 1);
  // pluing personal key into url.
  const urlImages = `https://api.unsplash.com/search/photos?page=${page}&query=Landscape&client_id=${config.clientKey}`;
  // asynchronously retrieving the data
  const res = await axios.get(urlImages);
  // Mapping the images, SideMenu.js will take the data from here.
  const photos = res.data.results.map((image) => ({
    id: image.id,
    thumb: image.urls.thumb,
    full: image.urls.full,
    user: {
      username: image.user.username,
      link: image.user.links.html,
    },
  }));
  return photos;
};

export { getImages };