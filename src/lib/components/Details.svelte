<script>
  import {auth, db} from "$lib/firebase"
  import { session } from "$app/stores";
  import {doc, collection, updateDoc, addDoc, getDoc } from "firebase/firestore";
  import Places from "./Places.svelte";
  import { placeValue, showstore } from "./database.js";
  import { dataValue } from "./database";

  console.log($dataValue);
  showstore.set($dataValue.id)

    let date, name, place, longitude, latitude;
    var a=(new Date().toISOString().substring(0,10));
    var b =(new Date().toString().substring(16, 24));
    if(date==undefined){
      date= a+"T"+b
    }
    export let onClose, func

    var btnText="Submit"

    if(func==="show"){
      btnText="Update"
      date =$dataValue.date, name=$dataValue.name, place=$dataValue.place.place, longitude= $dataValue.place.longitude, latitude= $dataValue.place.latitude; 
    }else{
      place=$placeValue.place, longitude= $placeValue.longitude, latitude= $placeValue.latitude; 
    }

    console.log(func);

  const handleSubmit =async () => {
    var data={
        name, 
        place : {
          place, 
          latitude, 
          longitude
        }, 
        date
    };
    if(func=="add"){
      try {
        await addDoc(collection(db, "/users", $session.user.phone_number.toString(),"peoples/"), {
          name, 
          place : {
          place, 
          latitude, 
          longitude
        }, 
          date,
          time: new Date(),
        })
          .then(function (dref) {
            updateDoc(doc(db, "/users/",$session.user.phone_number.toString(),"peoples/",dref.id), {
              id: dref.id
          });
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      };
    }else{
      var ref = doc(db, "/users/",$session.user.phone_number.toString(),"peoples/",$dataValue.id);
      await updateDoc(ref, data).then(function(){
        getDoc(ref).then(function(result){
          dataValue.set(result.data())
        });;
        
      })
      console.log($dataValue);
    }
    location.reload()
    
  };

  let showPlaces = false;
  const onKeyDown=(e)=>{
    if(e.keyCode == 27){
      onClose();
    }
  }
</script>

<div
  class="relative inset-0 z-10 h-screen md:h-auto md:mt-12 md:container mx-auto w-full md:w-4/5 xl:w-2/5 pb-4 md:shadow-lg rounded-2xl " 
>
  <div>
    {#if func==='add'}
      <div class="flex justify-center pt-16">
        <h1 class="font-bold text-4xl text-yellow-300">Add a person</h1>
      </div>
      <div class="flex justify-center mt-2 mb-4">
        <p class="px-12 text-md text-gray-500">
          Add the birth details of a person.
        </p>
      </div>
    {:else}
      <div class="flex justify-center pt-16 mb-8">
        <h1 class="font-bold text-3xl text-yellow-300">Show / Edit Details</h1>
      </div>
    {/if}
    
  </div>

  <div class="isolate -space-y-px rounded-md pt-8 px-16">
    <div
      class="relative border border-b-0 border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <label for="name" class="block text-xs font-medium text-gray-700"
        >Name</label
      >
      <input
        type="text"
        name="name"
        id="name"
        class="block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm w-full"
        placeholder="Jane Doe"
        bind:value={name}
      />
    </div>
    <div
      class="relative border border-b-0 border-gray-300  px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <label
        for="date-title"
        class="block w-full text-xs font-medium text-gray-700"
        >Choose Date and time of Birth</label
      >
      <input
        type="datetime-local"
        name="date-title"
        id="date-title"
        class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        bind:value={date}
      />
    </div>
    <div
      class="relative border border-b-0 border-gray-300 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <label
        for="place-title"
        class="block w-full text-xs font-medium text-gray-700">Place</label
      >
      <input
        type="text"
        name="place-title"
        id="place-title"
        class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm "
        placeholder="Jaipur, Rajasthan"
        bind:value={place}
        autocomplete="off"
        on:click={() => (showPlaces = true)}
      />
    </div>
    <div
      class="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <label for="coords" class="block text-xs font-medium text-gray-700"
        >Or Manually enter latitude and longitude</label
      >
      <div class="flex">
        <input
        type="number"
        name="name"
        id="coords"
        class=" inline-flex border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm mr-2 w-full"
        placeholder="Latitude" 
        autocomplete="off"
        bind:value={latitude}
      />
      <input
        type="number"
        name="name"
        id="coords"
        class=" inline-flex border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm w-full"
        placeholder="Longitude"
        autocomplete="off"
        bind:value={longitude}
      />
      </div>
      
    </div>
  </div>

  <div class="pb-8 mt-8 ">
    <!-- svelte-ignore a11y-label-has-associated-control -->

    <div class="mt-4 flex justify-center">
      <button
        class="rounded-lg px-4 py-2 border-2 border-yellow-400 text-gray-600 font-semibold hover:bg-yellow-300  duration-300"
        on:click|preventDefault={handleSubmit} on:click={onClose}
      >
        {btnText}
      </button>
    </div>
    {#if showPlaces}
      <Places onClose={() => (showPlaces = false)} />
    {/if}
  </div>
</div>
<svelte:window on:keydown={onKeyDown} />
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