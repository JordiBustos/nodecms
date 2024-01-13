function filterByName(arr, inputText) {
  return arr.filter((entity) => entity.name.toLowerCase().includes(inputText));
}

export default filterByName;
