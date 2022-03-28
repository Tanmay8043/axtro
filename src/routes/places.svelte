<script>
    import axios from "axios";
    import { placeValue } from './stores.js';
    import { onMount } from 'svelte';
    
  export let onClose

  onMount(async () => {
        document.getElementById("myPlace").focus();    
	});

 let place;
 let params = {
        access_key: '097d0b0b7ad2ebd8d53e0a10bbed1902',
        query: place
    }
    let places = [];
    let latitude=[];
    let longitude=[];
    const getCoords=()=>{
        params = {
        access_key: '097d0b0b7ad2ebd8d53e0a10bbed1902',
        query: place
        };
        axios.get('http://api.positionstack.com/v1/forward', {params})
        .then(response => {
            for (let index = 0; index < response.data.data.length; index++) {
                let city=response.data.data[index].locality;
                let state=response.data.data[index].region;
                let country=response.data.data[index].country;
                let county=response.data.data[index].county;
                latitude[index] = response.data.data[index].latitude;
                longitude[index] = response.data.data[index].longitude;
                places[index] = city+", "+state+", "+country+" ("+county+")";
            }
        }).catch(error => {
            console.log(error);
        });
    }
    
    const setPlace=(place)=>{
        let i =places.indexOf(place);
        let placeData={
            name: places[i],
            latitude: latitude[i],
            longitude: longitude[i]
        };
        placeValue.set(placeData);
       
        document.getElementById("myPlace").value= place;
    }

       
</script>
<div class="container absolute z-10 bg-gray-100 inset-0">
    <div class="flex justify-center mt-2 mx-auto">
        <input type="text" id="myPlace" bind:value={place} class="block px-4 w-4/5" autocomplete="off" />
        <button on:click|preventDefault={getCoords} class="bg-gray-300 rounded-lg px-4 py-2 ml-2" >Get Coords</button>
    </div>
    
    {#each places as place}
        <div class="w-full border-2 py-2 " on:click={setPlace(place)} on:click={onClose}>            
            <p>{place}</p>
        </div>
    {/each}
    
</div>