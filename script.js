let Modal= {
  open(){
    // Abrir modal
    // Adcionar a class active ao modal
    document.querySelector('.modal-overlay') // mandei pesquisar modal-overlay no meu HTML
    .classList
    .add('active') // quando ele achar, ele vai adicionar "active ao meu class"
  },
  close(){
    // fecha o modal
    // remover a class active do modal
    document
    .querySelector('.modal-overlay')
    .classList
    .remove('active')
  }
}