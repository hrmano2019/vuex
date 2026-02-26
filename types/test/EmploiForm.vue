<template>
  <form @submit.prevent="apply">
    <input v-model="name" placeholder="Your Name" required />
    <input v-model="email" placeholder="Your Email" required />
    <textarea v-model="motivation" placeholder="Motivation Letter"></textarea>
    <button type="submit">Apply</button>
  </form>
</template>

<script>
export default {
  data() {
    return { name: "", email: "", motivation: "" };
  },
  methods: {
    async apply() {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.$data),
      });
      if (res.ok) alert("Application submitted!");
    },
  },
};
</script>
