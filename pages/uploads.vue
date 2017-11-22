<template>
  <v-form v-model="valid">
    <input
    type="file" @change="onFileChange"
    >
    <v-text-field
      label="Name"
      v-model="name"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        valid: false,
        name: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required'
        ]
      }
    },
    methods: {
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
              // document.getElementById('avatar-url').value = url
            } else {
              alert(`Error uploading file ${JSON.stringify(xhr.responseText)}`)
            }
          }
        }
        xhr.send(file)
      }
    }
  }
</script>
