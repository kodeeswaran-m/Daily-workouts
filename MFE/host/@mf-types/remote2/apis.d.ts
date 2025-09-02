
    export type RemoteKeys = 'remote2/Footer';
    type PackageType<T> = T extends 'remote2/Footer' ? typeof import('remote2/Footer') :any;