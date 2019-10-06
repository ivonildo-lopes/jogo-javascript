var canvas, contexto, ALTURA, LARGURA, frames = 0;

chao = {
    y: 350,
    altura: 50,
    cor:'#ffdf70',
    
    desenha: function() {
        contexto.fillStyle = this.cor;
        contexto.fillRect(0, this.y,LARGURA,this.altura)
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
    document.addEventListener('mousedown', cliqueMouse)

    roda();
}

function cliqueMouse(event){
    console.log('clicou ' + event)
}

function roda(){
    atualiza();
    desenha();

    window.requestAnimationFrame(roda)
}

function atualiza(){
    frames++;
}

function desenha(){
    // pintando canvas de azul
    contexto.fillStyle = '#50beff'
    contexto.fillRect(0,0,LARGURA,ALTURA);

    chao.desenha()

}


main();