const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 5



class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    //this.siguienteNivel()
    setTimeout(this.siguienteNivel, 500)
    
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.actualizarNivel = this.actualizarNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.puntos = 0
    //de esta manera desglosa las const como propiedades
    //del objeto de una vez
    this.colores = {
        celeste,
        violeta,
        naranja,
        verde
    }
  }

  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove('hide')
    }else{
        btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
      this.subnivel = 0
      this.iluminarSecuencia()
      this.agregarEventosClick()
  }

  actualizarNivel(){
  swal(`Nivel ${this.nivel - 1} superado`, `Siguiente nivel: ${this.nivel}, puntos: ${this.puntos}`, 'success')
            .then(this.siguienteNivel)
  }
  transformarNumeroAColor(numero){
    switch (numero){
          case 0:
              return 'celeste'
          case 1: 
              return 'violeta'
          case 2:
              return 'naranja'
          case 3: 
              return 'verde'
    }
}
  transformarColorANumero(color){
      switch (color){
            case 'celeste':
                return 0
            case 'violeta': 
                return 1
            case 'naranja':
                return 2
            case 'verde': 
                return 3
      }
  }

  iluminarSecuencia(){
      for(let i = 0; i< this.nivel; i++){
          //se usa let y no var por que var se crea global y se sobreescribe
          //en cambio let solo se queda a nivel de bloque asi que por cada iteracion es 
          //como si fuera una variable diferente por cada bloque
        let color = this.transformarNumeroAColor(this.secuencia[i])
        console.log(color)
        setTimeout(() => {
            console.log('set time out : '+color)
            this.iluminarColor(color)
        }, 1000 * i)
        
      }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color){
      this.colores[color].classList.remove('light')
  }

  agregarEventosClick(){
      this.colores.celeste.addEventListener('click',this.elegirColor)
      this.colores.verde.addEventListener('click',this.elegirColor)
      this.colores.violeta.addEventListener('click',this.elegirColor)
      this.colores.naranja.addEventListener('click',this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor)
      this.colores.verde.removeEventListener('click',this.elegirColor)
      this.colores.violeta.removeEventListener('click',this.elegirColor)
      this.colores.naranja.removeEventListener('click',this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            this.puntos++
            if(this.subnivel === this.nivel){
                this.nivel++
                //this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    //GANO
                    this.ganoElJuego()
                } else {
                    setTimeout(this.actualizarNivel, 1500)
                }
            }
        }else{
            //perdio
            this.perdioElJuego()
        }
    }

    ganoElJuego(){
        swal('PlatziGame', 'Felicitaciones, Ganaste el juego!', 'success')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
    perdioElJuego(){
        swal('PlatziGame', 'Lo lamentamos, perdiste :(', 'error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego() {
   window.juego = new Juego()
}
