<template>
  <div>
<v-btn class="edit-button" @click="showModal = true">
        Editar
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Editando Tarefa</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="tarefa.nome"
            :counter="10"
            label="Nome"
            required
          ></v-text-field>
          <v-text-field
            v-model="tarefa.custo"
            :counter="5"
            label="Custo"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="tarefa.dataLimite"
            label="Data Limite"
            type="date"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showModal = false">
          Fechar
        </v-btn>
        <v-btn color="blue darken-1" text @click="confirmarAcao">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
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
  data() {
    return {
      showModal: false,
      tarefa: {
        nome: '',
        custo: '',
        dataLimite: '',
      },
    };
  },
  async created() {
    const id = this.tarefaId; // Obter o ID da tarefa da URL
    try {
      const response = await axios.get(`https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas/${id}`);
      this.tarefa = response.data;
    } catch (error) {
      console.error('Erro ao carregar tarefa para edição:', error);
    }
  },
  methods: {
    async salvarTarefa() {
      const id = this.tarefaId;
      try {
        await axios.put(`https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas/${id}`, this.tarefa);
        this.$router.push('/'); // Redireciona de volta para a lista de tarefas
      } 
      catch (error) {
        console.error('Erro ao salvar tarefa:', error);
      }
    },
    confirmarAcao() {
      this.salvarTarefa();
      this.showModal = false; // Fechar o modal após salvar a tarefa
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #333;
}

.task-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #555;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
}

.form-input:focus {
  border-color: #458db5;
  outline: none;
}

.save-button {
  padding: 10px;
  background-color: #458db5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #367c9c;
}
.edit-button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    color: white;
    background-color: #f39c12;
    transition: background-color 0.3s ease;
}

.edit-button:hover {
    background-color: #d68910;
}
</style>
