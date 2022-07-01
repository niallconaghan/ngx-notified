export interface NotifiedConfig {
    alignment?: NotifiedAllignment;
    placement?: NotifiedPlacement;
    duration?: number;
    ariaLive?: 'off' | 'assertive' | 'polite';
    role?: string;
    width?: number | string;
}

export type NotifiedAllignment = 'start' | 'center' | 'end';
export type NotifiedPlacement = 'top' | 'bottom';