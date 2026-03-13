export const parseRole = (role: 'admin' | 'user') => {
    return role === 'admin'? 'Administrador' : 'Usuario'
}