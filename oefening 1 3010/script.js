(function () {
    'use strickt'
    const forms = document.forms;
    const orderForm = forms.orderForm;
    
    const name = orderForm.name;
    const firstName = orderForm.firstName;
    const email = orderForm.email;
    const deliverOrNot = orderForm.deliverOrNot;
    const orderButton = orderForm.orderButton;

    orderButton.addEventListener('click', showInput);

    function showInput(e) {
        e.preventDefault(); // zorg ervoor dat de pagina niet default herladen wordt.
        const nameP = document.createElement("p");
        const firstNameP = document.createElement("P");
        const emailP = document.createElement("P");
        const deliverOrNotP = document.createElement("P");
        
        nameP.innerText = name.value;
        firstNameP.innerText = firstName.value;
        emailP.innerText = email.value;
        deliverOrNotP.innerText = deliverOrNot.value;


        document.body.appendChild(nameP);
        document.body.appendChild(firstNameP);
        document.body.appendChild(emailP);
        document.body.appendChild(deliverOrNotP);
    }
  })();