let session = new Session()
session = session.getSession()

if(session !== "") {
    window.location.href = "latke.html"
}

let dugme = document.querySelector('#registracija')
let forma = document.querySelector('.custom-modal')
dugme.addEventListener( 'click' , () => {
    
    forma.style.display = 'block'
})

let x = document.querySelector('#closeModal')
x.addEventListener( 'click', () => forma.style.display = 'none' )

let config = {
    'korisnicko_ime': {  /*Naziv atributa name iz index.html input polje!!!*/ 
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    'register_email': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50,
    },
    'register_lozinka': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'ponovi_lozinku'
    },
    'ponovi_lozinku': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'register_lozinka'
    }
};

let validator = new Validator(config, '#regForm')

let predaja = document.querySelector('#regForm')
predaja.addEventListener('submit', e => {  //Za reg kor ako sva polja valjaju
e.preventDefault();
if(validator.validationPassed()) { //Ako je prosla validacija
   let user = new User() //backend server(baza podataka za cuvanje)
   user.username = document.querySelector('#korisnicko_ime').value
   user.email = document.querySelector('#email').value  //id polja iz forme!
   user.password = document.querySelector('#lozinka').value
   user.create()
} 
else {
    alert('Polja nisu dobro popunjena')
}

} )

logForma = document.querySelector('#logginForm')
logForma.addEventListener( 'submit' , e => {
   e.preventDefault();
   
   let email = document.querySelector('#login_email').value
   let password = document.querySelector('#login_lozinka').value

   let user = new User    //kreiramo objekat a ne novog korisnika
   user.email = email
   user.password = password
   user.login()
})