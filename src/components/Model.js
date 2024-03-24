const Model = {
    getItemList() {
      return JSON.parse(localStorage.getItem("itemList")) || [
        { id: 1, name: "Елемент 1" },
        { id: 2, name: "Елемент 2" },
        { id: 3, name: "Елемент 3" },
      ];
    },
  
    setItemList(itemList) {
      localStorage.setItem("itemList", JSON.stringify(itemList));
    }
};

export { Model };