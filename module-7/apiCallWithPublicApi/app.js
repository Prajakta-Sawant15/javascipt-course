document.querySelector('.get-jokes').addEventListener('click', getJokes);
function getJokes(e) {
    const number = document.querySelector('input[type="number"]').value;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const resopnse = JSON.parse(this.responseText)
            console.log(resopnse)
            let output = '';
            if (resopnse.type === 'success') {
                resopnse.value.forEach(jokes => {
                    output += `<li>${jokes.joke}</li>`
                })
            } else {
                output += `<li>Something went wrong</li>`
            }
            document.querySelector('.jokes').innerHTML = output;
        }
    }
    xhr.send();
    e.preventDefault();
}