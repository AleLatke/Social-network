let session = new Session()
session_id = session.getSession() //ID trenutnog korisnika!

if(session_id !== "") {
   /* let user = new User()
    user.get(session_id)*/
    
    async function userInfo(){
      let user = new User()
      user = await user.get(session_id)
      
      let usernamee = document.querySelector('#username')
      usernamee.innerText = user['username']
      let emaill = document.querySelector('#email')
      emaill.innerText = user['email']

      document.querySelector('#korisnicko_ime').value = user['username']
      document.querySelector('#edit_email').value = user['email']

    }
    userInfo()
} else {
    window.location.href = "/";
}
let dugme = document.querySelector('#logout')
dugme.addEventListener( 'click' , e => {
  e.preventDefault
  session.destroySession()

  window.location.href = '/'
})

let dugm = document.querySelector('#edit')
let formm = document.querySelector('.custom-modal')
dugm.addEventListener( 'click' , () => {
    
    formm.style.display = 'block'
})

let xx = document.querySelector('#closeModal')
xx.addEventListener( 'click', () => formm.style.display = 'none' )

document.querySelector('#editForm').addEventListener( 'submit' , e => {
  e.preventDefault()
  let user = new User()
  user.username = document.querySelector('#korisnicko_ime').value
  user.email = document.querySelector('#edit_email').value
  user.edit();
})


/*let izmeni = document.querySelector('#edit')
izmeni.addEventListener( 'click' , )*/

let obrisi = document.querySelector("#deleteProfile");
obrisi.addEventListener( 'click' , e => {
  e.preventDefault()

  let text = 'Da li ste sigurni da zelite da obrisete profil?';
  
  //Otvaranje Popupa ako je slucajno kliknuo
  if(confirm(text) === true) {
    let user = new User(session_id)
    user.delete()
  }
});

document.querySelector('#postForm').addEventListener( 'submit' , e => {
  e.preventDefault()

  async function createPost(){  //async se radilo da bi se upravljalo DOM elementom!
    let content = document.querySelector('#postContent').value  //Id od textarea!
    document.querySelector('#postContent').value = '' //Brise sadrzaj posta iz textarea kad se klikne OBJAVI
    let post = new Post
    post.post_content = content
    post = await post.create()

    let current_user = new User()
    current_user = await current_user.get(session_id)

   //Kad se kreira post da se vide i ostali postovi(da ne nestanu ostali postovi!)
   let html = document.querySelector('#allPostsWrapper').innerHTML

    let delete_post_html = '';
    if(session_id === post.user_id){
      delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button> '
    }

    document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                            <div class="post-content">${post.content}</div>
                                                            
                                                            <div class="post-actions">
                                                            <p><b>Autor:</b> ${current_user.username}</p>
                                                            <div>
                                                                <button onclick="likePost(this)" class="likePostJS like-btn"><span> ${post.likes}</span> Likes</button>
                                                                <button onclick="commentPost(this)" class="comment-btn">Comments</button>
                                                                ${delete_post_html}
                                                                </div>
                                                                </div>
                                                            
                                                            <div class="post-comments">
                                                             <form>
                                                               <input placeholder="Napisi komentar..." type="text" />
                                                               <button onclick="commentPostSubmit(event)">Comment</button>
                                                              </form>
                                                              </div>
                                                            </div>
                                                               ` + html;

                                                            
  }

  createPost()
})

async function getAllPosts(){
let all_posts = new Post()
all_posts = await all_posts.allPosts()

all_posts.forEach(post => {

  async function getPostUser(){
    let user = new User()
    user = await user.get(post.user_id)

     let comments = new Comment()
     comments = await comments.get(post.id)
     let comments_html = ''
     if(comments.length > 0){
      comments.forEach( komentar => {
        comments_html += `<div class="single-comment">${komentar.content}</div>`
      })
     }


    let delete_post_html = '';
    if(session_id === post.user_id){
      delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button> '
    }
  //let html = document.querySelector('#allPostsWrapper').innerHTML
  document.querySelector('#allPostsWrapper').innerHTML +=  `<div class="single-post" data-post_id="${post.id}">
  <div class="post-content">${post.content}</div>
  
  <div class="post-actions">
  <p><b>Autor:</b> ${user.username}</p>
  <div>
      <button onclick="likePost(this)" class="likePostJS like-btn"><span> ${post.likes}</span> Likes</button>
      <button onclick="commentPost(this)" class="comment-btn">Comments</button>
      ${delete_post_html}
      </div>
      </div>
  
  <div class="post-comments">
   <form>
     <input placeholder="Napisi komentar..." type="text" />
     <button onclick="commentPostSubmit(event)">Comment</button>
    </form>
    ${comments_html}
    </div>
  </div>
     `// + html

  }
getPostUser()

});
}
getAllPosts()


const commentPostSubmit = e => {
e.preventDefault()
let btn = e.target;   //uzimamo trenutno dugme koje je kliknuto
btn.setAttribute( 'disabled' , 'true');  //Da moze samo jedan da se stavi komentar
let trenutni_post = btn.closest('.single-post') //Uzimamo taj div za selektovanje atributa i ispisa umesto document.qs ide trenutni_post.qS...
let post_id = trenutni_post.getAttribute('data-post_id')  //uzimamo id posta
let comment_value = trenutni_post.querySelector('input').value

trenutni_post.querySelector('input').value = '';

trenutni_post.querySelector('.post-comments').innerHTML += `<div class="single-comment">${comment_value}</div>`        //Za nadovezivanje komentara!Da idu jedan ispod drugog
let comment = new Comment()
comment.content = comment_value
comment.user_id = session_id
comment.post_id = post_id
comment.create()

}

const removeMyPost = el => {

}

const likePost = el => {

}
const commentPost = (btn) => {  //(CLOSEST-Uzimamo njegov parent)
  let main_post_el = btn.closest('.single-post')
  let post_id = main_post_el.getAttribute('data-post_id') 
  main_post_el.querySelector('.post-comments').style.display = 'block';
}