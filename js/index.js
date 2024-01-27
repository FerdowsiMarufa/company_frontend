function createUser(event) {
    event.preventDefault();

  
    let name = document.getElementById("userName").value;
   
    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;

    let user = {
      Name : name,
      Email : email,
      Password: password,
    };
    console.log("user", user)
  
    // Make a POST request to the login endpoint
    fetch("https://localhost:7191/api/User/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user) 
     
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log(" create data ", data);
        // console.log("Encrypted User Code:", data.encryptedUserCode);
        // window.location.href = "./home.html";  
        // localStorage.setItem("userCode", userCode);
        // localStorage.loginTime = Date.now();   
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Login Failed! Invalid Username or Password!");
       // localStorage.removeItem("loginTime");
      });
  }
  function createACT()
  {
    console.log(" clicked");
    displayNone(".login-title");
    displayNone(".createACT-text");
    displayNone(".login-button");
    display(".Registration-title");
    display(".userEmail");
    display(".haveACT-text");
    display(".create-button");
  }
  function haveACT(){
    display(".login-title");
    display(".createACT-text");
    display(".login-button");
    displayNone(".Registration-title");
    displayNone(".userEmail");
    displayNone(".haveACT-text");
    displayNone(".create-button");
  
  }
  function displayNone( ClassName){
    let className = document.querySelector(ClassName);
    if (className) {
      className.classList.add('d-none');
    }
  }
  function display(ClassName)
  {
    let className = document.querySelector(ClassName)
    if (className) {
      className.classList.remove('d-none');
    }
  }


  // if (localStorage.getItem("loginTime")) {
  //   window.location.href = "home.html"; // Redirect to login page
  // }
  
  document.getElementById("CreateClick").addEventListener("click", createUser);
  document.getElementById("loginClick").addEventListener("click", login);
  
  function login(event){
  event.preventDefault();
  let name = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  let user = {
    Name : name,
   
    Password: password,
  };
  console.log("user", user)

  // Make a POST request to the login endpoint
  fetch("https://localhost:7191/api/User/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user) 
   
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(" login data ", data);
      let userData = data;
      localStorage.setItem("userId" ,userData.id )
        // Show the modal after successful login
       document.querySelector("#modalButton").addEventListener("click", modalshow())
      // console.log("Encrypted User Code:", data.encryptedUserCode);
      // window.location.href = "./home.html";  
      // localStorage.setItem("userCode", userCode);
      // localStorage.loginTime = Date.now();   
    })
    .catch((error) => {
      console.error("Error:", error);
     // alert("Login Failed! Invalid Username or Password!");
     // localStorage.removeItem("loginTime");
    });
}
 
  function modalshow(){
    console.log(" button clicked")
  }

  function modalSubmit(){
    let UserId = localStorage.getItem("userId")
    let OTP = document.getElementById("userOtp").value;
    let otpVerificationDto = {
      UserId : UserId,
     
      OTP: OTP,
    };
    console.log(" otpVerificationDto",otpVerificationDto)
      // Make a POST request to the login endpoint
  fetch("https://localhost:7191/api/User/checkotp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(otpVerificationDto) 
   
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("wrong otp");
      }
      return response.json();
    })
    .then((data) => {
      console.log(" valid otp ", data);
     
    })
    .catch((error) => {
      console.error("Error:", error);
     // alert("Login Failed! Invalid Username or Password!");
     // localStorage.removeItem("loginTime");
    });

  }
