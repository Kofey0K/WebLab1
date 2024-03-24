<template>
  <div>
    <!-- Кнопка для переключення видимості форми -->
    <button @click="toggleFormVisibility">
      {{ formVisible ? "Приховати форму" : "Показати форму" }}
    </button>

    <!-- Форма з валідацією -->
    <form v-if="formVisible" @submit.prevent="submitForm">
      <input
        type="text"
        v-model="inputData"
        placeholder="Введіть дані"
        required
      />
      <button type="submit">Надіслати</button>
      <p v-if="formErrors.length" style="color: red">
        {{ formErrors.join(", ") }}
      </p>
    </form>

    <!-- Список з фільтром -->
    <ul>
      <li v-for="item in updatefilteredList()" :key="item.id">
        {{ item.name }}
        <button @click="deleteItem(item.id)">Видалити</button>
      </li>
    </ul>
  </div>
  <div>
    <!-- Блок коду з динамічними стилями -->
    <code :style="{ color: textColor }" class="textBig">
      {{ textDynamic }}
    </code>
  </div>
</template>

<script>
import Controller from "./Controller.js";
import { Model } from './Model.js';

export default {
  data() {
    return {
      model: Model, // Use Model directly
      
      inputData: '',
      formErrors: [],
      formVisible: true,
      textDynamic: "Dynamic styles",
      textColor: "black",
      controller: new Controller(), // Initialize Controller instance
      filteredList: [],
    };
  },

  mounted() {
    // Example of dynamically changing text color
    setInterval(() => {
      this.textColor = this.generateRandomColor(); // Generate a random text color
    }, 1000); // Every second
    this.updatefilteredList();
  },
  methods: {
  updatefilteredList() {
      // Filter the item list based on the lowercase name property
      this.filteredList = this.model.getItemList().filter((item) => {
        // Convert item name to lowercase and check if it includes the lowercase input
        return item.name.toLowerCase().includes(this.inputData.toLowerCase());
      });
      return this.filteredList;
    },
    submitForm() {
      this.formErrors = this.controller.submitForm(this.inputData, this.formErrors, this.model.getItemList());
      this.updatefilteredList();
      this.inputData = ''; // Очищення введених даних після надсилання форми
  },
  deleteItem(itemId) {
    this.controller.deleteItem(itemId, this.model.getItemList());
    this.updatefilteredList();
    this.inputData = '';
  },
  toggleFormVisibility() {
    // Toggle form visibility
    this.formVisible = !this.formVisible;
  },
    generateRandomColor() {
      // Generate a random color in HEX format
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
  }
};
</script>

<style>
.textBig {
  font-size: 30px;
}
</style>
