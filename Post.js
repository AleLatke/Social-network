class Post {
    post_id = '';
    post_content = '';
    user_id = '';
    likes = '';
    api_url = 'https://62ac4346bd0e5d29af1e6de2.mockapi.io';

   async create(){
      let session = new Session()
      session_id = session.getSession()
      let data = {   //ova 3 polja uzimamo zato sto smo u API-ju stavili ova 3 polja!
        user_id: session_id,
        content: this.post_content,
        likes: 0
      }

      data = JSON.stringify(data)
      let response = await fetch(this.api_url + '/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
      })

      data = await response.json()

      return data
   }


   async allPosts(){  //pomocu fetcha uzimamo sve postove
    let response = await fetch(this.api_url + '/posts');
    let data = await response.json();
    return data
   }
}