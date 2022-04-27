const newPolymerName = document.getElementById("newPolymer");
const oldPolymer = document.getElementById("oldPolymer");
const isReverse = document.getElementById("isReverse");
const buttonReady = document.getElementById("ready");

const createNewPolymer = () => {
    axios.post('/api/createPolymer', {
        newPolymer: newPolymerName.value,
        oldPolymer: oldPolymer.value,
        isReverse: isReverse.value
    }).then(function (response) {
        if (response.data === 'ok') {
            alert(`Полимер ${newPolymerName.value} успешно добавлен в базу данных`);
        }
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

buttonReady.addEventListener('click', createNewPolymer);