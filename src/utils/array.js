export function removeElement(arr, element) {
  const index = arr.indexOf(element);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function insertElement(arr, element, index) {
  arr.splice(index, 0, element);
}
