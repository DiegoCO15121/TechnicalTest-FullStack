export const parseStatus = (status: 'active' | 'inactive') => {
    return status === 'active'? 'Activo' : 'Inactivo'
}