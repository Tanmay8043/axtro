<script>
    import { auth,db } from "$lib/firebase";
    import { session } from "$app/stores";
    import {
      signInWithPhoneNumber, RecaptchaVerifier,
        getIdToken,
    } from "firebase/auth";
    import {doc, collection, setDoc, addDoc } from "firebase/firestore";
    import { request } from "$lib/fetch.js"
    import {onMount} from 'svelte'

    onMount(async()=>{
    render();
  })
  let phone ,otp, coderes
  function render(){
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    console.log(response);
  }}, auth);
    recaptchaVerifier.render()

  }
  console.log($session);

const send=async()=>{
    const appVerifier = window.recaptchaVerifier;
    let x="+91"+ phone
    const userCred = signInWithPhoneNumber(auth, x, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      coderes = confirmationResult;
      document.getElementById("otpDiv").classList.remove("invisible")
      document.getElementById("phone").value=phone
      // ...
    }).catch((error) => {
      console.log(error.message);
    });
    
}

const verify=async()=>{
  document.getElementById("otpDiv").classList.add("invisible")
  coderes.confirm(otp).then((result) => {
    // User signed in successfully.
    const idToken = result._tokenResponse.idToken;
    request("/auth", "POST", { idToken });
  document.getElementById("verifyDiv").classList.remove("invisible")
    var btn =document.getElementById("submit")
    btn.classList.remove("cursor-not-allowed")
    btn.disabled=false
  const user = result.user;
  try {
    setDoc(doc(db, "users/", user.phoneNumber), {
        uid: user.uid,
        phone: user.phoneNumber
    });
  } 
  catch (e) {
    console.error("Error adding document: ", e);
  }
  // ...
}).catch((error) => {
  alert(error.message)
});
}

const handleSubmit = () => {
  location.reload();

};
</script>

<div class="">
  <h3 class="text-5xl font-semibold py-10 text-gray-600">Login</h3>
	  <form class="w-full">
      <div class="w-full flex justify-center" id ="recaptcha-container"></div>
        <div class="">
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 ">Enter Your Contact No. :</label>
          <div class="grid grid-cols-4">
            <input type="number" id="phone" bind:value={phone} class="w-full col-span-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " placeholder="Your Contact No.">
            <button on:click|preventDefault={send} class="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto md:px-1 lg:px-3 py-2.5 text-center">Get OTP</button>
          </div> 
      </div>
      <div id="otpDiv" class="w-full invisible bg-green-100 px-2 py-0.5 flex items-center"><svg class="h-4 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg><p class="text-gray-600 pb-1 text-sm font-medium">Message sent</p></div>
      <div class="">
        <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 ">Verify your contact No. :</label>
        <div class="grid grid-cols-4">
          <input type="number" id="otp" bind:value={otp} class="w-full col-span-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " placeholder="Verification OTP">
          <button on:click|preventDefault={verify} class="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center">Verify</button>
        </div>                
      </div>
      <div id="verifyDiv" class="w-full invisible bg-green-100 px-2 py-0.5 flex items-center"><svg class="h-4 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg><p class="text-gray-600 pb-1 text-sm font-medium">Contact no. verifed.</p></div>
      <div class="flex mt-2 justify-center">
        <button id="submit" on:click|preventDefault={handleSubmit} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-not-allowed" disabled>Submit</button>
      </div>
     </form>
	</div>

<style>
    input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>