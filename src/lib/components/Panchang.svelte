<script>
    import { dataValue } from "./database";
    import { goto } from '$app/navigation';
    import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
    import { onMount } from 'svelte';
    import { MhahPanchang } from '../../../node_modules/mhah-panchang/src';
    
    var obj = new MhahPanchang();
    let date
    
    $:dateDet = obj.calculate(new Date(date));
    var a=(new Date().toISOString().substring(0,10));
    var b =(new Date().toString().substring(16, 24));
    date= a+"T"+b

// Based current date and time : calculate(date)

// let mhahCal = obj.calendar(
//   new Date('2022-03-15T10:30:28.229Z'),
//   12.972,
//   77.594
// );
// console.log(mhahCal);

    onMount(async () => {
      getDetails();     
	});
  
    var result=[],start, end;
    const getDetails=()=>{
        var days =15;
         start= new Date($dataValue.date);
         end = new Date(start.getTime() + (days * 24 * 60 * 60 * 1000));
        var loop = new Date(start);
        
            
        while(loop <= end){
           var d= loop
          //  console.log(d);
           var mhahObj = obj.calculate(new Date(d));
          //  console.log(mhahObj);
           var r={Date: d.toLocaleDateString("hi-IN"), mhahObj }
          //  console.log(r);
           result=[...result, r];
            loop.setDate(loop.getDate() + 1);
        }
        
    };
    const rtnDate=(x)=>{
      return new Date(x)
    }

    const view=()=>{    
        var el =document.getElementById("showModal");
        el.classList.toggle("hidden")    
        // var el = document.getElementById("panchangStuff");
        // el.classList.toggle("hidden");

        let x= document.getElementById("showBtn").innerText;
        showBtn.innerText= (x=="show") ? "hide" :"show";
        dateDet =(obj.calculate(new Date(date)));
    };


</script>

<div
  class="absolute ml-4 sm:ml-20 rounded-xl py-1 px-3 flex items-center max-w-sm
  shadow1 overflow-hidden z-20"
  style="backdrop-filter: blur(10px); background-color: rgba(255,255,255,0.93);"
  in:fly={{ duration: 250, x: -500, opacity: 0.5, easing: quintOut }}>
    <svg class="h-20 mx-auto flex-shrink z-20" in:fade={{ duration: 150 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.43 194.43"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="sj5dSd"><path d="M53.83,55.85c0,2.56,0,5,0,7.53A10.07,10.07,0,0,0,54,65.11,7.88,7.88,0,0,0,69.59,63.9c0-2.65,0-5.31,0-8h55.14a1.84,1.84,0,0,1,.09,1A76,76,0,0,0,125,65a7.86,7.86,0,0,0,15.63-1c.05-2.69,0-5.38,0-8.05.26-.24.55-.13.82-.13h8.89a9.88,9.88,0,0,1,10.05,10.06q0,42.23,0,84.45a9.86,9.86,0,0,1-10,10H44.18a9.86,9.86,0,0,1-10.1-10.15q0-37.83,0-75.64,0-4.41,0-8.81a9.88,9.88,0,0,1,9.88-10h9.87ZM42,79.55v.56q0,34.83,0,69.66c0,2.2.55,2.73,2.77,2.73H150c1.75,0,2.44-.67,2.44-2.39q0-34.88,0-69.74c0-.27.1-.56-.11-.82Z"/><path d="M65.66,55.9c0,2.66,0,5.31,0,8a3.86,3.86,0,0,1-3.39,3.79,3.91,3.91,0,0,1-4.36-2.88,5.08,5.08,0,0,1-.12-1.23q0-7.72,0-15.44a3.94,3.94,0,1,1,7.88,0C65.67,50.7,65.66,53.3,65.66,55.9Z"/><path d="M128.79,55.84c0-2.57,0-5.15,0-7.72a3.94,3.94,0,1,1,7.87,0V63.61a3.94,3.94,0,1,1-7.87,0C128.78,61,128.79,58.41,128.79,55.84Z"/><path d="M84.38,122.94H77.82a2,2,0,0,1-2.3-2.28q0-4.65,0-9.3a2,2,0,0,1,2.25-2.25q6.6,0,13.21,0a2,2,0,0,1,2.28,2.28c0,3.1,0,6.21,0,9.31A2,2,0,0,1,91,122.94C88.81,123,86.59,122.94,84.38,122.94Z"/><path d="M110,122.94c-2.18,0-4.37,0-6.56,0a2,2,0,0,1-2.25-2.24c0-3.13,0-6.25,0-9.38a2,2,0,0,1,2.21-2.21q6.65,0,13.28,0a2,2,0,0,1,2.28,2.24q0,4.7,0,9.39a2,2,0,0,1-2.23,2.2C114.47,123,112.23,122.94,110,122.94Z"/><path d="M58.73,122.94H52.17a2,2,0,0,1-2.31-2.28c0-3.08,0-6.15,0-9.23a2,2,0,0,1,2.28-2.32c4.43,0,8.86,0,13.29,0a2,2,0,0,1,2.21,2.21q0,4.73,0,9.47a2,2,0,0,1-2.17,2.15C63.21,123,61,122.94,58.73,122.94Z"/><path d="M135.68,122.94h-6.56c-1.56,0-2.31-.73-2.31-2.26v-9.31a2,2,0,0,1,2.24-2.26q6.64,0,13.29,0a2,2,0,0,1,2.24,2.28v9.3a2,2,0,0,1-2.25,2.26C140.11,123,137.9,122.94,135.68,122.94Z"/><path d="M84.4,101.23H77.68a2,2,0,0,1-2.16-2.16c0-3.18,0-6.37,0-9.55a2,2,0,0,1,2.06-2.1q6.81,0,13.62,0a1.91,1.91,0,0,1,2.06,2.08q0,4.78,0,9.55a1.93,1.93,0,0,1-2.2,2.18Z"/><path d="M135.68,101.23H129a2,2,0,0,1-2.22-2.17V89.59A2,2,0,0,1,129,87.42q6.72,0,13.46,0a2,2,0,0,1,2.15,2.18c0,3.16,0,6.32,0,9.47a2,2,0,0,1-2.17,2.16Z"/><path d="M84.44,130.82h6.65A2,2,0,0,1,93.26,133q0,4.68,0,9.38a2,2,0,0,1-2.18,2.22q-6.72,0-13.45,0a2,2,0,0,1-2.11-2.06c0-3.24,0-6.48,0-9.72a1.94,1.94,0,0,1,2.11-2.05h6.81Z"/><path d="M110,101.23h-6.64A2,2,0,0,1,101.17,99c0-3.16,0-6.31,0-9.47a2,2,0,0,1,2.17-2.15q6.69,0,13.37,0a2,2,0,0,1,2.23,2.2q0,4.69,0,9.38a2,2,0,0,1-2.27,2.23Z"/><path d="M58.74,144.64c-2.19,0-4.37,0-6.56,0a2.06,2.06,0,0,1-2.33-2.36v-9.13a2.06,2.06,0,0,1,2.35-2.34H65.33a2,2,0,0,1,2.3,2.27q0,4.66,0,9.31a2,2,0,0,1-2.24,2.25C63.17,144.65,61,144.64,58.74,144.64Z"/><path d="M110.1,130.81h6.56A2,2,0,0,1,119,133q0,4.69,0,9.39a2,2,0,0,1-2.22,2.21c-4.46,0-8.92,0-13.37,0a2,2,0,0,1-2.18-2.15c0-3.16,0-6.31,0-9.47a2,2,0,0,1,2.2-2.21Z"/></g></g></g></svg>
<!-- 			
  <img
    class="w-1/2 mx-auto flex-shrink z-20"
    alt="grow with aryan logo"
    src="gwa-sm.svg"
    in:fade={{ duration: 150 }} /> -->
  <p
    class=" text-center text-gray-500 font-semibold text-xl mx-8 z-20"
    in:fade={{ duration: 150 }}>
    Panchang
  </p>
</div>

<div class="relative container mx-auto w-full md:w-5/6 pb-4 rounded-2xl pt-28 mt-12">
  

  <div
      class="relative border border-gray-300 rounded-md rounded-t-none md:px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <label
        for="date-title"
        class="block w-full text-xs font-medium text-gray-700"
        >Get a panchang at specific date and time</label
      >
      <input
        type="datetime-local"
        name="date-title"
        id="date-title"
        class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        bind:value={date}
      />
    </div>
    <div id="showModal" class="fixed z-30 hidden inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-xl w-full sm:p-6">
          <div class="block absolute top-0 right-0 pt-4 pr-4">
            <button type="button" on:click={view} class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Close</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div>
            <div class="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 pb-3" id="modal-title">Panchang for {new Date(date).toLocaleDateString("hi-IN")}</h3>
              <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Day</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dateDet.Day.name_en_UK}</dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Paksha</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dateDet.Paksha.name_en_IN}</dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Rashi</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dateDet.Raasi.name_en_UK}</dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Tithi</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Tithi Name:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {dateDet.Tithi.name_en_IN} </span>
                          </div>
                        </li>
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Tithi Start:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Tithi.start).toLocaleDateString("hi-IN")}, {new Date(dateDet.Tithi.start).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Tithi End:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Tithi.end).toLocaleDateString("hi-IN")}, {new Date(dateDet.Tithi.end).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Karana</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Karana Name:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {dateDet.Karna.name_en_IN} </span>
                          </div>
                        </li>
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Karana Start:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Karna.start).toLocaleDateString("hi-IN")}, {new Date(dateDet.Karna.start).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Karana End:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Karna.end).toLocaleDateString("hi-IN")}, {new Date(dateDet.Karna.end).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Nakshatra</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Nakshatra Name:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {dateDet.Nakshatra.name_en_IN} </span>
                          </div>
                        </li>
                        <li class="pl-3 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Nakshatra Start:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Nakshatra.start).toLocaleDateString("hi-IN")}, {new Date(dateDet.Nakshatra.start).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Nakshatra End:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Nakshatra.end).toLocaleDateString("hi-IN")}, {new Date(dateDet.Nakshatra.end).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-10 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Yoga</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Yoga Name:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {dateDet.Yoga.name_en_IN} </span>
                          </div>
                        </li>
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Yoga Start:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Yoga.start).toLocaleDateString("hi-IN")}, {new Date(dateDet.Yoga.start).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                            <dt class="text-sm font-medium text-gray-500">Yoga End:</dt>
                            <span class="ml-2 flex-1 w-0 truncate"> {new Date(dateDet.Yoga.end).toLocaleDateString("hi-IN")}, {new Date(dateDet.Yoga.end).toLocaleTimeString("hi-IN")} </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-center mt-2">
      <button id="showBtn" on:click={view} class="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300">show</button>
    </div>

<p class="font-semibold text-lg mt-4">Panchang Details 15 days from {new Date(start).toLocaleDateString("hi-IN")} to {new Date(end).toLocaleDateString("hi-IN")}</p>
  <div class="mb-28">
    <div class="flex justify-center items-center">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="border-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" rowspan="2">Date</th>
                    <th scope="col" class="border-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" rowspan="2">Day</th>
                    <th scope="col" class="border-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" rowspan="2">Paksha</th>
                    <th scope="col" class="border-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" rowspan="2">Raashi</th>
                    <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="3">Tithi</th>
                    <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="3">Karana</th>
                    <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="3">Nakshatra</th>
                    <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="3">Yog</th>
                  </tr>
                  <tr>
                  {#each {length: 4} as _, i}
                  <td class="border-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Name</td>
                  <td class="border-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Start</td>
                  <td class="border-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">End</td>
                  {/each}
                
              </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each result as res, i}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.Date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Day.name_en_UK}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Paksha.name_en_IN}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Raasi.name_en_UK}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Tithi.name_en_IN}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Tithi.start).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Tithi.start).toLocaleTimeString("hi-IN")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Tithi.end).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Tithi.end).toLocaleTimeString("hi-IN")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Karna.name_en_IN}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Karna.start).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Karna.start).toLocaleTimeString("hi-IN")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Karna.end).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Karna.end).toLocaleTimeString("hi-IN")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Nakshatra.name_en_IN}r</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Nakshatra.start).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Nakshatra.start).toLocaleTimeString("hi-IN")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Nakshatra.end).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Nakshatra.end).toLocaleTimeString("hi-IN")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Yoga.name_en_IN}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Yoga.start).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Yoga.start).toLocaleTimeString("hi-IN")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rtnDate(res.mhahObj.Yoga.end).toLocaleDateString("hi-IN")} ,{ rtnDate(res.mhahObj.Yoga.end).toLocaleTimeString("hi-IN")}</td>
                    <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.x.sunrise}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.x.vedic_sunrise}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.x.sunset}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.x.vedic_sunset}</td> -->
                  </tr>
                  {/each}
                  <!-- More people... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
</div>
</div>

<style>
  .shadow1 {
    box-shadow: 0px 7px 20px rgba(124, 124, 124, 0.173);
  }
</style>
