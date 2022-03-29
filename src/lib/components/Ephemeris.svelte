<script>
    import { returnAllPlanets } from "../../blastro";
    import { dataValue } from "./database";
    import { onMount } from 'svelte';
    var result=[];
    onMount(async()=>{
      if($dataValue){
        function toDegreesMinutesAndSeconds(coordinate) {
      var absolute = Math.abs(coordinate);
      var degrees = Math.floor(absolute);
      var minutesNotTruncated = (absolute - degrees) * 60;
      var minutes = Math.floor(minutesNotTruncated);
      var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  
      return {degrees, minutes ,seconds};
    }

    var lat = toDegreesMinutesAndSeconds($dataValue.place.latitude);
    var latitude = lat.degrees + ":" + lat.minutes + ":" + lat.seconds;
    
    var long = toDegreesMinutesAndSeconds($dataValue.place.longitude);
    var longitude = long.degrees + ":" + long.minutes + ":" + long.seconds;
    

    var date= new Date($dataValue.date)
    var days = 15;
    var start = new Date();
    var end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
    var loop = new Date(start);
  
 
    while (loop <= end) {
        let d = loop
        let obs = {
            day: parseInt(loop.getDate()), //integer
            dst: false, //daylight savings time, boolean
            hours: parseInt(date.getHours()), //integer
            latitude: latitude.toString(), //string in this format
            longitude: longitude.toString(), //string in this format
            minutes: parseInt(date.getMinutes()), //integer
            month: parseInt(loop.getMonth()+1), //integer
            name: "Location", //string
            seconds: 0, //integer
            tz: 5.5, //timezone correction from GMT
            year: parseInt(loop.getFullYear()), //integer
        };
      let res= {Date: d.toLocaleDateString("hi-IN"), data: returnAllPlanets(obs).coords}
      result=[...result, res];
      loop.setDate(loop.getDate() + 1);
    }
      }
    })

  </script>
  <div class="relative container mx-auto w-full  md:w-5/6 pb-4 rounded-2xl mt-12">
{#if $dataValue}
<div class="flex flex-col mb-28">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="border-2 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center" rowspan="2">Date</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Sun</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Moon</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Mercury</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Venus</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Mars</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Jupiter</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Saturn</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Uranus</th>
                <th scope="col" class="border-2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colspan="4">Neptune</th>
              </tr>
              <tr>
                  {#each {length: 9} as _, i}
                  <td class="border-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">right Ascension</td>
                  <td class="border-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Declination</td>
                  <td class="border-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">dist</td>
                  <td class="border-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">elong</td>
                  {/each}
                
              </tr>
              
              
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                
                {#each result as res, i}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.Date}</td>
                {#each res.data as data}
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.rightAscension}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.declination}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.dist}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.elong}</td>
                {/each}
                    
              </tr>
              {/each}
              <!-- More people... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
{:else}
<div class="bg-yellow-50 border-l-4 mt-12 border-yellow-400 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <!-- Heroicon name: solid/exclamation -->
      <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm text-yellow-700">
        Please fill up the form first!!!
        </p>
    </div>
  </div>
</div>

  {/if}
  </div>