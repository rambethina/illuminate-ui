import axios from 'axios'

export const state = () => ({
  sidebar: false,
  screenCastMetaList: [],
  filepath: ''
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  addScreenCastMeta (state, screenCastMeta) {
    state.screenCastMetaList = [
      ...state.screenCastMetaList,
      screenCastMeta
    ]
    console.log(`ScreenCast Meta List ${JSON.stringify(state.screenCastMetaList)}`)
  },
  addFilePath (state, filepath) {
    console.log(`Adjusting state ${filepath}`)
    state.filepath = filepath
  },
  addScreenCasts (state, screenCastList) {
    state.screenCastMetaList = [
      ...screenCastList
    ]
  }

}

const guid = () => {
  const _p8 = (s) => {
    var p = (Math.random().toString(16) + '000000000').substr(2, 8)
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p
  }
  return _p8() + _p8(true) + _p8(true) + _p8()
}

const getCasts = casts => {
  return casts.hits.hits.map(cast => cast)
}
export const actions = {
  async add ({commit}, screenCastMeta) {
    console.log(`in action add screencast ${JSON.stringify(screenCastMeta)}`)
    const res = await axios.put(`https://search-ram-es-com-t7n7z4ibbily5amldybzop6gla.us-east-1.es.amazonaws.com/screencastmeta/doc/${guid()}`, screenCastMeta)
    res.data.result === 'updated' || res.data.result === 'created'
      ? commit('addScreenCastMeta', screenCastMeta)
      : console.error(`Error adding`)
  },
  addFilePath ({commit}, filePath) {
    console.log(`Action add file path ${filePath}`)
    commit('addFilePath', filePath)
  },
  async getScreenCasts ({commit}) {
    const res = await axios.get('https://search-ram-es-com-t7n7z4ibbily5amldybzop6gla.us-east-1.es.amazonaws.com/screencastmeta/_search?q=*&pretty')
    const casts = getCasts(res.data)
    casts.length > 0
      ? commit('addScreenCasts', casts)
      : commit('addScreenCasts', [])
  }
}
