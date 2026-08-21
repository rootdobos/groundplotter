import { Service, signal } from '@angular/core';

@Service()
export class WorkspaceService {
    selectedMapId = signal<number |null>(1);
}
