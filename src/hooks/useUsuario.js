import { useEffect } from "react"
import { useState } from "react"
import { onChangeUser } from '../credenciales.js'

const useUsuairo = () => {
  const [usuario, setUsuario] = useState(undefined)

  useEffect(() => {
    onChangeUser(setUsuario)
  }, [])

  return usuario
}

export default useUsuairo