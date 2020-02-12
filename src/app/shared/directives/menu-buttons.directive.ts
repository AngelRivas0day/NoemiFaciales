import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMenuButtons]'
})
export class MenuButtonsDirective {

  @Input('appMenuButtons') highlightColor: string;

  constructor(
    public elementRef:ElementRef
  ){      
    elementRef.nativeElement.classList.add('menu-item');
  }
    @HostListener('mouseenter') onMouseEnter() {
      this.elementRef.nativeElement.style.backgroundColor = this.highlightColor;
      this.elementRef.nativeElement.classList.add('hover-menu-item');
      if(document.getElementById("banner")){
        document.getElementById("banner").style.backgroundColor = this.highlightColor;
      }
    }
  
    @HostListener('mouseleave') onMouseLeave() {
      this.elementRef.nativeElement.style.backgroundColor = 'transparent';
      this.elementRef.nativeElement.classList.remove('hover-menu-item');
      if(document.getElementById("banner")){
        document.getElementById("banner").style.backgroundColor = 'transparent';
      }
    }

    ngOnInit(){
      if(document.getElementById("banner")){
        document.getElementById("banner").style.transition = 'all .3s';
      }
    }
}
