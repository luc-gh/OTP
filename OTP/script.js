//Após o carregamento das páginas:
document.addEventListener('DOMContentLoaded', function() {

    let numeroAleatorio = function rn(){
        //cria um array com os dígitos de 0 a 9
        let numerosDisponiveis = Array.from(Array(10).keys());

        //embaralha o array
        for (let i = numerosDisponiveis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numerosDisponiveis[i], numerosDisponiveis[j]] = [numerosDisponiveis[j], numerosDisponiveis[i]];
        }

        //pega os primeiros 5 dígitos
        let numeroAleatorio = numerosDisponiveis.slice(0, 5).join('');
        return numeroAleatorio;
    }

    //Click para gerar número
    let botao = document.querySelector('#botao');
    botao.addEventListener('click', ()=>{
        
        let senha = numeroAleatorio();
        sessionStorage.setItem('senha', senha);

        let content11 = document.getElementById('page11');
        let content12 = document.getElementById('page12');
        
        let content21 = document.getElementById('page21');
        let content22 = document.getElementById('page22');
        
        let content3 = document.getElementById('page3');
        
        content11.classList.toggle('changeDisplay');
        content12.classList.toggle('changeDisplay');
        content21.classList.toggle('changeDisplay');
        content22.classList.toggle('changeDisplay');

        alert("Senha: " + senha);
        
        foco();
    });

    let foco = function(){
        setTimeout(() => {       //Transfere o foco para o primeiro digito da senha após 0.71s
            inputs[0].focus()
        }, 600);
    }
        
    //Números da senha
    const inputs = document.querySelectorAll('.number');

    //Impede a escrita de caracteres não numéricos nos inputs
    inputs.forEach(function(input) {

        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        });

        //Garante que o caret (o indicador de inserção de texto) sempre vá para a última posição
        input.addEventListener('click', function() {
            const len = this.value.length;
            this.setSelectionRange(len, len);
        });
    });

    //Garante que a cada valor digitado, o foco será passado para o próximo, se houver. Caso não haja, o foco desaparece.    
    inputs.forEach(function(input, index) {
        
        input.addEventListener('input', function() {
            
            if (this.value.length === 1 && index < inputs.length - 1 && inputs[index + 1].value.length === 0) {
                inputs[index].blur();
                inputs[index + 1].focus();
            }
            
            if(this.value.length === 1 && index === inputs.length - 1){
                inputs[index].blur();

                let inputPass = document.querySelectorAll('.number');
                let valor = '';

                inputPass.forEach(function(i) {
                    valor += i.value;
                });

                let numericValue = Number(valor);

                console.log(valor);
                console.log(sessionStorage.getItem('senha'));
                console.log(valor.length);
                console.log(typeof numericValue);
                console.log(sessionStorage.getItem('senha') == numericValue);

                if(numericValue == sessionStorage.getItem('senha') && valor.length === 5 && sessionStorage.length !== 0){
                    p21 = document.getElementById('page21');
                    p22 = document.getElementById('page22');
                    p3 = document.getElementById('page3');

                    setTimeout(() => {
                        p21.classList.toggle('changeDisplay');
                        p22.classList.toggle('changeDisplay');
                    }, 500);
                    
                    setTimeout(() => {
                        p3.classList.toggle('changeDisplay');
                        sessionStorage.clear();
                    }, 500);
                    
                }
            }

            if(this.value != '' && inputs[index + 1].value.length === 1){
                setTimeout(inputs[index].blur(), 2000);
            }

        });  //end input

    });  //end forEach

    //Botão de recarregamento (página 3)
    document.getElementById('reload').addEventListener('click', () => {location.reload(true);});
    
    //Botão de limpeza (página 2)
    let c = document.getElementById('clear');
    c.addEventListener('click', () => {
        inputs.forEach((input) => {
            input.value = '';
        });
        c.blur();
        foco();
    });

});
