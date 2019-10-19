var canvas, contexto, ALTURA, LARGURA, 
    frames = 0, maxPulos = 3, velocidadeObstaculo = 6,
    estadoAtual,

estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2
}    

chao = {
    y: 550,
    altura: 50,
    cor:'#ffdf70',
    
    desenha: function() {
        contexto.fillStyle = this.cor;
        contexto.fillRect(0, this.y,LARGURA,this.altura)
    }
},

bloco = {
    x: 50,
    y: 0,
    altura:50,
    largura: 50,
    cor: '#ff4e4e',
    gravidade: 1.5,
    velocidade: 0,
    forcaDoPulo:20,
    qtdpulo: 0,
    score: 0,

    movimentoBloco: function(){
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        // cai no chao
        if (this.y > chao.y - this.altura) {
            this.y = chao.y - this.altura
            this.qtdpulo = 0;
            // this.velocidade = 0;
        }
    },

    pulo: function(){
        if(this.qtdpulo < maxPulos){
            this.velocidade = -this.forcaDoPulo
            this.qtdpulo++;
        }
    },

    desenha: function() {
        contexto.fillStyle = this.cor;
        contexto.fillRect(this.x, this.y,this.largura,this.altura)
    },
    reset: function() {
        this.y = 0,
        this.velocidade = 0;
        this.score = 0;
    }
},

obstaculos = {
    objetos: [],
    cores: ['#ffbc1c','#ff1c1c','#ff85e1','#52a7ff','#78ff5d'],
    tempo: 0,

    inserir: function() {
        this.objetos.push({
            x: LARGURA,
            largura: 50,
            altura: 30 + Math.floor(120 * Math.random()),
            cor: this.cores[Math.floor(5 * Math.random())]
        })


        this.tempo = 30 + Math.floor(21 * Math.random());

        // velocidadeObstaculo == 3 ? this.tempo = 70: this.tempo = 30 + Math.floor(21 * Math.random());

        // setInterval(mudarTempo, 1000 * 30)

        // function mudarTempo() {
        //    if(velocidadeObstaculo < 20) 
        //       velocidadeObstaculo++;
        //     else
        //        velocidadeObstaculo = 6
        // }

        
    },
    desenha: function() { 
        for (var i = 0, tam = this.objetos.length ; i < tam; i++) {

            var obstaculo = this.objetos[i];

            contexto.fillStyle = obstaculo.cor;
            contexto.fillRect(obstaculo.x, chao.y - obstaculo.altura,
                            obstaculo.largura,obstaculo.altura);
            
        }
    },
    movimentoObstaculo: function() {
        if(this.tempo == 0){
            this.inserir();
        }else{
            this.tempo--;    
        }

        for (var i = 0, tam = this.objetos.length ; i < tam; i++) {

            var obstaculo = this.objetos[i];

            obstaculo.x -= velocidadeObstaculo;

            // verificando colisão
            if(bloco.x < obstaculo.x + obstaculo.largura 
                && bloco.x + bloco.largura >= obstaculo.x
                && bloco.y + bloco.altura >= chao.y - obstaculo.altura)
                    estadoAtual = estados.perdeu
            
            else if (obstaculo.x == 0)
                bloco.score++;        

            // remove os obstaculos quando passa do canvas
            else if(obstaculo.x <= -obstaculo.largura){
                this.objetos.splice(i,1);
                tam--;
                i--;
            }
            
        }
    },

    limpa: function(){
        this.objetos = []
    }

}

function defineTamanhoTela() {
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if(LARGURA >= 500){
        ALTURA = 600;
        LARGURA = 600;
    }
}

function defineCanvas() {
    canvas = document.createElement('canvas');
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = '1px solid #000';
}

function main() {
    defineTamanhoTela();
    defineCanvas();

    contexto = canvas.getContext('2d');
    document.body.appendChild(canvas);
    document.addEventListener('mousedown', acao)
    document.addEventListener('keydown', acao)

    estadoAtual = estados.jogar

    roda();
}

function acao(event){

    if(event.code === 'Space' || event.type === 'mousedown') { 
        if(estadoAtual == estados.jogando)
             bloco.pulo()
         else if(estadoAtual == estados.jogar)
            estadoAtual = estados.jogando
         else if(estadoAtual == estados.perdeu){
            estadoAtual = estados.jogar     
            obstaculos.limpa()
            bloco.reset()
        }
    }    

//   if(event.code === 'Space') { 
    // if(estadoAtual == estados.jogando)
    //     bloco.pulo()
    // else if(estadoAtual == estados.jogar)
    //   estadoAtual = estados.jogando
    // else if(estadoAtual == estados.perdeu){
    //     estadoAtual = estados.jogar     
    //     obstaculos.limpa()
    //     bloco.reset()
    // }
//   }           
}

function roda(){
    atualiza();
    desenha();

    // isso faz com que fique num loop
    window.requestAnimationFrame(roda)
}

function atualiza(){
    frames++;

    bloco.movimentoBloco();
    if(estadoAtual == estados.jogando)
        obstaculos.movimentoObstaculo();
}

function desenha(){
    // pintando canvas de azul
    contexto.fillStyle = '#50beff'
    contexto.fillRect(0,0,LARGURA,ALTURA);

    //mostrando o score na tela
    contexto.fillStyle = '#fff'
    contexto.font = '50px Arial'
    contexto.fillText(bloco.score,0,38)

    // opções do jogo
    if(estadoAtual == estados.jogar){
        contexto.fillStyle = 'green'
        contexto.fillRect(LARGURA/2 - 50, ALTURA/2 - 50, 100, 100);
    } else if (estadoAtual == estados.perdeu) {
        contexto.fillStyle = 'red'
        contexto.fillRect(LARGURA/2 - 50, ALTURA/2 - 50, 100, 100);
    } else
        obstaculos.desenha();    
    
    chao.desenha();
    bloco.desenha();

}


main();