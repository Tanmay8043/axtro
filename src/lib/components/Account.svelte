<script>
  import { session } from "$app/stores";
  import Login from "$lib/components/Login.svelte";
  import {db} from "$lib/firebase"
  import { query, collection, getDocs, orderBy } from "firebase/firestore";
  import Details from "./Details.svelte";
  import { request } from "$lib/fetch.js";
  import { onMount } from 'svelte';
  import {dataValue} from "./database";
  import {showstore} from "./database"

  var peoples=[]
  onMount(async () => {
    const querySnapshot = getDocs(collection(db, "/users", $session.user.phone_number.toString(),"peoples/"));
        querySnapshot.then(function (result){
          peoples = result.docs.map(snap=>snap.data());
          // for (let index = 0, count=0; index < result.docs.length; index++) {
          //     if( result.docs[index]._document.data.value.mapValue.fields != undefined){
          //         peoples[count]=result.docs[index]._document.data.value.mapValue.fields;
          //         count++;
          //     }
          // }
          console.log(peoples);

        });
  });

  var details= false;

  const handleLogout=async ()=>{
    await request("/auth", "DELETE");
    location.reload();
  }

  var time=new Date().toTimeString()
  var dtime
  if(time.substring(0,2)>0 && time.substring(0,2)<=12){
    dtime="Morning"
  }else if(time.substring(0,2)>12 && time.substring(0,2) <=16){
    dtime="AfterNoon"
  }else if(time.substring(0,2) >16 && time.substring(0,2)<=23){
    dtime="Evening"
  }

  var func
  const showclck=(e)=>{
    dataValue.set(e);
    func="show"
    details= "true"
  }

  const addclck=()=>{
    func="add"
    details= "true"
  }
</script>

<div class="relative container {details ?"hidden" : "block"}  z-0 mx-auto w-full md:w-4/5 xl:w-2/5 pb-4 rounded-2xl mt-12">
  {#if $session.user.exists}
  <div class="flex items-center justify-center py-6 mb-16 shadow-sm shadow-blue-500">
    <svg class="h-8 sm:h-16 mt-2 sm:w-16 rounded-full block absolute top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
    <div class="mt-4 sm:mt-10">
      <div class="flex items-center">
        <h1 class="ml-3 mt-2 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">Good {dtime}!</h1>
      </div>
      <dl class="flex flex-col ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
        <dd class="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 fill-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></svg>
            {$session.user.phone_number}
        </dd>
      </dl>
    </div>
    <button on:click={handleLogout} class="absolute  top-2 right-2"><svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Logout</title><path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"/></svg></button>
  </div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-28">
    <div class="relative sm:col-span-2 mb-4">
      <h3 class="text-gray-500 font-semibold text-xl">Peoples :</h3>
      <button class="absolute right-3 top-0 " on:click={addclck}><svg class="h-8 fill-slate-300 w-8  rounded-full border-2 border-slate-400 hover:border-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>Add a person</title><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg></button>
    </div>
    {#each peoples as people, i}
      <div class=" rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        <div class="flex-1 min-w-0">
          <div on:click={showclck(people)} on:click={()=>{showstore.set(people.id)}} class="cursor-pointer focus:outline-none">
            <p class="text-sm font-medium text-gray-900">{i+1}. {people.name}</p>
            <p class="text-sm text-gray-500 truncate pl-3">{new Date(people.time.seconds*1000).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: true, minute:'2-digit'})}</p>
          </div>
        </div>
        <svg class="h-4" style={$showstore== people.id ?'fill:#3868A8;':'fill:#fff;'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
      </div>
    {/each}
    
  </div>
    {:else}
      <Login/>
  {/if}
    
</div>
{#if details}
  <Details onClose={() => (details = false)} {func}/>
{/if}

