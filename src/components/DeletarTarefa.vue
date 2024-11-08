<template>
    <v-btn class="delete-button" @click="deletarTarefa(tarefaId)">
      Deletar
      <v-icon>mdi-delete</v-icon>
    </v-btn>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        tarefaId: {
            type: Number,
            required: true,
        },
    },
    methods: {
    async deletarTarefa(id) {
        const confirmacao = confirm('Deseja realmente excluir a tarefa?');
        if (confirmacao) {
          try {
            await axios.delete(`https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas/${id}`);
            this.$emit('tarefaDeletada'); // Emite um evento para atualizar a lista

            
          } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
          }
        }
      },
    },
};
</script>

<style scoped>
.delete-button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    color: white;
}

.delete-button {
    background-color: #e74c3c;
}


.delete-button:hover {
    background-color: #c0392b;
}
</style>