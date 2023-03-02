class User {
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://62ac4346bd0e5d29af1e6de2.mockapi.io';

    //prva metoda klase:
    create() {

    let data = {   //Od cega se sastoji korisnik
       username: this.username,
       email: this.email,
       password: this.password,    
    }

    data = JSON.stringify(data) //pretvaranje sa js u json

    fetch(this.api_url + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {  //STA SE VRACA KAD SE KREIRA KORISNIK(pravi se cookie,prelazi se na latke stranicu itd)

        let session = new Session()
        session.user_id = data.id
        session.startSession()

        window.location.href = 'latke.html';
    })

    }
     
    // PRVI NACIN + prozor.js(if)

   /* get(user_id) {   //Uzima se samo 1 USER(trenutni)!!!
        let api_url = this.api_url + '/users/' + user_id
        fetch(api_url)
        .then(response => response.json())
        .then(data => {

            // PRVI NACIN + prozor.js(if)
           let username = document.querySelector('#username')
           username.innerText = data['username']
           let email = document.querySelector('#email')
           email.innerText = data['email'] 
        })
    }*/

    async get(user_id) {
        let api_url = this.api_url + '/users/' + user_id
        let response = await fetch(api_url)
        let data = await response.json()

        return data;
    }

    edit(){
      let data = {
        username: this.username,
        email: this.email
      };

      data = JSON.stringify(data)

      let session = new Session() //uvek pomocu ove sesije uzimamo id trenutnog korisnika
      session_id = session.getSession()

          fetch(this.api_url + '/users/' + session_id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
          })
          .then(response => response.json())
          .then(data => {
            window.location.href = 'latke.html'
          })

    }

    login() {     //ucitavamo sve korisnike iz apija
       fetch(this.api_url + '/users')    //GET metoda ne mora da se pise!!!(ona se podrazumeva)
       .then(response => response.json())
       .then(data => {

        let login_uspesan = 0;
        data.forEach(db_user => {
            if(db_user.email === this.email && db_user.password === this.password){
                let session = new Session()
                session.user_id = db_user.id
                session.startSession()
                login_uspesan = 1;
                window.location.href = 'latke.html'
            }
        });

        if(login_uspesan === 0){
            alert('Pogresan email ili lozinka')
        }
       })
    }


delete() {
    let session = new Session()
    session_id = session.getSession()

    fetch(this.api_url + '/users/' + session_id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        let session = new Session()
        session.destroySession()
        window.location.href = "/"
    })

}
    
}