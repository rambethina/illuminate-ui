import axios from 'axios'

const getCasts = casts => {
  return casts.hits.hits.map(cast => cast._source)
}

export async function init ({store}) {
  try {
    const res = await axios.get('https://search-ram-es-com-t7n7z4ibbily5amldybzop6gla.us-east-1.es.amazonaws.com/screencastmeta/_search?q=*&pretty')
    const casts = getCasts(res.data)
    console.log(`Got data ${JSON.stringify(casts)}`)
    casts.length > 0
      ? store.commit('addScreenCasts', casts)
      : store.commit('addScreenCasts', [])
  } catch (error) {
    console.error(`error ${JSON.stringify(error)}`)
  }
}
