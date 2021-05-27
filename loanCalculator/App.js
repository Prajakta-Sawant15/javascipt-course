// listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // hide results
    document.getElementById('results').style.display = 'none';

    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

//calculate results
function calculateResults() {
    console.log('calculating...')
    // UI vars
    const amount = document.getElementById('amount');
    const intrest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calaulatedIntrest = parseFloat(intrest.value) / 100 / 12;

    const calculatedPayments = parseFloat(years.value) * 12;

    //calculate monthly payments
    const x = Math.pow(1 + calaulatedIntrest, calculatedPayments);
    const monthly = (principle * x * calaulatedIntrest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Pls check your number');
    }
}

function showError(error) {

    //hide loader
    document.getElementById('loading').style.display = 'none';

    // show loader
    document.getElementById('loading').style.display = 'block';

    // create a div 
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // create a text node and appened to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading 
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);

}

// clear error function 
function clearError() {
    document.querySelector('.alert-danger').remove();
}