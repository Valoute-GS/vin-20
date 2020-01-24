import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WineryPage } from './winery.page';

describe('WineryPage', () => {
  let component: WineryPage;
  let fixture: ComponentFixture<WineryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WineryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
