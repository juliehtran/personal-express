// when the form is submitted
$(`#contact-form`).on(`submit`, (event) => {
    // do not navigate, do not do standard form submission
    event.preventDefault();

    // get the form's fields
    const formData = $(event.target).serialize();

    // fetch to the server separately
    // `/contact?name=blah&email=blah@blah.com&message=hiiloveyou`
    fetch(`${event.target.action}?${formData}`)
        .then((response) => response.json())
        .then((response) => {
            // alert user, pop modal, say something
            $('#modal').modal('show')
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 }
            });
            console.log(response)
        });
});

// fetch('https://zenquotes.io/api/random ')
//   .then(response => response.json())
//   .then(data => console.log(data));
