<script>
    import { dataValue } from "./database";
    import { goto } from '$app/navigation';
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
  
    var result=[], end;
    const getDetails=()=>{
        var days =15;
        var start= new Date();
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

<div class="relative container mx-auto w-full md:w-5/6 pb-4 rounded-2xl mt-12">
  
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
    <div id="showModal" class="fixed z-10 hidden inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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

<p class="font-semibold text-lg mt-4">Panchang Details 15 days from {new Date().toLocaleDateString("hi-IN")} to {new Date(end).toLocaleDateString("hi-IN")}</p>
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

