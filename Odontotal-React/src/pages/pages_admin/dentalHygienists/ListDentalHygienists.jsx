import React, { useContext } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'

const ListDentalHygienists = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  return (
    <div>ListDentalHygienists
        <NavbarAdmin/>
    </div>
  )
}

export default ListDentalHygienists