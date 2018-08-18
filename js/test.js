

document.querySelector('#modal-wrapper .close').onclick = function() {
        document.querySelector('#modal-wrapper').setAttribute('class', '');
    }

    document.querySelector('#modal-wrapper .apply').onclick = function() {
        const newDescription = document.querySelector('#modal-wrapper input').value;
        editItem.camera.full_name = newDescription;
        renderItems();
        editItem = {};
        document.querySelector('#modal-wrapper input').value = '';
        document.querySelector('#modal-wrapper').setAttribute('class', '');
    }

    let items = [];
    let editItem = {};

    function renderItems() {
        document.getElementById('demo').innerHTML = '';

        items.forEach(function(u, index) {
            var wraperItem = document.createElement('div');
            wraperItem.setAttribute("class", "wrapper-lot")
            document.getElementById('demo').appendChild(wraperItem);

            wraperItem.innerHTML = `<div class="lot">
                                    <div class="delete"></div>
                                    <div>
                                    <img class="photo" src="${u.img_src}" />
                                    </div>
                                    <div class="parameters">
                                        <div>${u.camera.name}</div>
                                        <div class="full-name">${u.camera.full_name}</div>
                                        <div>${u.earth_date}</div>
                                        <div>$${u.randomPrice}</div>
                                    </div>
                                    </div>`;
            wraperItem.querySelector('.delete').onclick = function() { deleteClicked(index) };
            wraperItem.querySelector('.full-name').onclick = function() {
                document.querySelector('#modal-wrapper').setAttribute('class', 'active');
                editItem = u;
                document.querySelector('#modal-wrapper input').value = editItem.camera.full_name;
            }
        })
    }

    function changeFullName(index, newFullName) {
        items[index].camera.full_name = newFullName;
    }

    function deleteClicked(index) {
        items.splice(index, 1)
        renderItems();
    }

    function sortByPrice() {
        items.sort(function(prev, next) {
            if (prev.randomPrice > next.randomPrice) {
                return 1;
            }
            return -1;
        });
        renderItems();
    }


    function sortByName() {
        items.sort(function(prev, next) {
            return prev.camera.name.localeCompare(next.camera.name);
        });
        renderItems();
    }

    function sortByDate() {
        items.sort(function(prev, next) {
            if (new Date(prev.earth_date) > new Date(next.earth_date)) {
                return 1;
            }
            return -1;
        });
        renderItems();
    };


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const photos = JSON.parse(this.response).photos;
            photos.forEach(function(item) {
                item.randomPrice = Math.floor(Math.random() * 1481 + 20);
            });
            // Uncomment when date sorting test is needed. Server date is the same for all the items.
            // photos[5].earth_date = '2017-06-05';
            // photos[10].earth_date = '2016-06-05';

            items = photos;
            renderItems();
        }
    };


    xhttp.open("GET", "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=6&api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo", true);
    xhttp.send();

    document.querySelector('.sort-by-price').onclick = sortByPrice;
    document.querySelector('.sort-by-name').onclick = sortByName;
    document.querySelector('.sort-by-date').onclick = sortByDate;