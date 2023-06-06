import { ErrorDeAutenticacion } from "../dao/Models/errors/ErrorDeAutenticacion.js"
import { ErrorDePermisos } from "../dao/Models/errors/ErrorDePermisos.js"


export function productsAction(req, res, next){
    if (!req.isAuthenticated()) {        
    return next(new ErrorDeAutenticacion())
    }
    if(req.user.rol != 'admin'){
        return next(new ErrorDePermisos('No tienes permisos de Admin'))
    }
    next()
}

export function addcartAction(req,res,next){
    // console.log(req.params.cid)
    // console.log(req.user.cart)
    if (!req.isAuthenticated()) {        
        return next(new ErrorDeAutenticacion())
    }
    if(req.params.cid != req.user.cart ){
        return next(new ErrorDePermisos("Solo el Usuario puede agregar productos a este carrito"))
    }
    next()
}