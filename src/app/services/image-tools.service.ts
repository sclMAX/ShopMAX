import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class ImageToolsService {
  constructor() {}

  resize(file: File, width: number, height: number): Observable<File> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(obs => {
      reader.onload = ev => {
        const img = new Image();
        img.src = (ev.target as any).result;
        (img.onload = () => {
          const elem = document.createElement('canvas');
          elem.width = width;
          elem.height = height;
          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          ctx.canvas.toBlob(blob => {
            obs.next(new File([blob], file.name, {
                       type: 'image/jpeg',
                       lastModified: Date.now(),
                     }), );
          }, 'image/jpeg', 1, );
        }), (reader.onerror = error => obs.error(error));
      };
    });
  }
}
