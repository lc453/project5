<template>
  <div class="home">
    <h1>Your Party:</h1>
    <div v-if="this.$root.$data.party.length===0">
      <p>Your party is empty</p>
    </div>
    <div v-else>
    <p>Total Cost: {{cost}} gold</p>
      <section class="image-gallery">
        <div class="image" v-for="adventurer in adventurers" :key="adventurer.id">
          <h2>{{adventurer.name}} <em>({{adventurer.race}})</em></h2>
          <div class="stats item">
            <p>Strength: {{adventurer.strength}}</p>
            <p>Agility: {{adventurer.agility}}</p>
            <p>Durability: {{adventurer.durability}}</p>
            <p>Intelligence: {{adventurer.intelligence}}</p>
          </div>
          <p></p>
          <p>{{adventurer.description}}</p>
          <br>
          <p>Cost: {{adventurer.cost}} gold</p>
          <button v-on:click="$root.$data.party.splice($root.$data.party.indexOf(adventurer.id),1); $root.$data.totalcost -= adventurer.cost; getAdventurers()" class="auto">Remove from Party</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     adventurers: [],
     cost: 0
    }
  },
  created() {
    this.getAdventurers();
    this.getCost();
  },
  methods: {
    async getAdventurers() {
      try {
        let response = await axios.get("/api/adventurers/all");
        this.adventurers = response.data.filter(adventurer => this.$root.$data.party.includes(adventurer.id));
        this.getCost();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    getCost() {
      for(let i = 0; i<this.adventurers.length; i++){
        this.cost += this.adventurers[i].cost;
      }
      return this.cost;
    }
  }
}
</script>
