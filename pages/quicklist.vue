<template>
  <v-data-table
      v-bind:headers="headers"
      :items="screenCastMetaList"
      class="elevation-1"
      hide-actions
      dark
    >
   <template slot="items" scope="props">
      <td>{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.description }}</td>
      <td class="text-xs-right">{{ props.item.tags }}</td>
      <td class="text-xs-right"><a :href="props.item.filepath">listen</a></td>
    </template>
  </v-data-table>
</template>

<script>
import { init } from './shared'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Description', value: 'description' },
        { text: 'Tags', value: 'tags' },
        { text: 'Link', value: 'filepath' }
        // { text: 'Fat (g)', value: 'fat' },
        // { text: 'Carbs (g)', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        // { text: 'Sodium (mg)', value: 'sodium' },
        // { text: 'Calcium (%)', value: 'calcium' },
        // { text: 'Iron (%)', value: 'iron' }
      ]
    }
  },
  fetch: init,
  computed: {
    ...mapState({
      screenCastMetaList: state => state.screenCastMetaList
    })
  }
}
</script>