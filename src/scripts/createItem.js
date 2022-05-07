// Import all Domains
import getId from './getId.js'
import materialvid from './../classes/materialvid.js'
import material from './../classes/material.js'
import obrabotkavid from './../classes/obrabotkavid.js'
import obrabotkatolshina from './../classes/obrabotkatolshina.js'
import dopuslug from './../classes/dopuslug.js'
import contact from './../classes/contact.js'
import company from './../classes/company.js'
import postavshik from './../classes/postavshik.js'



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
    case 'postavshik':
      return postavshik(id)
  }
}