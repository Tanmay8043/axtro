<script>
    import { placeValue } from './database.js';
    import { onMount } from 'svelte';
    
  export let onClose

  onMount(async () => {
        document.getElementById("myPlace").focus();    
	});

 let place;
    let places = [];
    let latitude=[];
    let longitude=[];
    const getCoords=async()=>{
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({place})
        };
        fetch('/places/places', options)
        .then(res => res.json())
        .then(data=>{
            for (let index = 0; index < data.data.length; index++) {
                let city=data.data[index].locality;
                let state=data.data[index].region;
                let country=data.data[index].country;
                let county=data.data[index].county;
                latitude[index] = data.data[index].latitude;
                longitude[index] = data.data[index].longitude;
                places[index] = city+", "+state+", "+country+" ("+county+")";
            }
        })
        .catch(error => console.error(error))
    }
    
    const setPlace=(place)=>{
        let i =places.indexOf(place);
        let placeData={
            place: places[i],
            latitude: latitude[i],
            longitude: longitude[i]
        };
        placeValue.set(placeData);
        console.log($placeValue);
       
        document.getElementById("place-title").value= place;
    }

       
</script>
<div class="container absolute z-10 bg-gray-100 inset-0 overflow-auto">
    <div class="flex justify-center mt-2 mx-auto">
        <input type="text" id="myPlace" bind:value={place} class="block px-4 w-4/5" autocomplete="off" />
        <button on:click|preventDefault={getCoords} class="bg-gray-300 rounded-lg px-4 py-2 ml-2" >Get Coords</button>
    </div>
    <div class="muto">
        {#each places as place}
        <div class="w-full border-2 py-2 " on:click={setPlace(place)} on:click={onClose}>            
            <p>{place}</p>
        </div>
    {/each}
    </div>
    
    
</div>