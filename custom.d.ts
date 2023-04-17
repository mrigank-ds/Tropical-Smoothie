declare module '*.svg' {
    const content: any;
    export default content;
  }
declare module '*.png' {
  const content: any;
  export default content;
}
declare module 'react-geocode';
declare module 'jquery';
declare module "@splidejs/react-splide" {
  export const Splide: React.ComponentType<
    Partial<typeof import("@splidejs/react-splide")> & {
      className?: string;
      options?: any;
      id?:any
    }
  >;

  export const SplideSlide: React.ComponentType<
    Partial<typeof import("@splidejs/react-splide")> & {
      className?: string;
    }
  >;
  export default Splide;
}



 