<template>
  <v-card color="secorndary flat">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Upload your screencast</v-subheader>
          </v-flex>
          <v-flex xs8>
            <input type="file" @change="onFileChange">
          </v-flex>
        </v-layout>
      </v-container>
      <v-form @submit.prevent="add({title, filepath, tags, description})">
      <input type="hidden" id="screencast-url" v-model="filepath">
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Title</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="title"
              class="input-group--focused"
              dark
              v-model="title"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Tags</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="tags"
              class="input-group--focused"
              dark
              v-model="tags"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Description</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="description"
              class="input-group--focused"
              dark
              v-model="description"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid>
        <v-layout row>
          <v-btn color="primary" type="submit" value="Add">Submit</v-btn>
        </v-layout>
      </v-container>
      </v-form>
      <ul>
        <li v-for="cast in screenCastMetaList" v-bind:key="cast.title">
          {{cast.title}}
        </li>
        <li v-for="cast in screenCastMetaList" v-bind:key="cast.tags">
          {{cast.tags}}
        </li>
        <li v-for="cast in screenCastMetaList" v-bind:key="cast.description">
          {{cast.description}}
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
  import axios from 'axios'
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        title: 'test text',
        tags: '',
        description: ''
      }
    },
    computed: {
      ...mapState({
        screenCastMetaList: state => state.screenCastMetaList,
        filepath: state => state.filepath
      })
    },
    methods: {
      // async onSubmit (e) {

      // },
      async onFileChange (e) {
        const file = e.target.files[0]
        if (file == null) {
          return alert('No file selected.')
        }
        console.log(file)
        const res = await axios.get(`http://localhost:3001/sign-s3?file-name=${file.name}&file-type=${file.type}`)
        console.log(`${JSON.stringify(res)}`)
        // const config = {
        //   headers: {
        //     'content-type': 'multipart/form-data',
        //     'Content-Type': file.type
        //   }
        // }
        // const formData = new FormData()
        // formData.append('file', file)
        // try {
        //   const fileUploadResponse = await axios.put(res.data.signedRequest, formData, config)
        //   console.log(`Upload response : ${JSON.stringify(fileUploadResponse)}`)
        // } catch (e) {
        //   console.error(e)
        // }
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', res.data.signedRequest)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // document.getElementById('preview').src = url
              document.getElementById('screencast-url').value = res.data.url
              this.$store.dispatch('addFilePath', res.data.url)
            } else {
              console.log(`Error uploading file ${JSON.stringify(xhr.responseText)}`)
            }
          }
        }
        xhr.send(file)
      },
      ...mapActions([
        'add'
      ])
    }
  }
</script>
