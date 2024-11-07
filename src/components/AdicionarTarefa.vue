<template>
    <div>
      <v-btn class="add-button" @click="showModal = true">
        Adicionar tarefa
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="showModal" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Título do Modal</v-card-title>
          <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          :counter="10"
          label="Nome"
          required
        ></v-text-field>
        <v-text-field
          v-model="custo"
          :counter="5"
          label="Custo"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="dataLimite"
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
  data() {
    return {
      showModal: false,
      name: '',
      custo: '',
      dataLimite: '',
    };
  },
    methods: {
      confirmarAcao() {
        axios.post('http://localhost:3000/api/tarefas', {
          nome: this.name,
          custo: this.custo,
          dataLimite: this.dataLimite,
        })
        .then(() => {
          this.$emit('tarefaAdicionada'); // Emite um evento para atualizar a lista
          this.showModal = false;
        })
        .catch((error) => {
          console.error('Erro ao adicionar tarefa:', error);
        });
      },
        adicionarTarefa() {

  
        if (nome && custo && dataLimite) {
          axios.post('http://localhost:3000/api/tarefas', {
            nome,
            custo,
            dataLimite,
          })
          .then(() => {
          this.$emit('tarefaAdicionada'); // Emite um evento para atualizar a lista
        })
          .catch((error) => {
            console.error('Erro ao adicionar tarefa:', error);
          });
        } else {
          alert("Todos os campos são obrigatórios!");
        }
      },
    },
};
</script>

<style scoped>
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
</style>