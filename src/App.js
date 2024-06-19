import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {

  const [tarefas, setTarefas] = useState([]); //useState é uma função que retorna um array com duas posições, a primeira é o valor da variável e a segunda é uma função para alterar o valor da variável
  const [input, setInput] = useState('');  //useState é uma função que retorna um array com duas posições, a primeira é o valor da variável e a segunda é uma função para alterar o valor da variável

  useEffect(() => {  //useEffect é uma função que dispara uma ação toda vez que a página é carregada
    const tarefasStorage = localStorage.getItem('tarefas'); 
    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));  //JSON.parse converte a string em array
    }
  }, []);  //useEffect é uma função que dispara uma ação toda vez que a página é carregada

  useEffect(() => { //useEffect é uma função que dispara uma ação toda vez que o valor de tarefas é alterado
    localStorage.setItem('tarefas', JSON.stringify(tarefas));  //localStorage é um objeto que armazena dados no navegador, JSON.stringify converte o array em string
  }, [tarefas]);  

  const handleAd = useCallback(() =>{ //useCallback é uma função que retorna uma função, ele só é recalculado quando o valor de input ou tarefas é alterado
    setTarefas([...tarefas, input]);  //...tarefas é um spread operator, ele pega todos os itens do array tarefas e adiciona a nova tarefa
    setInput('');  //limpa o input após adicionar a tarefa
  }, [input, tarefas]);  

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);  //useMemo é uma função que retorna um valor calculado, ele só é recalculado quando o valor de tarefas é alterado

  return (
    <div>

      <ul>
        {tarefas.map(tarefa => (         //map é uma função que percorre o array e retorna um novo array
          <li key={tarefa}>{tarefa}</li>  //key é um identificador único para cada item da lista
        ))}
      </ul>
      <br/>

      <strong>Você tem {totalTarefas} tarefas!</strong> {/*totalTarefas é o valor calculado pelo useMemo*/}
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />  {/*onChange é um evento que dispara a função setInput quando o valor do input é alterado*/}
      <button type="button" onClick={handleAd} >Adicionar tarefa</button> {/*onClick é um evento que dispara a função handleAd quando o botão é clicado*/}


    </div>
  );
}

export default App;
