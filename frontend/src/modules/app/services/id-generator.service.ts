import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class IdGeneratorService {
    public getID(): string {
        return uuid.v4();
    }
}
