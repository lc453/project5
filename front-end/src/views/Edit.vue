<template>
<div class="admin">
  <div v-if="user">
    <h1>Edit or Delete an  Adventurer:</h1>
    <div class="norm">
      <input v-model="findName" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectAdventurer(s)">{{s.name}}
        </div>
      </div>
    </div>
    <div class="form">
      <div class="upload" v-if="findAdventurer">
        <br>
        <label>Name:</label>
        <input v-model="findAdventurer.name">
        <p></p>
        <label>Race:</label><br>
        <select v-model="findAdventurer.race" name="race" id="race">
          <option value="Elf">Elf</option>
          <option value="Dwarf">Dwarf</option>
          <option value="Orc">Orc</option>
          <option value="Human">Human</option>
          <option value="Monster">Monster</option>
          <option value="Unknown">Unknown</option>
        </select>
        <p></p>
        <div class="stats">
          <div class="box">
            <label>Strength:</label>
            <select v-model="findAdventurer.strength" name="strength" id="strength">
              <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
              <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
            </select>
          </div>
          <div class="box">
            <label>Agility:</label>
            <select v-model="findAdventurer.agility" name="agility" id="agility">
              <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
              <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
            </select>
          </div>
          <div class="box">
            <label>Durability:</label>
            <select v-model="findAdventurer.durability" name="durability" id="durability">
              <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
              <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
            </select>
          </div>
          <div class="box">
            <label>Intelligence:</label>
            <select v-model="findAdventurer.intelligence" name="intelligence" id="intelligence">
              <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
              <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
            </select>
          </div>
        </div>
        <p></p>
        <label>Description/Backstory:</label><br>
        <textarea v-model="findAdventurer.description" placeholder="Add Adventurer Description" rows="8" cols="80"></textarea>
        <p></p>
        <label>Cost of services: </label>
        <input v-model="findAdventurer.cost" type="number">
        <label> gold</label>
        <p></p>
      </div>
      <div class="actions" v-if="findAdventurer">
        <button @click="deleteAdventurer(findAdventurer)">Delete</button>
        <button @click="editAdventurer(findAdventurer)">Edit</button>

      </div>
    </div>
  </div>
  <Login v-else />
</div>
</template>

<script>
  import axios from 'axios';
  import Login from '@/components/Login.vue';
  export default {
    name: 'Admin',
    components: {
      Login,
    },
    data() {
      return {
        name: "",
        description: "",
        race: "",
        strength: 0,
        agility: 0,
        durability: 0,
        intelligence: 0,
        cost: 0,
        file: null,
        addAdventurer: null,
        adventurers: [],
        findName: "",
        findAdventurer: null,
      }
    },
    computed: {
      suggestions() {
        let adventurers = this.adventurers.filter(adventurer => adventurer.name.toLowerCase().startsWith(this.findName.toLowerCase()));
        return adventurers.sort((a, b) => a.name > b.name);
      },
      user() {
        return this.$root.$data.user;
      }
    },
    async created() {
      this.getAdventurers();
      try {
        let response2 = await axios.get('/api/users');
        this.$root.$data.user = response2.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    methods: {
      fileChanged(event) {
        this.file = event.target.files[0]
      },
      async upload() {
        try {
          let r = await axios.post('/api/adventurers', {
            name: this.name,
            description: this.description,
            race: this.race,
            strength: this.strength,
            agility: this.agility,
            durability: this.durability,
            intelligence: this.intelligence,
            cost: this.cost
          });
          this.addAdventurer = r.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getAdventurers() {
        try {
          let response = await axios.get("/api/adventurers");
          this.adventurers = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      selectAdventurer(adventurer) {
        this.findName = "";
        this.findAdventurer = adventurer;
      },
      async deleteAdventurer(adventurer) {
        try {
          await axios.delete("/api/adventurers/" + adventurer.id);
          this.findAdventurer = null;
          this.getAdventurers();
          return true;
        } catch (error) {
          console.log(error);
        }
        this.$root.$data.party.splice(this.$root.$data.party.indexOf(adventurer.id),1);
      },
      async editAdventurer(adventurer) {
        try {
          await axios.put("/api/adventurers/" + adventurer.id, {
            name: this.findAdventurer.name,
            description: this.findAdventurer.description,
            race: this.findAdventurer.race,
            strength: this.findAdventurer.strength,
            agility: this.findAdventurer.agility,
            durability: this.findAdventurer.durability,
            intelligence: this.findAdventurer.intelligence,
            cost: this.findAdventurer.cost
          });
          this.findAdventurer = null;
          this.getAdventurers();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    }
  }
</script>
