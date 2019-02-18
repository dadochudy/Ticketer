import { Directive, HostListener, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { debounce } from 'ts-debounce';

@Directive({
  selector: '[appTimeSelectScroll]'
})
export class TimeSelectScrollDirective implements AfterViewInit {

  @Input('timeModel') timeInput: number;
	@Output('timeModelChange') timeOutput = new EventEmitter<number>();

  el: ElementRef;               // overflow Element
  elDocumentHeight: number;     // ul - height
  elDataHeight: number;         // li -height
  numDataEl: number;            // number of li elements
  activeData = 0;               // Current active element
  emptyData = 2;                // number of empty li childs placeholders
  lastScrollPos = 0;
  minBoundary = 0.2;
  maxBoundary = 0.8;
  waitMilliseconds = 250;

  debouncedFunction;

  constructor(el: ElementRef) {
    this.el = el;
    this.debouncedFunction = debounce(this.setPosition, this.waitMilliseconds, {isImmediate: false});
   }

  ngAfterViewInit() {

    const hostElem = this.el.nativeElement;

    this.elDocumentHeight = hostElem.children[0].offsetHeight;
    this.elDataHeight = hostElem.children[0].children[0].offsetHeight;
    this.numDataEl = hostElem.children[0].children.length - this.emptyData;

    this.activeData = this.timeInput;
    this.setPosition(true);
  }

  @HostListener('scroll', ['$event']) onElementScroll() {

    const maxScrollPos = (this.numDataEl - 1) * this.elDataHeight;
    let currentScrollPos = this.el.nativeElement.scrollTop;

    if (this.lastScrollPos === currentScrollPos) { return false; }

    currentScrollPos = currentScrollPos > maxScrollPos ? maxScrollPos : currentScrollPos;

    const DataPos = this.el.nativeElement.scrollTop / this.elDataHeight;

    if (currentScrollPos < this.lastScrollPos ) {

      if (DataPos < (this.activeData + this.minBoundary)) {

        this.changeClass(DataPos);
      }

    } else {

      if (DataPos > (this.activeData + this.maxBoundary)) {

        this.changeClass(DataPos);
      }

    }
    this.debouncedFunction();
    this.lastScrollPos = currentScrollPos;
  }

  setPosition(initValue: boolean = false) {

    this.el.nativeElement.scrollTop = (this.activeData * this.elDataHeight );

    if (!initValue) {
      this.timeOutput.emit(this.activeData);
      this.changeClass(this.activeData);
    }
  }

  changeClass(DataPos) {

    this.el.nativeElement.children[0].children[this.activeData + 1].classList.remove('selected');
    this.activeData = Math.round(DataPos);
    this.el.nativeElement.children[0].children[this.activeData + 1].classList.add('selected');

  }

}
