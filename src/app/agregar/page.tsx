import AgregarTarea from '@/components/agregarTarea/agregarTarea'
import React from 'react'

export default function page() {
  return (
    <div>
        <AgregarTarea onTareaAgregada={function (): void {
        throw new Error('Function not implemented.')
      } }/>
    </div>
  )
}
