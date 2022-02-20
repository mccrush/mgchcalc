// Import all Domains
import getId from './getId'
import materialvid from '@/classes/materialvid'
import material from '@/classes/material'
import obrabotkavid from '@/classes/obrabotkavid'
import obrabotkatolshina from '@/classes/obrabotkatolshina'
import dopuslug from '@/classes/dopuslug'
import contact from '@/classes/contact'
import company from '@/classes/company'



export default (type, categoryId) => {
  const id = getId()

  switch (type) {
    case 'materialvid':
      return materialvid(id)
    case 'material':
      return material(id, categoryId)
    case 'obrabotkavid':
      return obrabotkavid(id)
    case 'obrabotkatolshina':
      return obrabotkatolshina(id, categoryId)
    case 'dopuslug':
      return dopuslug(id)
    case 'contact':
      return contact(id)
    case 'company':
      return company(id)
  }
}