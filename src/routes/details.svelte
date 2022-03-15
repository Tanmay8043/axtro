<script>
    import { dataValue } from "./stores";
    import { goto } from '$app/navigation';
    import axios from "axios";
    import { onMount } from 'svelte';
    import { MhahPanchang } from '../../node_modules/mhah-panchang/src';
    import {returnAllPlanets} from "../blastro"
    
    var obj = new MhahPanchang();
    var obs = {
    day: 14,                //integer
    dst: false,             //daylight savings time, boolean
    hours: 6,               //integer
    latitude: "42:43:38",   //string in this format
    longitude: "82:43:00",  //string in this format
    minutes: 50,            //integer
    month: 11,              //integer
    name: "Location",       //string
    seconds: 0,             //integer
    tz: 0,                  //timezone correction from GMT
    year: 2014              //integer
  };

  console.log(returnAllPlanets(obs));

// Based current date and time : calculate(date)

// let mhahCal = obj.calendar(
//   new Date('2022-03-15T10:30:28.229Z'),
//   12.972,
//   77.594
// );
// console.log(mhahCal);

    let user;
    onMount(async () => {
        user =$dataValue;
        getDetails();     
	});

    const changeDate=(dt)=>{
        var dd = String(dt.getDate()).padStart(2, '0');
        var mm = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dt.getFullYear();
        return dd+'/'+mm+'/'+yyyy;
    }

    var result=[];
    const getDetails=()=>{
        var details={};
        
        var days =15;
        var start= new Date();
        var end = new Date(start.getTime() + (days * 24 * 60 * 60 * 1000));
        var loop = new Date(start);
        
            
        while(loop <= end){
           var d= loop
          //  console.log(d);
           var mhahObj = obj.calculate(new Date(d));
          //  console.log(mhahObj);
           var r={Date: d.toLocaleDateString("hi-IN"), mhahObj }
          //  console.log(r);
           result=[...result, r];
           console.log(result);
          //  details={d, mhahObj };
          //  console.log(details)
          //  details={date: d}
          //   axios.request({
          //       method: 'POST',
          //       url: 'https://vedicrishi-horoscope-matching-v1.p.rapidapi.com/basic_panchang/',
          //       headers: {
          //           'content-type': 'application/json',
          //           'x-rapidapi-host': 'vedicrishi-horoscope-matching-v1.p.rapidapi.com',
          //           'x-rapidapi-key': 'a6bbe4a908mshd9e35dd6348adcfp1f289ajsn1e08492bea1d'
          //       },
          //       data: {
          //           day: loop.getDate().toString(),
          //           month: loop.getMonth().toString(),
          //           year: loop.getFullYear().toString(),
          //           hour: user.hours.toString(),
          //           min: user.minutes.toString(),
          //           lat: user.place.latitude.toString(),
          //           lon: user.place.longitude.toString(),
          //           tzone: user.zone.toString(),
          //           gender: user.gender.toString()
          //       }
          //   }).then(function (response) {
          //       console.log(loop);
          //       var x= response.data
          //       details={...details, x}
                
          //       result=[...result, details];
          //       console.log(result);
                
          //   }).catch(function (error) {
          //       console.error(error);
          //   });
            
            loop.setDate(loop.getDate() + 1);
        }
        
    };
</script>

<div>
    <div class="flex justify-center mt-12">
        <button class="bg-orange-200 text-lg font-bold px-4 py-2 rounded-xl shadow-xl hover:bg-orange-300 hover:shadow-2xl" on:click={()=>{goto("http://localhost:3000/")}}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="inline-block pb-1" src="https://img.icons8.com/fluency-systems-filled/20/000000/home.png"/>
            Home
        </button>
    </div>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tithi</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Karan</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nakshatra</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yog</th>
                    <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sunrise</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vedic Sunrise</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sunset</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vedic Sunset</th> -->
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each result as res, i}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.Date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Day.name_en_UK}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Tithi.name_en_IN}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Karna.name_en_IN}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Nakshatra.name_en_IN}r</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.mhahObj.Yoga.name_en_IN}</td>
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