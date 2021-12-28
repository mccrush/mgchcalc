export default (type, categoryId = '') => {
  const id = Date.now().toString()
  const title = '[]'

  if (type === 'group') {
    return {
      id,
      title,
      type: 'group'
    }
  } else if (type === 'materialvid') {
    return {
      id,
      title,
      type: 'materialvid'
    }
  } else if (type === 'frezer') {
    return {
      id,
      title,
      type: 'frezer'
    }
  } else if (type === 'obrabotkavid') {
    return {
      id,
      title,
      type: 'obrabotkavid'
    }
  } else if (type === 'dopuslug') {
    return {
      id,
      title,
      type: 'dopuslug',
      alias: '',
      ed: '',
      price: 0
    }
  } else if (type === 'siryo') {
    return {
      id,
      title,
      categoryId,
      categoryTitle: '',
      ed: '',
      price: 0,
      ostatok: 0,
      type: 'siryo'
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
      type: 'material'
    }
  } else if (type === 'rabota') {
    return {
      id,
      title,
      categoryId,
      categoryTitle: '',
      priceS: 0,
      priceM: 0,
      priceL: 0,
      type: 'rabota'
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
      type: 'obrabotkatolshina'
    }
  }
}