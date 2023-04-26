import React, { useContext } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'

const ListTurnsAdmin = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  return (
    <div> <NavbarAdmin/>
      <h1>Lista aaaaaaaaaaaade Turnos</h1>
    </div>
  )
}

export default ListTurnsAdmin