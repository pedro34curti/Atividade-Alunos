// Declarando variáveis globais
let clientes = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo Aluno
    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoAluno = modalNovoAluno.querySelector(".close");

    // Configurando eventos do modal novo Aluno
    btnNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoAluno) {
            modalNovoAluno.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar Aluno por Sala
function identifica(Sala) {
    for (let Aluno of Alunos) {
        if (Aluno.Sala === Sala.id) {
            return Aluno;
        }
    }
    return null;
}

// Função para exibir modal de informações do Aluno
function modal(button) {
    let Aluno = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do Aluno
    let SalaModal = modal.querySelector("#SalaModal");
    let NomeModal = modal.querySelector("#NomeModal");

    if (!SalaModal || !NomeModal) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    SalaModal.innerHTML = Aluno.Sala;
    NomeModal.innerHTML = Aluno.Nome;

    // Configurando o botão de excluir
    btnExcluirAluno.onclick = function () {
        excluirAluno(Aluno.Sala);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir Aluno
function excluirAluno(Sala) {
    Alunos = Alunos.filter(Aluno => Aluno.Sala !== Sala);
    localStorage.setItem("Alunos", JSON.stringify(Alunos));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("carros");
    Alunos = JSON.parse(localStorage.getItem("Alunos")) || [];

    tabela.innerHTML = "";

    for (let Aluno of Alunos) {
        let botaoid = `<td><button id='${Aluno.Sala}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${Aluno.Sala}</td>
            <td>${Aluno.ome}</td>
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo Aluno
function cadastrarAluno() {
    let Sala = document.getElementById("Sala").value;
    let Nome = document.getElementById("Nome").value;
    // Verifica se a Sala já está cadastrada
    if (AlunoExistente(Sala)) {
        alert("Sala já cadastrada. Insira uma Sala única.");
        return;
    }

    let novoAluno = {
        Sala: Sala,
        Nome: Nome,
    };

    Alunos = JSON.parse(localStorage.getItem("Alunos")) || [];
    Alunos.push(novoAluno);

    // Salva no localStorage
    localStorage.setItem("Alunos", JSON.stringify(Alunos));

    // Recarrega a tabela após cadastrar um novo Aluno
    carrega();

    // Esconde o modal de novo Aluno
    modalNovoAluno.style.display = "none";
}

// Função para verificar se o Aluno já existe
function AlunoExistente(Sala) {
    return Alunos.some(Aluno => Aluno.Sala === Sala);
}
