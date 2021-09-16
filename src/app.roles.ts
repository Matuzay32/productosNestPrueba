import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }

export enum AppResources{
      USER      = "USER",
      PRODUCT   = "PRODUCT"

  }
   
export const roles: RolesBuilder = new RolesBuilder();

    roles

    //ROLES DE USUARIO

//   Con esto el usuario va poder crear un usuario
//   tambien va poder borrarlo o editarlo
//   va poder ver cualquier Producto
//   y va port leer su propio Usuario
  .grant(AppRoles.USER) 
  .updateOwn([AppResources.USER])
  .createOwn([AppResources.USER])
  .deleteOwn([AppResources.USER])
  .readOwn  ([AppResources.USER])
  .readAny  ([AppResources.PRODUCT])


  //ADMIN ROLES
    
//   El adm basicamente puede editar todos los usuarios osea hacer todas las operaciones CRUD
//   EL ADM tambien puede hacer todas las operaciones CRUD sobre la ruta de productos
  
.grant(AppRoles.ADMIN) 
  
  .readAny  ([AppResources.PRODUCT])
  .createAny([AppResources.PRODUCT])
  .deleteAny([AppResources.PRODUCT])
  .updateAny([AppResources.PRODUCT])

  .readAny  ([AppResources.USER])
  .deleteAny([AppResources.USER])
  .updateAny([AppResources.USER])
  .createAny([AppResources.USER])

  
  