 <script>
    import { dataValue } from "./stores";
    import { goto } from '$app/navigation';
    import axios from "axios";
    import { onMount } from 'svelte';
    import { MhahPanchang } from '../../node_modules/mhah-panchang/src';
    import {returnAllPlanets} from "../blastro"
    import Details from "$lib/components/Details.svelte"
    
    var obj = new MhahPanchang();
    
  // function convertDMS( lat, lng ) {
 
  // var convertLat = Math.abs(lat);
  // var LatDeg = Math.floor(convertLat);
  // var LatMin = (Math.floor((convertLat - LatDeg) * 60));
  // var LatCardinal = ((lat > 0) ? "n" : "s");
    
  // var convertLng = Math.abs(lng);
  // var LngDeg = Math.floor(convertLng);
  // var LngMin = (Math.floor((convertLng - LngDeg) * 60));
  // var LngCardinal = ((lng > 0) ? "e" : "w");
    
  // return LatDeg + LatCardinal + LatMin  + "<br />" + LngDeg + LngCardinal + LngMin;
  // }
  function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return {degrees, minutes ,seconds};
}

console.log(toDegreesMinutesAndSeconds(26.894094));

function convertDMS(lat, lng) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    return {latitude, latitudeCardinal, longitude, longitudeCardinal};
}


  // 

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
        console.log(user);
        getDetails();     
	});
  console.log(convertDMS($dataValue.place.latitude, $dataValue.place.longitude));
  var lat= toDegreesMinutesAndSeconds($dataValue.place.latitude);
  var latitude= lat.degrees+":"+lat.minutes+":"+lat.seconds;
  console.log(latitude);
  var long= toDegreesMinutesAndSeconds($dataValue.place.longitude);
  var longitude= long.degrees+":"+long.minutes+":"+long.seconds;
  console.log(longitude);
  var obs = {
    day: parseInt($dataValue.day),                //integer
    dst: false,             //daylight savings time, boolean
    hours: parseInt($dataValue.hours),               //integer
    latitude: latitude.toString(),   //string in this format
    longitude: longitude.toString(),  //string in this format
    minutes: parseInt($dataValue.minutes),            //integer
    month: parseInt($dataValue.month),              //integer
    name: "Location",       //string
    seconds: 0,             //integer
    tz: 5.5,                  //timezone correction from GMT
    year: parseInt($dataValue.year)              //integer
  };
  console.log(returnAllPlanets(obs));
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