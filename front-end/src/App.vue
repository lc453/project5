<template>
<div id="app">
  <div id="menu">
    <div v-if="user">
      <h4>{{user.firstName}} {{user.lastName}}: <a @click="logout"><i class="logout">log out</i></a></h4>
    </div>
    <div id="brand">
      <router-link to="/">
        <img src="../images/warriors.png">
      </router-link>
    </div>
    <div id="side">
      <router-link to="/create">
        <div class="menu-item create">
          <p>Create Adventurer</p>
        </div>
      </router-link>
      <router-link to="/edit">
        <div class="menu-item">
          <p>Edit/Delete</p>
        </div>
      </router-link>
      <router-link to="/party">
        <div class="menu-item">
          <p>Party</p>
        </div>
      </router-link>
    </div>
  </div>
  <div class=content>
    <router-view />
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'back',
    async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    computed: {
      user() {
        return this.$root.$data.user;
      }
    },
    methods: {
      async logout() {
        try {
          await axios.delete("/api/users");
          this.$root.$data.user = null;
        } catch (error) {
          this.$root.$data.user = null;
        }
      },
    }
  }
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;
  color: #ffffff;
}

h1 {
  text-decoration: underline;
}

#mefnu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #B84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: space-around;
}

#side img {
  width: 50px;
}

.menu-item {
  margin-top: 8px;
  display: flex;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  maxwidth: 1300px;
  justify-content: space-around;
  margin-top: 40px;
}

.image {
  width: 500px;
  border: 7px solid #47170c;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
  background-color: #c39b77;
  color: #47170c;
}

.form {
  background-color: #c39b77;
  color: #47170c;
  padding: 20px;
  border: 7px solid #47170c;
}

.norm {
  margin-bottom: 15px;
}

.stats {
  display: flex;

  justify-content: space-between;
}

.item {
  border: 1px dotted #47170c;
}

.home {
  width: 1300px;
}


p {
  margin-left: 8px;
  margin-right: 8px
}

h2 {
  margin-left: 10px;
}

button {
  margin: 15px;
  background-color: #000000;
  color: #c39b77;
  border: 1px solid #47170c;
}

ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}
li {
  padding: 10px;
  color: #FFFFFF;
}
</style>
