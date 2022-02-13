export default (type, categoryId = '') => {
  const id = Date.now().toString()
  const title = '[]'

  if (type === 'materialvid') {
    return {
      id,
      title,
      type: 'materialvid',
      position: 0
    }
  } else if (type === 'obrabotkavid') {
    return {
      id,
      title,
      type: 'obrabotkavid',
      position: 0
    }
  } else if (type === 'dopuslug') {
    return {
      id,
      title,
      type: 'dopuslug',
      alias: '',
      ed: '',
      price: 0,
      position: 0
    }
  } else if (type === 'material') {
    return {
      id,
      title,
      categoryId,
      categoryTitle: '',
      ed: '',
      price: 0,
      ostatok: 0,
      type: 'material',
      position: 0
    }
  } else if (type === 'obrabotkatolshina') {
    return {
      id,
      title,
      categoryId,
      categoryTitle: '',
      priceS: 0,
      priceM: 0,
      priceL: 0,
      type: 'obrabotkatolshina',
      position: 0
    }
  } else if (type === 'customer') {
    return {
      id,
      title,
      address: '',
      inn: '',
      kpp: '',
      ogrn: '',
      bic: '',
      rs: '',
      ks: '',
      type: 'customer'
    }
  }
}