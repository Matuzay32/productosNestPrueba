export interface CreateUsuarioInterface{
    user:string;
    password:string;
    email:string;

}


export interface Config{
    secretKey:string;
}
export let secret:Config ={
    secretKey :"clavesecreta"
}