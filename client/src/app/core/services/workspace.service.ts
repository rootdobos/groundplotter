import { inject, Service, signal } from '@angular/core';
import { MapData } from '../models/mapData';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Service()
export class WorkspaceService {
    baseUrl = environment.apiUrl;
    selectedMapData = signal<MapData |null>(null);
    http = inject(HttpClient);
    constructor() {
        this.http.get<MapData>(this.baseUrl + "map/1").subscribe(
            (next)=> {
                this.selectedMapData.set(next);
            }
        )
        
    }
}
