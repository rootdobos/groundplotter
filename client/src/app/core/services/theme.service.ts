import { effect, Service, signal } from '@angular/core';
export type Theme = 'light' | 'dark';
@Service()
export class ThemeService {
    readonly theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        effect(()=>{
            const theme = this.theme();
            document.documentElement.classList.toggle('dark', theme === 'dark');
            localStorage.setItem('gp-theme', theme);
        })
    }
    toggle():void{
        this.theme.set(this.theme()=== 'dark' ? 'light': 'dark');
    }
    private getInitialTheme(): Theme{
        const saved = localStorage.getItem('gp-theme') as Theme | null;
        if(saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}
