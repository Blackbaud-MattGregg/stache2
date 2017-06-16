import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs';
import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';

import { StacheSidebarComponent } from './sidebar.component';
import { StacheNavComponent } from '../nav/nav.component';
import { StacheNavService } from '../nav/nav.service';
import {
  StacheConfigService,
  StacheWindowRef,
  StacheRouteMetadataService
} from '../shared';

import { RouterLinkStubDirective } from './fixtures/router-link-stub.directive';

describe('StacheSidebarComponent', () => {
  let component: StacheSidebarComponent;
  let fixture: ComponentFixture<StacheSidebarComponent>;

  class MockStacheConfigService {
    public runtime = {
      routes: [
        {
          routePath: ''
        },
        {
          routePath: 'parent'
        },
        {
          routePath: 'parent/child'
        },
        {
          routePath: 'parent/child/grandchild'
        },
        {
          routePath: 'parent/child/grandchild/grand-grandchild'
        },
        {
          routePath: 'other-route'
        },
        {
          routePath: 'other-parent'
        },
        {
          routePath: 'other-parent/other-child'
        },
        {
          routePath: 'other-parent/other-child/other-grandchild'
        }
      ]
    };
  }

  class MockRouter {
    public url = '/parent/child/grandchild';
    public events = Observable.of(new NavigationStart(0, ''));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StacheNavComponent,
        StacheSidebarComponent,
        RouterLinkStubDirective
      ],
      providers: [
        StacheWindowRef,
        StacheNavService,
        { provide: StacheConfigService, useClass: MockStacheConfigService },
        { provide: Router, useClass: MockRouter },
        { provide: StacheRouteMetadataService, useValue: { routes: [] } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacheSidebarComponent);
    component = fixture.componentInstance;
  });

  it('should render the component', () => {
    expect(fixture).toExist();
  });

  it('should display navigation links', () => {
    component.routes = [
      { name: 'Test 1', path: [] },
      { name: 'Test 2', path: [] }
    ];

    fixture.detectChanges();
    const links = fixture.debugElement.queryAll(By.css('.stache-nav-anchor'));

    expect(links.length).toBe(2);
  });

  it('should automatically generate routes from config', () => {
    fixture.detectChanges();
    expect(component.routes.length).toBe(1);
    expect(component.routes[0].children.length).toBe(1);
  });

  it('should automatically add a link to the top-level page', () => {
    fixture.detectChanges();
    expect(component.routes[0].name).toBe('Child');
  });
});