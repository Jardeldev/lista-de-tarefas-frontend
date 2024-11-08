<template>
    <div>
      <v-btn class="add-button" @click="showModal = true">
        Adicionar tarefa
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="showModal" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Adicionando Tarefa</v-card-title>
          <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Nome"
          required
          @input="validateName"
        ></v-text-field>
        <v-text-field
          v-model="custo"
          :counter="5"
          :rules="custoRules"
          label="Custo"
          type="number"
          required
          @input="validateCusto"
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
      <v-snackbar 
        v-model="snackbar"
        :color="snackbarColor"
        timeout="3000"
        >
        {{ snackbarMessagem }}
        <template v-slot:actions>
          <v-btn
          color="black"
          @click="snackbar = false"
          >
          Fechar
        </v-btn>
        
      </template>
    </v-snackbar>
    </div>
    
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: false,
      showModal: false,
      name: '',
      nameRules: [
        value => !!value || 'Nome é obrigatório.',
        value => (value && value.length <= 10) || 'Nome deve ter no máximo 10 caracteres.',
      ],
      custo: '',
      custoRules: [
        value => !!value || 'Custo é obrigatório.',
        value => (value && value.length <= 5) || 'Custo deve ter no máximo 5 caracteres.',
      ],
      dataLimite: '',
      snackbar: false,
      snackbarMessagem: '',
      snackbarColor: '#357c99',
      existingTasks: [] // Array para armazenar as tarefas existentes
    };
  },
  mounted() {
    this.loadExistingTasks();
  },
    methods: {
      loadExistingTasks() {
        axios.get('https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas')
        .then((response) => {
          this.existingTasks = response.data.map(task => task.nome);
        })
        .catch((error) => {
          console.error('Erro ao carregar tarefas:', error);
        });
      },
      validateName() {
        if (this.name.length > 10) {
          this.name = this.name.slice(0, 10); // Limita o campo a 10 caracteres
        }
      },
      validateCusto() {
        if (this.custo.toString().length > 5) {
          this.custo = this.custo.toString().slice(0, 5); // Limita o campo a 5 número
        }
      },
      confirmarAcao() {
        // Verifica se todos os campos foram preenchidos
        if (!this.valid) {
          this.showSnackbar('Por favor, preencha todos os campos corretamente!', '#357c99');
          return;
        }

      /*   if (!this.name || !this.custo || !this.dataLimite) {
          this.showSnackbar('Todos os campos são obrigatórios!', '#357c99');
          return;
        } */
      

        // Verifica se já existe uma tarefa com esse nome
        if (this.existingTasks.includes(this.name)) {
          this.showSnackbar('Tarefa existe uma tarefa com esse nome!', '#357c99');
          return;
        }
        axios.post('https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas', {
          nome: this.name,
          custo: this.custo,
          dataLimite: this.dataLimite,
        })
        .then(() => {
          this.$emit('tarefaAdicionada'); // Emite um evento para atualizar a lista
          this.showModal = false;
          this.clearFields()
          this.loadExistingTasks();
        })
        .catch((error) => {
          console.error('Erro ao adicionar tarefa:', error);
        });
      },
      showSnackbar(messagem, color) {
        this.snackbarMessagem = messagem;
        this.snackbarColor = color;
        this.snackbar = true;
      },
      clearFields() {
        this.name = '';
        this.custo = '';
        this.dataLimite = '';
      },
        adicionarTarefa() {

  
        if (nome && custo && dataLimite) {
          axios.post('https://lista-de-tarefas-backend-wtjm.onrender.com/api/tarefas', {
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