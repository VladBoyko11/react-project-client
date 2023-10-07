declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.svg" {
  const classes: string;
  export default classes;
}
