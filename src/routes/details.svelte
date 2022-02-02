<script>
    import { dataValue } from "./stores";
    import { goto } from '$app/navigation';
    import axios from "axios";
    import { onMount } from 'svelte';
    
    let user;
    onMount(async () => {
        user =$dataValue;
        getDetails1(); 
        getDetails2();
        getDetails3(); 
        getDetails4();     
	});
    const b=[], d=[], f=[], h=[];
    const getDetails1=()=>{
        let nbDetails;
        var result=[];
        const options = {
            method: 'POST',
            url: 'https://vedicrishi-horoscope-matching-v1.p.rapidapi.com/numero_table/',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'vedicrishi-horoscope-matching-v1.p.rapidapi.com',
                'x-rapidapi-key': 'a6bbe4a908mshd9e35dd6348adcfp1f289ajsn1e08492bea1d'
            },
            data: {
                day: user.day.toString(),
                month: user.month.toString(),
                year: user.year.toString(),
                hour: user.hours.toString(),
                min: user.minutes.toString(),
                name: user.name.toString(),
                lat: user.place.latitude.toString(),
                lon: user.place.longitude.toString(),
                tzone: user.zone.toString()
        }
        };

        axios.request(options).then(function (response) {
            nbDetails=response.data;
            result = Object.entries(nbDetails);  
            for (let i = 0; i < result.length; i++) {
                b[i]=result[i][1];
            }
        }).catch(function (error) {
            console.error(error);
        });
    };

    const getDetails2=()=>{
        let details;
        var result=[];
        const options = {
            method: 'POST',
            url: 'https://vedicrishi-horoscope-matching-v1.p.rapidapi.com/birth_details/',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'vedicrishi-horoscope-matching-v1.p.rapidapi.com',
                'x-rapidapi-key': 'a6bbe4a908mshd9e35dd6348adcfp1f289ajsn1e08492bea1d'
            },
            data: {
                day: user.day.toString(),
                month: user.month.toString(),
                year: user.year.toString(),
                hour: user.hours.toString(),
                min: user.minutes.toString(),
                lat: user.place.latitude.toString(),
                lon: user.place.longitude.toString(),
                tzone: user.zone.toString(),
                gender: user.gender.toString()
            }
        };

        axios.request(options).then(function (response) {
            details=response.data;
            result = Object.entries(details);
            for (let i = 0; i < result.length; i++) {
                d[i]=result[i][1];
            }
        }).catch(function (error) {
            console.error(error);
        });
    };

    const getDetails3=()=>{
        let details;
        var result=[];
        const options = {
            method: 'POST',
            url: 'https://vedicrishi-horoscope-matching-v1.p.rapidapi.com/astro_details/',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'vedicrishi-horoscope-matching-v1.p.rapidapi.com',
                'x-rapidapi-key': 'a6bbe4a908mshd9e35dd6348adcfp1f289ajsn1e08492bea1d'
            },
            data: {
                day: user.day.toString(),
                month: user.month.toString(),
                year: user.year.toString(),
                hour: user.hours.toString(),
                min: user.minutes.toString(),
                lat: user.place.latitude.toString(),
                lon: user.place.longitude.toString(),
                tzone: user.zone.toString(),
                gender: user.gender.toString()
            }
        };

        axios.request(options).then(function (response) {
            details=response.data;
            result = Object.entries(details);
            for (let i = 0; i < result.length; i++) {
                f[i]=result[i][1];
            }
        }).catch(function (error) {
            console.error(error);
        });
    };

    const getDetails4=()=>{
        let details;
        var result=[];
        const options = {
            method: 'POST',
            url: 'https://vedicrishi-horoscope-matching-v1.p.rapidapi.com/basic_panchang/',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'vedicrishi-horoscope-matching-v1.p.rapidapi.com',
                'x-rapidapi-key': 'a6bbe4a908mshd9e35dd6348adcfp1f289ajsn1e08492bea1d'
            },
            data: {
                day: user.day.toString(),
                month: user.month.toString(),
                year: user.year.toString(),
                hour: user.hours.toString(),
                min: user.minutes.toString(),
                lat: user.place.latitude.toString(),
                lon: user.place.longitude.toString(),
                tzone: user.zone.toString(),
                gender: user.gender.toString()
            }
        };

        axios.request(options).then(function (response) {
            details=response.data;
            result = Object.entries(details);
            for (let i = 0; i < result.length; i++) {
                h[i]=result[i][1];
            }
        }).catch(function (error) {
            console.error(error);
        });
    };

    const viewDetails1=()=>{        
        var el = document.getElementById("demo");
        el.classList.toggle("hidden");
        
        let x= document.getElementById("btn1").innerText;
        btn1.innerText= (x=="View") ? "Close" :"View";
    };

    const viewDetails2=()=>{        
        var el = document.getElementById("demo2");
        el.classList.toggle("hidden");

        let x= document.getElementById("btn2").innerText;
        btn2.innerText= (x=="View") ? "Close" :"View";
    };

    const viewDetails3=()=>{        
        var el = document.getElementById("demo3");
        el.classList.toggle("hidden");

        let x= document.getElementById("btn3").innerText;
        btn3.innerText= (x=="View") ? "Close" :"View";
    };

    const viewDetails4=()=>{        
        var el = document.getElementById("demo4");
        el.classList.toggle("hidden");

        let x= document.getElementById("btn4").innerText;
        btn4.innerText= (x=="View") ? "Close" :"View";
    };

    const a=["Name", "Date","Destiny Number","Radical Number","Name number","Evil Number","Favourite Color","Favourite Day","Favourite God","Favourite Mantra","Favourite Metal","Favourite Stone","Favourite Substone","Friendly Number","Neutral Number","Radical Number","Radical Ruler"];
    const c=["Year", "Month", "Day","Hour", "Minute","Latitude","Longitude","TimeZone","Gender","Seconds","Ayanamsha","Sunrise", "Sunset"];
    const e =["Ascendant","Ascendant-Lord", "Varna","Vashya","Yoni","Gan","Nadi","SignLord","Sign","Nakshatra", "Nakshatra-Lord","Charan","Yog","Karan","Tithi","Yunja","Tatva","Name Alphabet","Paya"];
    const g=["Day", "Tithi","Nakshatra","Yog","Karan","Sunrise","Sunset","Vedic-Sunrise","Vedic-Sunset"];

       
</script>

<div>
    <div class="flex justify-center mt-12">
        <button class="bg-orange-200 text-lg font-bold px-4 py-2 rounded-xl shadow-xl hover:bg-orange-300 hover:shadow-2xl" on:click={()=>{goto("http://localhost:3000/")}}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="inline-block pb-1" src="https://img.icons8.com/fluency-systems-filled/20/000000/home.png"/>
            Home
        </button>
    </div>
    <div class="grid grid-cols-1 justify-center w-2/5 mx-auto mt-20">
        <div>
            <div class="flex justify-between bg-gray-200">
                <p class="pl-4 font-semibold text-lg">Numerology basic details</p>
                <div>
                    <button id="btn1" class="bg-gray-300 w-20 h-full" on:click={viewDetails1}>View</button>
                </div>
            </div>
            <div id="demo" class="bg-orange-100 hidden p-2 text-clip overflow-hidden">
                <table class="border-4 border-red-300 w-full">
                    {#each a as item, i}
                    <tr class="border border-red-300">
                        <td class="pl-4 border border-red-300">{item}</td>
                        <td class="pl-4">{b[i]}</td> 
                    </tr>
                    {/each}
                </table>
            </div>
        </div>
        
        <div class="mt-2">
            <div class="flex justify-between bg-gray-200">
                <p class="pl-4 font-semibold text-lg">Birth details</p>
                <div>
                    <button id="btn2" class="bg-gray-300 w-20 h-full" on:click={viewDetails2}>View</button>
                </div>
            </div>
            <div id="demo2" class="bg-orange-100 hidden p-2 text-clip overflow-hidden">
                <table class="border-4 border-red-300 w-full">
                    {#each c as item, i}
                    <tr class="border border-red-300">
                        <td class="pl-4 border border-red-300">{item}</td>
                        <td class="pl-4">{d[i]}</td> 
                    </tr>
                    {/each}
                </table>
            </div>
        </div>

        <div class="mt-2">
            <div class="flex justify-between bg-gray-200">
                <p class="pl-4 font-semibold text-lg">Basic Astrologic details</p>
                <div>
                    <button id="btn3" class="bg-gray-300 w-20 h-full" on:click={viewDetails3}>View</button>
                </div>
            </div>
            <div id="demo3" class="bg-orange-100 hidden p-2 text-clip overflow-hidden">
                <table class="border-4 border-red-300 w-full">
                    {#each e as item, i}
                    <tr class="border border-red-300">
                        <td class="pl-4 border border-red-300">{item}</td>
                        <td class="pl-4">{f[i]}</td> 
                    </tr>
                    {/each}
                </table>
            </div>
        </div>

        <div class="my-2">
            <div class="flex justify-between bg-gray-200">
                <p class="pl-4 font-semibold text-lg">Basic Panchang details</p>
                <div>
                    <button id="btn4" class="bg-gray-300 w-20 h-full" on:click={viewDetails4}>View</button>
                </div>
            </div>
            <div id="demo4" class="bg-orange-100 hidden p-2 text-clip overflow-hidden">
                <table class="border-4 border-red-300 w-full">
                    {#each g as item, i}
                    <tr class="border border-red-300">
                        <td class="pl-4 border border-red-300">{item}</td>
                        <td class="pl-4">{h[i]}</td> 
                    </tr>
                    {/each}
                </table>
            </div>
        </div>
    </div>
</div>