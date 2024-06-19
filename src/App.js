import React, { useState, useEffect } from "react";

function App() {

  const [tarefas, setTarefas] = useState([]); //useState é uma função que retorna um array com duas posições, a primeira é o valor da variável e a segunda é uma função para alterar o valor da variável
  const [input, setInput] = useState('');  //useState é uma função que retorna um array com duas posições, a primeira é o valor da variável e a segunda é uma função para alterar o valor da variável


  useEffect(() => {  //useEffect é uma função que dispara uma ação toda vez que a página é carregada
    const tarefasStorage = localStorage.getItem('tarefas');  //getItem é uma função que pega o valor de uma chave no localStorage
    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));  //JSON.parse converte a string em array
    }
  }, []);  //useEffect é uma função que dispara uma ação toda vez que a página é carregada

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));  //localStorage é um objeto que armazena dados no navegador, JSON.stringify converte o array em string
  }, [tarefas]);  

  function handleAd() {
    setTarefas([...tarefas, input]);  //...tarefas é um spread operator, ele pega todos os itens do array tarefas e adiciona a nova tarefa
    setInput('');  //limpa o input após adicionar a tarefa
  }

  return (
    <div>

      <ul>
        {tarefas.map(tarefa => (         //map é uma função que percorre o array e retorna um novo array
          <li key={tarefa}>{tarefa}</li>  //key é um identificador único para cada item da lista
        ))}
      </ul>

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />  {/*onChange é um evento que dispara a função setInput quando o valor do input é alterado*/}
      <button type="button" onClick={handleAd} >Adicionar tarefa</button> {/*onClick é um evento que dispara a função handleAd quando o botão é clicado*/}


    </div>
  );
}

export default App;
