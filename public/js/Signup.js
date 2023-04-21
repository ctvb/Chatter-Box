const mysql = require('mysql');
const connection = msql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pword',
  database: 'chatterbox_db'
})

connection.connect();

connection.query("SELECT * FROM chatterbox",(err,results,fields) => {
  if(err) throw err;

  if(results){
    console.log(results);
    connection.destroy();
  }
})

let profile_image = " "
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const id = document.querySelector('#id-signup').value.trim();
    const user_id = document.querySelector('#user_id-signup').value.trim();
  
    if (id && user_id && username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ id, user_id, username, email, password, profile_image }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/chat');
      } else {
        alert(response.statusText);
      }
    }
  };

  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dov0ohe0b', 
    uploadPreset: 'eihxr5yn'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        profile_image = result.info.secure_url;
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
  
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  