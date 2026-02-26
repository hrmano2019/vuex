// store/documents.js
export default {
  namespaced: true,
  state: { docs: [] },
  mutations: {
    setDocs(state, docs) { state.docs = docs; }
  },
  actions: {
    async loadDocs({ commit }) {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        commit("setDocs", data);
        localStorage.setItem("docs", JSON.stringify(data)); // offline cache
      } catch {
        const cached = localStorage.getItem("docs");
        if (cached) commit("setDocs", JSON.parse(cached));
      }
    }
  }
};
