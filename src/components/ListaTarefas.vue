<template>
  <ul class="task-list">
    <li 
      v-for="(tarefa, index) in tarefas" 
      :key="tarefa.id" 
      class="task-item"
      draggable="true" 
      @dragstart="onDragStart(index)" 
      @dragover.prevent 
      @drop="onDrop(index)"
    >
      <span class="task-name">{{ tarefa.nome }}</span>
      <span class="task-cost">{{ tarefa.custo }}
        <v-icon v-if="tarefa.custo >= 1000" color="red">mdi-alert-circle</v-icon>
      </span>
      <span class="task-date">{{ tarefa.dataLimite }}</span>
      <EditarTarefa :tarefaId="tarefa.id"/>
      <DeletarTarefa :tarefaId="tarefa.id" @tarefaDeletada="carregarTarefas" />
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
import DeletarTarefa from './DeletarTarefa.vue';
import EditarTarefa from './EditarTarefa.vue';

export default {
  components: {
    DeletarTarefa,
    EditarTarefa,
  },
  data() {
    return {
      tarefas: [],
      draggedIndex: null, // Para armazenar o índice do item que está sendo arrastado
    };
  },
  created() {
    this.carregarTarefas();
  },
  methods: {
    async carregarTarefas() {
      try {
        const response = await axios.get('https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas');
        this.tarefas = response.data.map((tarefa) => ({
          ...tarefa,
          dataLimite: new Date(tarefa.dataLimite).toLocaleDateString('pt-BR'),
        }));
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    },
    onDragStart(index) {
      this.draggedIndex = index; // Armazena o índice do item arrastado
    },
    onDrop(index) {
      // Faz a troca dos itens no array
      const draggedItem = this.tarefas[this.draggedIndex];
      this.tarefas.splice(this.draggedIndex, 1); // Remove o item arrastado
      this.tarefas.splice(index, 0, draggedItem); // Insere o item na nova posição
      this.draggedIndex = null;

      // Atualizar a ordem das tarefas no backend
      this.atualizarOrdemTarefas();
    },
async atualizarOrdemTarefas() {
  // Suponha que 'dados' seja o objeto contendo a nova ordem das tarefas
  const dados = { /* id da tarefa, nova ordem ou qualquer outra informação necessária */ };
  
  // Log dos dados antes de enviar
  console.log("Dados a serem enviados:", dados);

  try {
    const resposta = await axios.put("https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas/ordenar", dados);
    console.log("Resposta do servidor:", resposta.data);
  } catch (erro) {
    console.error("Erro na requisição PUT:", erro);
  }
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

.add-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    background-color: #458db5;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.add-button:hover {
    background-color: #357c99;
}

.task-list {
    list-style-type: none;
    padding: 0;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.task-item:nth-child(even) {
    background-color: #f1f1f1;
}

.task-name,
.task-cost,
.task-date {
    margin: 0 10px;
}

.edit-button, .delete-button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    color: white;
}

.edit-button {
    background-color: #f39c12;
    transition: background-color 0.3s ease;
}

.delete-button {
    background-color: #e74c3c;
    transition: background-color 0.3s ease;
}

.edit-button:hover {
    background-color: #d68910;
}

.delete-button:hover {
    background-color: #c0392b;
}

</style>
  