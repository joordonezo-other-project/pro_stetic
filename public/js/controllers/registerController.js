const getAllRole = async () => {
    return fetch('./getAllRole', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    }).then(res => res.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    // vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                return responseData;
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const setAllRoleInSelect = async () => {
    let select = document.getElementById('role');
    let allRole = await getAllRole();
    (allRole && select) && allRole.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = i18(element.name);
        select.appendChild(option);
    });
}

const searchAddressByContent = () => {
    let address = document.getElementById('searchAddress').value;
    let popover = document.querySelector('div[input-search-selector="#searchAddress"]');
    let middle = popover.clientHeight / 2;
    window.scroll(address.left, (address.top - middle));
    fetch('./searchAddressByContent', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            address
        })
    }).then(res => res.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    // vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }

                paintDirreccion(popover, responseData);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const paintDirreccion = (popover, responseData) => {
    if (responseData.length > 0) {
        popover.classList.remove('d-none');
    } else {
        popover.classList.add('d-none');
    }
    let popoverBody = popover.querySelector('.popover-body');
    popoverBody.innerHTML = '';
    responseData.forEach(element => {
        let button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-outline-primary');
        button.classList.add('form-control');
        button.classList.add('mb-2');
        button.setAttribute('data-id', element.id);
        button.innerHTML = `<i class="bi bi-plus"></i> ${element.description}`;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            let address = document.getElementById('address');
            let searchAddress = document.getElementById('searchAddress');
            address.value = id;
            searchAddress.value = element.description;
            popover.classList.add('d-none');
        });
        popoverBody.appendChild(button);
    });
}
setAllRoleInSelect();
