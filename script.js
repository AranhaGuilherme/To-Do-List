const inputTarefa = document.getElementById('tarefa-input');
const botaoAdicionar = document.getElementById('adicionar-btn');
const listaTarefas = document.getElementById('lista-tarefas');

let tarefa = [];

function iniciarApp() {
    botaoAdicionar.addEventListener('click', adicionarTarefa);
};
iniciarApp();

function adicionarTarefa() { 
    const texto = inputTarefa.value.trim();

    if (texto === '') {
        alert('Por Favor, digite uma tarefa!');
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    tarefa.push(novaTarefa);

    inputTarefa.value = '';
     
    renderizarTarefas();
}

function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    tarefa.forEach(function(tarefa) {
        const li = document.createElement('li');

        if (tarefa.concluida) {
            li.classList.add('concluida');
        }

        li.textContent = tarefa.texto;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.classList.add('remover-btn');
        botaoRemover.addEventListener('click', function() {
            removerTarefa(tarefa.id);
        });

        li.addEventListener('click', function() {
            toggleConcluida(tarefa.id);
        });

        li.appendChild(botaoRemover);

        listaTarefas.appendChild(li);
    });
}

function removerTarefa(id) {
    tarefa = tarefa.filter(tarefa => tarefa.id !== id);
    renderizarTarefas();
}

function toggleConcluida(id) {
    tarefa = tarefa.map(tarefa => {
        if (tarefa.id === id){
            return {...tarefa, concluida: !tarefa.concluida};
        }
        
        return tarefa;
    });

    renderizarTarefas();
}