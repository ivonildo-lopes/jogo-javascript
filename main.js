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
    forcaDoPulo:15,
    qtdpulo: 0,

    movimentoBloco: function(){
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        // cai no chao
        if (this.y > chao.y - this.altura) {
            this.y = chao.y - this.altura
            this.qtdpulo = 0
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
    }
},

obstaculos = {
    objetos: [],
    cores: ['#ffbc1c','#ff1c1c','#ff85e1','#52a7ff','#78ff5d'],
    tempo: 0,

    inserir: function() {
        this.objetos.push({
            x: LARGURA,
            largura: 30 + Math.floor(21 * Math.random()),
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

            if(obstaculo.x <= -obstaculo.largura){
                this.objetos.splice(i,1);
                tam--;
                i--;
            }
            
        }
    }

};

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
    document.addEventListener('mousedown', cliqueMouse)

    estadoAtual = estados.jogar

    roda();
}

function cliqueMouse(event){
    if(estadoAtual == estados.jogando)
        bloco.pulo()
    else if(estadoAtual == estados.jogar)
      estadoAtual = estados.jogando
    else if(estadoAtual == estados.perdeu)
        estadoAtual = estados.jogar          
}

function roda(){
    atualiza();
    desenha();

    window.requestAnimationFrame(roda)
}

function atualiza(){
    frames++;

    bloco.movimentoBloco();
    if(estadoAtual == estados.jogando){
        obstaculos.movimentoObstaculo();
    }
}

function desenha(){
    // pintando canvas de azul
    contexto.fillStyle = '#50beff'
    contexto.fillRect(0,0,LARGURA,ALTURA);

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