let profile_image = "test.jpg"
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstname = document.querySelector('#first-name-signup').value.trim();
    // const last_name = document.querySelector('#last-name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if ( firstname && username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstname, username, email, password, profile_image }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/chat');
      } else {
        alert(response.statusText);
      }
    }
  };

  // var myWidget = cloudinary.createUploadWidget({
  //   cloudName: 'dov0ohe0b', 
  //   uploadPreset: 'eihxr5yn'}, (error, result) => { 
  //     if (!error && result && result.event === "success") { 
  //       console.log('Done! Here is the image info: ', result.info); 
  //       profile_image = result.info.secure_url;
  //     }
  //   }
  // )
  
  // document.getElementById("upload_widget").addEventListener("click", function(){
  //     myWidget.open();
  //   }, false);
  
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  