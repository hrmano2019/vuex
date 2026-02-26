export default {
  namespaced: true,
  state: {
    docs: [],
  },
  mutations: {
    setDocs(state, docs) {
      state.docs = docs;
    },
  },
  actions: {
    async loadDocs({ commit }) {
      const res = await fetch("/api/documents");
      const data = await res.json();
      commit("setDocs", data);
    },
  },
};
