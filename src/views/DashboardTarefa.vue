<template>
    <div class="container">
      <h1 class="title">Lista de Tarefas</h1>
      <AdicionarTarefa @tarefaAdicionada="atualizarLista" />
      <ListaTarefas ref="listaTarefa" />
    </div>
  </template>
  
  <script>
  import AdicionarTarefa from '@/components/AdicionarTarefa.vue';
  import ListaTarefas from '@/components/ListaTarefas.vue';
  
  export default {
    components: {
      AdicionarTarefa,
      ListaTarefas,
    },
    methods: {
      atualizarLista() {
        this.$refs.listaTarefa.carregarTarefas();
      },
      },
  };
  </script>
  
  <style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    color: #333;
}


</style>
  