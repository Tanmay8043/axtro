<script>
  import Places from "./Places.svelte";
  import { placeValue } from "./database.js";
  import { dataValue } from "./database";
    let date, name, place=$placeValue.place, longitude= $placeValue.longitude, latitude= $placeValue.latitude;
    var a=(new Date().toISOString().substring(0,10));
    var b =(new Date().toString().substring(16, 24));
    date= a+"T"+b
//   let time = new Date();
//   let options;
  // let zone= time.toString().match(/([-\+][0-9]+)\s/)[1];   ------ return +0530
//   var offset = time.getTimezoneOffset();
  //  var o = Math.abs(offset);
  // let zone =(offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2); // return +05:30
//   let zone = offset / -60; //return 5.5
  const handleSubmit = () => {
    console.log($placeValue);
    
    console.log(date);
      var data={
          name, 
          place : $placeValue, 
          date
      };
      console.log(data);

    dataValue.set(data);
    console.log($dataValue);
  };

  let showPlaces = false;
</script>

<div
  class="relative h-screen md:h-auto md:mt-12 md:container bg-gray-50 mx-auto w-full md:w-4/5 xl:w-2/5 pb-4 md:shadow-lg rounded-2xl "
>
  <div>
    <div class="flex justify-center pt-16">
      <h1 class="font-bold text-4xl text-yellow-500">Kundli</h1>
    </div>
    <div class="flex justify-center mt-2 mb-4">
      <p class="px-12 text-md text-gray-500">
        Generate your kundli with us by filling all the information needed.
      </p>
    </div>
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
        class="block border-0 p-0 bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm w-full"
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
        >Choose your Date and time of Birth</label
      >
      <input
        type="datetime-local"
        name="date-title"
        id="date-title"
        class="block w-full border-0 p-0 bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
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
        class="block w-full border-0 p-0 bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm "
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
        class=" inline-flex border-0 p-0 bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm mr-2 w-full"
        placeholder="Latitude" 
        autocomplete="off"
        bind:value={latitude}
      />
      <input
        type="number"
        name="name"
        id="coords"
        class=" inline-flex border-0 p-0 bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm w-full"
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
        class="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
        on:click|preventDefault={handleSubmit}
      >
        Submit
      </button>
    </div>
    {#if showPlaces}
      <Places onClose={() => (showPlaces = false)} />
    {/if}
  </div>
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