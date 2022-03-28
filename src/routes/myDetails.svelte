<script>
    import { Datepicker } from 'svelte-calendar';
	import dayjs from 'dayjs';
	import TimePicker  from "svelte-touch-timepicker"; 
    import Places from "./places.svelte"
    import { placeValue } from './stores.js';
    import { dataValue } from "./stores";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import Navbar from "$lib/components/Navbar.svelte";

    let p_value;
    
    let place;
    let name, gender, store;    
    let time = new Date();
    let options
    // let zone= time.toString().match(/([-\+][0-9]+)\s/)[1];   ------ return +0530
    var offset = time.getTimezoneOffset();
    //  var o = Math.abs(offset); 
    // let zone =(offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2); // return +05:30
    let zone = offset/-60; //return 5.5

    $: dob=dayjs($store?.selected).format('YYYY-MM-DD');
    const theme = {
		calendar: {
			width: '700px',
			shadow: '0px 0px 5px rgba(0, 0, 0, 0.25)'
		}
	};
    let format="DD-MM-YYYY";

    $: _time = time.toLocaleTimeString("en-GB");

    const handleSubmit=()=>{
        placeValue.subscribe(value => {
		    p_value = value;
	    });
        let userData={
        name: name,
        gender: gender,
        dob: dob,
        day:dob.slice(8,10),
        month: dob.slice(5,7),
        year: dob.slice(0,4),
        time:_time,
        hours:_time.slice(0,2),
        minutes:_time.slice(3,5),
        zone:zone,
        place:p_value
    };
    dataValue.set(userData);
    goto("http://localhost:3000/details")

    }


    let showPlaces=false;
    
</script>

<div class="relative container mx-auto w-full sm:w-3/5 md:w-2/5 pb-4 shadow-lg rounded-2xl">
    <div>
        <div class="flex justify-center mt-16 pt-4">
            <h1 class="font-bold text-4xl text-yellow-500">Kundli</h1>
        </div>
        <div class="flex justify-center mt-2 mb-4">
            <p class="px-12 text-md text-gray-500">Generate your kundli with us by filling all the information needed.</p>
        </div>
    </div>
    <div>
    <div class="pb-8 mt-8 border-2 border-white">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <form class="flex flex-col bg-orange-100 w-full justify-center py-6" >
            <table class='table-fixed '>
                <tr>
                    <td class="flex justify-center">
                        <label class=" block sm:inline-block">Name</label>
                    </td>
                    <td>
                        <input type="text" class="border-b bg-yellow-50 border-gray-300 focus:bg-yellow-100 rounded-lg text-grey-darker ml-12 xl:ml-24 mr-8 w-72 sm:w-64 md:w-36 lg:w-56 2xl:w-80 py-1 px-2" bind:value={name}>
                    </td>
                </tr>
                <tr>
                    <td class="flex justify-center">
                        <label class="block xl:inline-block mt-4">Gender</label>
                    </td>
                    <td class="">
                        <label class="ml-12 xl:ml-24 mt-4">
                            <input type=radio class="mt-4" bind:group={gender} name="gender" value={"male"} />
                            male
                        </label>
                        <label class="ml-12 mt-4 xl:ml-28">
                            <input type=radio class="mt-6" bind:group={gender} name="gender" value={"female"} />
                            female
                        </label>
                    </td>
                </tr>
                <tr>
                    <td >
                        <label class="block xl:inline-block mt-4">Date of Birth</label>
                    </td>
                    <td>
                        <div class="flex justify-center mt-4">
                            <Datepicker {format}  bind:store {theme} />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="flex justify-center ">
                        <label class="my-4 block sm:inline-block">Time of Birth</label>
                    </td>
                    <td>
                        <div class="flex justify-center">
                            <TimePicker bind:time/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="flex justify-center">
                        <label class=" block sm:inline-block">Place of Birth</label>
                    </td>
                    <td>
                        <input type="text" id="myPlace" autocomplete="off" class="border-b inline bg-yellow-50 border-gray-300 focus:bg-yellow-100 rounded-lg text-grey-darker ml-12 xl:ml-24 mr-8 w-72 sm:w-64 md:w-36 lg:w-56 2xl:w-80 py-1 px-2" bind:value={place} on:click={() => showPlaces = true} />
                    </td>
                </tr>
            </table>
            
            <div class="mt-4 flex justify-center">
                <button class="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
                    on:click|preventDefault={handleSubmit}>
                    Submit
                  </button>
            </div>
            {#if showPlaces}
                <Places onClose={() => showPlaces = false}/>
            {/if}
        </form>
    </div>
</div>
</div>

<!-- <div>
    {#if $selectedstore=="dash"}
        <Details/>
    {/if}
</div>

<div
  class="overflow-hidden hidescroll"
  style="width:100vw;"
  in:fly={{ y: 80, duration: 200 }}>
  <Navbar />
</div> -->

<style>
</style>