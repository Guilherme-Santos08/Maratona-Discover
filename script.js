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
    description: 'Internet',
    amount: -20000,
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

// Substituir os dados do HTML com os dados do JS

const DOM = {
  
    addTransaction(transaction, index){
      const tr = document.createElement('tr')
      tr.innerHTML = DOM.innerHTMLTransaction()
    },
    innerHTMLTransaction() {
    const html = `
      <td class="description">Luz</td>
      <td class="expense">- R$ 500,00</td>
      <td class="date">23/01/2021</td>
    <td>
      <img src="./assets/minus.svg" alt="Remover transação" />
    </td>
    `

    return html
  }
}

DOM.innerHTMLTransaction()