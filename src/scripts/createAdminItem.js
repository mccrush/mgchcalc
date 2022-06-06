
import Obrabotkavid from './../classes/obrabotkavidClass'
import Obrabotkatolshina from './../classes/obrabotkatolshinaClass'
import Dopuslug from './../classes/dopuslugClass'
import Contact from './../classes/contactClass'
import Company from './../classes/companyClass'



export default (type, categoryId = '') => {

  switch (type) {
    case 'obrabotkavid':
      return new Obrabotkavid()
    case 'obrabotkatolshina':
      return new Obrabotkatolshina('Новая толщина', categoryId)
    case 'dopuslug':
      return new Dopuslug()
    case 'contact':
      return new Contact()
    case 'company':
      return new Company()
  }
}