
                import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
                import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js';
                import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
                import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
 
               
        
                // TODO: Add SDKs for Firebase products that you want to use
                // https://firebase.google.com/docs/web/setup#available-libraries
              
                // Your web app's Firebase configuration
                const firebaseConfig = {
            apiKey: "AIzaSyA8uTR9S1zLL0GD9LAXyPlepK7X_X_L9WI",
            authDomain: "busnify-572c0.firebaseapp.com",
            projectId: "busnify-572c0",
            storageBucket: "busnify-572c0.appspot.com",
            messagingSenderId: "971089173143",
            appId: "1:971089173143:web:ac020a79e222b756fae7d2",
            measurementId: "G-CNB0QSQF92"
          };
              
                // Initialize Firebase
                const app = initializeApp(firebaseConfig);
 
 
                const auth = getAuth();
                var notLoggedIn = document.getElementById('not-logged-in');
                var loggedIn = document.getElementById('logged-in');
 
                 onAuthStateChanged(auth, (user) => {
                 if (user) {
                     // User is signed in, see docs for a list of available properties
                     // https://firebase.google.com/docs/reference/js/firebase.User
                     const uid = user.uid;
                     loggedIn.style.display="block"
                     notLoggedIn.style.display ="none"
 
                     // ...
                 } else {
                     // User is signed out
                     // ...
                     loggedIn.style.display="none"
                     notLoggedIn.style.display ="block"
                 }
                 });
 
 
                 function signup(){
                     var email = document.getElementById('username-input').value
                     var password = document.getElementById('password-input').value
                     createUserWithEmailAndPassword(auth, email, password)
                         .then(function(val) {
                             //Success!!
                             console.log(val);
                         })
                         .catch(function(error) {
                         // Handle Errors here.
                         var errorCode = error.code;
                         var errorMessage = error.message;
                         if (errorCode == 'auth/weak-password') {
                             alert('The password is too weak.');
                         } else {
                             alert(errorMessage);
                         }
                         console.log(error);
                     });
 
                 }
 
 
                 function login(){
                     var email = document.getElementById('username-input').value
                     var password = document.getElementById('password-input').value
                     signInWithEmailAndPassword(auth, email, password)
                         .then((userCredential) => {
                             // Signed in 
                             const user = userCredential.user;
                             if((user)){
                                 alert("welcome back you are now signed in!")
                             }
 
                             // ...
                         })
                         .catch((error) => {
                             const errorCode = error.code;
                             const errorMessage = error.message;
                             console.log("error",error.message)
                             alert(error.message)
                         });
                 }
 
                 function logout(){
                     signOut(auth).then(() => {
                     // Sign-out successful.
 
                     }).catch((error) => {
                     // An error happened.
                     console.log("error",error.message)
                     alert(error.message)
                     });      
                     
                 }
 
 
 
 
                 var logoutBtn = document.getElementById("logout-btn");
 
                 logoutBtn.addEventListener("click", function() {
                    logout()
                });  
                
                
 
 
 
        /////////////////////////////////////////////////////////////////////////
                async function writeUserData(userId, name, email, imageUrl){
        
        
                    // Initialize Cloud Firestore and get a reference to the service
                    const db = getFirestore(app);
                    // Add a new document in collection "cities"
                    try {
                        const docRef = await addDoc(collection(db, "mee"), {
                            first: userId,
                            last: name,
                            born: 1815
                        });
                        console.log("Document written with ID: ", docRef.id);
                        } catch (e) {
                        console.error("Error adding document: ", e);
                        }
                    /*
                    const db = getDatabase();
                    const reference = ref(db,'users/' + userId);
        
                    set(reference, {
                        username: name,
                        email: email,
                        profile_picture: imageUrl
        
                    });
        */
                    console.log("Init")
                    
                }
        
                function typepressed(){
                    console.log('pressed')
                }
 
                var form = document.getElementById("myForm");
                function handleForm(event) { 
                 event.preventDefault(); 
                 login()
             } 
                form.addEventListener('submit', handleForm);
            
                var submitBtn = document.getElementById("submit-log-in");
                var username = document.getElementById("username-input");
                var password = document.getElementById("password-input");
 
 
 
                submitBtn.addEventListener("click", function() {
                    writeUserData(username.value, password.value, 'abood@gmail.com', 'abood.caimg');
                }); 
 
 
 /////////////////////////////////////////////////////////////////
 