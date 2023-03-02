class Comment {

user_id = ''
post_id = ''
content = ''
api_url = 'https://62ac4346bd0e5d29af1e6de2.mockapi.io'

create(){
    let data = {   //Od cega se sastoji korisnik
        post_id: this.post_id,
        user_id: this.user_id,
        content: this.content    
     }
 
     data = JSON.stringify(data) //pretvaranje sa js u json
 
     fetch(this.api_url + '/comments', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: data
     })
     .then(response => response.json())
     .then(data => alert('Postavljen komentar'))
    
}
async get(post_id){
    let api = this.api_url + '/comments' //da se uzmu svi komentari
    const response = await fetch(api)
    const data = await response.json()
    let post_comments = [] //tu se stavljaju samo komentari za komentarisani post!
    
    let i = 0
    data.forEach(komentar => {
        if(komentar.post_id === post_id){   //Ako je post id u komentaru jednak post idu posta!

           post_comments[i] = komentar
           i++;


        }
    });
  return post_comments;
}
}