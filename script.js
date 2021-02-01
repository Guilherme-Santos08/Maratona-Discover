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

const Storege = { // Guardar as configurações do usuario dentro do navegador
  get () {
    return JSON.parse(localStorage.getItem("dev.finances:transaction")) || [] // o parse vai transformar o array em uma string ou um objeto
  },

  set(transactions){
    localStorage.setItem("dev.finances:transaction", JSON.
    stringify(transactions))
  }
}

const Transaction = {
  all: Storege.get(),
  
  add(transaction){
    Transaction.all.push(transaction)

    App.reload()
  },

  add(transaction) {
    // Adicionar transações
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    // Remover transações
    Transaction.all.splice(index, 1);

    App.reload();
  },

  incomes() {
    // Entrada
    let income = 0;
    // pegar todas as transacoes
    // para cada transacao,
    Transaction.all.forEach((transaction) => {
      // se ela for maior que zero
      if (transaction.amount > 0) {
        // somar a uma variavel e retornar a variavel
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    // Saida
    let expense = 0;
    // pegar todas as transacoes
    // para cada transacao,
    Transaction.all.forEach((transaction) => {
      // se ela for maior que zero
      if (transaction.amount < 0) {
        // somar a uma variavel e retornar a variavel
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    // Total
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" />
      </td>
      `;

    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    ); // o Utils.formatCurrency está deixando o valor bonito, com virgulas e ponto
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {

  formatAmount(value){
    value = Number(value) * 100
    
    return value
  },

  formatDate(date) { // configurando o formato da data
    const splittedDate = date.split("-")

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[2]}`
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues(){
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date) // adicionando a formatação de data

    return {
      description,
      amount,
      date
    }
  },

  clearFields(){
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

    submit(event) {
    // Puxei esse submit la do HTML, "onsubmit"
    event.preventDefault();

    try {
      // vererificar se todas as informações foram preenchidas
      Form.validateFields()
      // formatar os dados para salvar
      const transaction = Form.formatValues();
      // Form.formatData()
      // salvar
      Transaction.add(transaction)
      // apagar os dados do formulario
      Form.clearFields()
      // modal feche
      Modal.close()
      // Atualizar a aplicação
      App.reload() // posso excluir
    } catch (error) {
      alert(error.message) // Essa linha está ligada com p "throw new Error"
    }
  }
}



const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    })

    DOM.updateBalance();

    Storege.set(Transaction.all)
  },

  reload() {
    DOM.clearTransactions(); // Vai limpar para não repetir
    App.init();
  },
};

App.init();