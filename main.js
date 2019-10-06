var canvas, contexto, ALTURA, LARGURA, frames = 0, maxPulos = 3,

chao = {
    y: 350,
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
};

function defineTamanhoTela() {
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if(LARGURA >= 500){
        ALTURA = 400;
        LARGURA = 400;
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
    document.addEventListener('keydown', cliqueMouse)

    roda();
}

function cliqueMouse(event){
    console.log('clicou ' + event)
    bloco.pulo()
}

function roda(){
    atualiza();
    desenha();

    window.requestAnimationFrame(roda)
}

function atualiza(){
    frames++;

    bloco.movimentoBloco()
}

function desenha(){
    // pintando canvas de azul
    contexto.fillStyle = '#50beff'
    contexto.fillRect(0,0,LARGURA,ALTURA);

    chao.desenha()
    bloco.desenha()

}


main();