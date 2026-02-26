<template>
  <div>
    <h1>Documents</h1>
    <DocumentList :docs="docs" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DocumentList from "../components/DocumentList.vue";

export default {
  components: { DocumentList },
  computed: {
    ...mapState("documents", ["docs"]),
  },
  created() {
    this.loadDocs();
  },
  methods: {
    ...mapActions("documents", ["loadDocs"]),
  },
};
</script>
