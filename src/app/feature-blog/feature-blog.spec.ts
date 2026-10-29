import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBlog } from './feature-blog';

describe('FeatureBlog', () => {
  let component: FeatureBlog;
  let fixture: ComponentFixture<FeatureBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
