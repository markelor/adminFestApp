
import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class ObservableService {
  public thematicTranslate;
  public themeIndexTranslate;
  public classIndexTranslate;
  public allTranslate;
  public idTranslate;
  public regionIndexTranslate;
  public mapType;
  public modalType;
  public avatarType;
  public modalCount=0;
  public singleTheme;
  private notify = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservable = this.notify.asObservable();

  constructor(){}

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}


