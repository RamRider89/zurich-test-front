import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[restringirTexto]',
})
export class ChangeTextDirective {

  @Input()
  public conDecimales = false;

  @Input() permitir: string = 'alfanumerico'; // Valor por defecto

  // Regex general para los inputs
  private readonly regExMap: { [key: string]: RegExp } = {
    numerosEnteros: /^[0-9]+$/,
    letras: /^[a-zA-Z]+$/,
    alfa: /^[a-zA-Z0-9@.-]+$/,
    alfanumerico: /^[a-zA-Z0-9\s]+$/,
    float: /^[0-9]*\.?[0-9]*$/,
    texto: /^[\s\S]*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
    telefono: /^[\d()+-]+$/
  };

  @HostListener('blur', ['$event'])
  onBlur(event: KeyboardEvent) {
    this.trimText();
  }

  constructor(private hostElement: ElementRef) {}

  ngOnInit() {}

  private trimText() {
    this.hostElement.nativeElement.value = this.hostElement.nativeElement.value.trim();
  }

  // Event listener para los inputs
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const teclaPresionada = event.key;
    const regEx = this.regExMap[this.permitir] || this.regExMap['alfanumerico'];

    // Permitir Tab y Backspace
    if (teclaPresionada === 'Tab' || teclaPresionada === 'Backspace'  || event.code === 'Tab' || event.code === 'Backspace') {
      return;
    }

    if (!regEx.test(teclaPresionada)) {
      event.preventDefault();
    }
  }

}