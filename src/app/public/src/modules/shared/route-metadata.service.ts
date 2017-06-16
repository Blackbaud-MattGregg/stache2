import { Inject, Injectable, OpaqueToken } from '@angular/core';

export const STACHE_ROUTE_METADATA_SERVICE_CONFIG
  = new OpaqueToken('Injection token for StacheRouteMetadataService config.');

@Injectable()
export class StacheRouteMetadataService {
  constructor(
    @Inject(STACHE_ROUTE_METADATA_SERVICE_CONFIG)
    public routes: any[]) { }
}

export let STACHE_ROUTE_METADATA_PROVIDERS: any[] = [
  { provide: STACHE_ROUTE_METADATA_SERVICE_CONFIG, useValue: [] },
  { provide: StacheRouteMetadataService, useClass: StacheRouteMetadataService }
];