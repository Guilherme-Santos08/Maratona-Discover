const Modal = {
  open() {
    // Abrir modal
    // Adcionar a class active ao modal
    document
      .querySelector(".modal-overlay") // mandei pesquisar modal-overlay no meu HTML
      .classList.add("active"); // quando ele achar, ele vai adicionar "active ao meu class"
  },
  close() {
    // fecha o modal
    // remover a class active do modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 1,
    description: 'WebSite',
    amount: 50000,
    date: '23/01/2021'
  },
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  }
]

const Transaction = {
  icomes() {
    // somar as entradas
  },
  expense() {
    // somas as saídas
  },
  total() {
    // entradas - saídas
  }
}