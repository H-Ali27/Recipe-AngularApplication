import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector:'[appdropdown]'
})
export class Dropdowndirective implements OnInit{
 @HostBinding('class.open') isOpen = false;
constructor(private elRef: ElementRef, private renderer: Renderer2) {}

ngOnInit(): void {
    
}

@HostListener('click') toggleOpen(): void {
this.isOpen = !this.isOpen;
// this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
let part = this.elRef.nativeElement.querySelector('.dropdown-menu');
 if (this.isOpen) {
   this.renderer.addClass(part, 'show');
  }else {
    this.renderer.removeClass(part, 'show');
  }   
    }
    
}