import { Role } from "src/role/role.enum";

export interface CreateUsuarioInterface{
    user:string;
    password:string;
    email:string;
    roles: Role[];


}


export interface Config{
    secretKey:string;
}
export let secret:Config ={
    secretKey :"clavesecreta"
}