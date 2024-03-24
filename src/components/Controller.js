import { Model } from "./Model.js";

// Exporting as a function
export default function Controller() {
  return {
    submitForm(inputData, formErrors, itemList) {
      formErrors = [];

      if (inputData.length < 3) {
        formErrors.push("Дані повинні містити принаймні 3 символи");
      }

      if (formErrors.length === 0) {
        itemList.push({
          id: itemList.length + 1,
          name: inputData,
        });
        Model.setItemList(itemList);
      }

      return formErrors;
    },

    deleteItem(itemId, itemList) {
      const index = itemList.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        itemList.splice(index, 1);
        Model.setItemList(itemList);
      }
    }
  };
}