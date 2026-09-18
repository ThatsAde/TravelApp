import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from '../../header/app-header';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-scrollytelling',
  standalone: true,
  templateUrl: './scrollytelling.html',
  imports: [HeaderComponent],
  styleUrl: './scrollytelling.scss'
})
export class ScrollytellingComponent implements OnInit, AfterViewInit {

    @ViewChild('scrollContainer') scrollContainerRef!: ElementRef<HTMLDivElement>;
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    @ViewChild('headerEl', {read: ElementRef}) headerRef!: ElementRef<HTMLElement>;
    @ViewChild('text1') text1Ref!: ElementRef<HTMLDivElement>;
    @ViewChild('text2') text2Ref!: ElementRef<HTMLDivElement>;
    @ViewChild('text3') text3Ref!: ElementRef<HTMLDivElement>;
    @ViewChild('text4') text4Ref!: ElementRef<HTMLDivElement>;
    @ViewChild('fadeOverlay') fadeOverlayRef!: ElementRef<HTMLDivElement>;

    private context!: CanvasRenderingContext2D;
    private images: HTMLImageElement[] = [];
    private frameCount = 71;

    // Oggetto "proxy" che GSAP anima gradualmente da 0 a frameCount-1
    // Non è un frame intero alla volta: GSAP interpola valori decimali (es. 12.3, 12.7...)
    // Questo è ciò che dà la fluidità che ti manca ora
    private frameProxy = { frame: 0 };

    ngOnInit(): void {
        this.preloadImages();
    }

    ngAfterViewInit(): void {
        this.context = this.canvasRef.nativeElement.getContext('2d')!;

        this.images[0].onload = () => {
        this.setCanvasSize();
        this.render(0);
        this.setupScrollTrigger();
        };
    }

    private preloadImages(): void {
        for (let i = 0; i < this.frameCount; i++) {
        const img = new Image();
        const frameNumber = (i + 1).toString().padStart(4, '0');
        img.src = `/frames/frame-${frameNumber}.jpg`;
        this.images.push(img);
        }
    }

    private setCanvasSize(): void {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Disegna l'immagine in modalità "cover": riempie tutto il canvas
    // ritagliando l'eccesso, senza mai stirare/deformare (equivalente di object-fit: cover)
    private render(frameIndex: number): void {
        const img = this.images[Math.round(frameIndex)];
        if (!img || !img.complete) return;

        const canvas = this.canvasRef.nativeElement;
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
        // immagine più "larga" del canvas: altezza piena, larghezza tagliata ai lati
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
        } else {
        // immagine più "alta" del canvas: larghezza piena, altezza tagliata sopra/sotto
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
        }

        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    private setupScrollTrigger(): void {

        const container = this.scrollContainerRef.nativeElement;

        gsap.to(this.frameProxy, {
            frame: this.frameCount - 1,
            ease: 'none', // fondamentale: nessun easing, l'avanzamento deve essere 1:1 con lo scroll
            scrollTrigger: {
                trigger: this.scrollContainerRef.nativeElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1, // numero = "ritardo" in secondi di smoothing, dà il feeling fluido dei siti professionali
                pin: false // il pin lo fa già il tuo CSS sticky, quindi lasciamo false qui
            },
            onUpdate: () => this.render(this.frameProxy.frame)
        });

        gsap.to(this.headerRef.nativeElement, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: '5% top',
                scrub: 1
            }
        });
        
        // Lo sticky termina quando il fondo del container raggiunge il fondo
        // della viewport (circa l'80% di un container alto 500vh).
        this.animateTextBlock(this.text1Ref.nativeElement, container, '0%', '20%');
        this.animateTextBlock(this.text2Ref.nativeElement, container, '20%', '40%');
        this.animateTextBlock(this.text3Ref.nativeElement, container, '40%', '60%');
        this.animateTextBlock(this.text4Ref.nativeElement, container, '60%', '76%');

        // Il paesaggio si scioglie nel verde del brand prima che arrivi
        // la sezione Destinazioni.
        gsap.fromTo(
            this.fadeOverlayRef.nativeElement,
            { opacity: 0 },
            {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: '76% top',
                    end: 'bottom bottom',
                    scrub: 1
                }
            }
        );
                
    }


    private animateTextBlock(el: HTMLElement, container: HTMLElement, startPct: string, endPct: string): void {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: `${startPct} top`,
                end: `${endPct} top`,
                scrub: 1
            }
        });

        tl.to(el, { opacity: 1, duration: 0.3 })  // fade in nel primo 30% della sua fascia
        .to(el, { opacity: 1, duration: 0.4 })  // resta visibile stabile nel mezzo
        .to(el, { opacity: 0, duration: 0.3 }); // fade out nell'ultimo 30%
    }
}
