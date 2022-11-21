import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomhomeComponent } from './classroomhome.component';

describe('ClassroomhomeComponent', () => {
  let component: ClassroomhomeComponent;
  let fixture: ComponentFixture<ClassroomhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
