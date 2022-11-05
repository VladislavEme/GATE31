const list = document.getElementById('ul');
const input = document.getElementsByClassName('search__input')[0];
const button = document.getElementsByClassName('search__button')[0];

fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
  .then((res) => res.json())
  .then((data) => getData(data));

const getData = (data) => {
  onCklickSearch(data);
  createItem(data);
};

const createItem = (data) => {
  if (data.length) {
    getDataSearch(data).map((item, index) => {
      const itemList = document.createElement('li');
      const title = document.createElement('h2');
      const desc = document.createElement('p');
      const checkTheme = document.createElement('input');

      title.textContent = item.title;
      desc.textContent = item.body;
      checkTheme.type = 'checkbox';
      checkTheme.id = 'checkBox' + index;

      list.append(itemList);

      itemList.append(title);
      itemList.append(desc);
      itemList.append(checkTheme);

      eventCheckbox(checkTheme, itemList);
    });
  } else {
    const error = document.createElement('li');
    error.classList.add('error');
    error.textContent = 'Информация не найдена! 😔';
    list.append(error);
  }
};

const eventCheckbox = (checkBox, itemList) => {
  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      itemList.classList.add('theme-dark');
    } else {
      itemList.classList.remove('theme-dark');
    }
  });
};

const getDataSearch = (data) => {
  const searchTitle = location.search.substring(7);
  const spaceDelete = searchTitle.replace(/%20/gi, ' ');
  const filteredData = data.filter((item) => item.title.includes(spaceDelete));
  return filteredData;
};

const onCklickSearch = (data) => {
  button.addEventListener('click', () => {
    if (input.value.length) {
      history.replaceState(null, null, `?title=${input.value}`);
    } else {
      history.replaceState(null, null, '/');
    }

    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    createItem(getDataSearch(data));
  });
};
