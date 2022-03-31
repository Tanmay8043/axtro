<script>
    import {fly } from "svelte/transition"
    import Navbar from "$lib/components/Navbar.svelte"
    import Details from "$lib/components/Details.svelte"
    import Panchang from "$lib/components/Panchang.svelte"
import { selectedstore } from "$lib/components/database"
import Ephemeris from "$lib/components/Ephemeris.svelte";
import Account from "$lib/components/Account.svelte";
// console.log(process.env);
</script>

<div>
    {#if $selectedstore=="My_Details"}
        <Details/>
    {:else if $selectedstore=="Panchang"}
        <Panchang/>
    {:else if $selectedstore=="Ephimeris"}
        <Ephemeris/>
    {:else if $selectedstore=="My_Account"}
        <Account/>
    {/if}
</div>

<div
  class="overflow-hidden hidescroll"
  style="width:100vw;"
  in:fly={{ y: 80, duration: 200 }}>
  <Navbar />
</div>